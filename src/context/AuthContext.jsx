import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'; // Importa signInWithEmailAndPassword y signOut
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify'; // Para notificaciones

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    // Nuevo estado para el rol del usuario, inicializado desde localStorage
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
    const [loadingAuth, setLoadingAuth] = useState(true); // Nuevo estado de carga para la autenticación

    // Deriva isAdmin del userRole
    const isAdmin = userRole === 'Admin';

    // Función de login centralizada
    const login = async (email, password, rol) => {
        setLoadingAuth(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUsuario(userCredential.user);
            setUserRole(rol); // Guarda el rol en el estado
            localStorage.setItem('userRole', rol); // Persiste el rol en localStorage
            toast.success('Inicio de sesión exitoso 🎉');
            return true; // Indica éxito
        } catch (error) {
            console.error('Error al iniciar sesión:', error.code);
            let errorMessage = 'Error de autenticación. Verificá tus datos';
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'Usuario no registrado';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Contraseña incorrecta';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Correo inválido';
                    break;
                default:
                    break;
            }
            toast.error(errorMessage);
            return false; // Indica fallo
        } finally {
            setLoadingAuth(false);
        }
    };

    // Función de logout centralizada
    const logout = async () => {
        setLoadingAuth(true);
        try {
            await signOut(auth);
            setUsuario(null);
            setUserRole(null); // Limpia el rol del estado
            localStorage.removeItem('userRole'); // Limpia el rol de localStorage
            toast.success('Sesión cerrada correctamente 👋');
            return true; // Indica éxito
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            toast.error('No se pudo cerrar la sesión.');
            return false; // Indica fallo
        } finally {
            setLoadingAuth(false);
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
            // Si hay un usuario de Firebase, pero el rol no está en el estado/localStorage,
            // podrías tener una lógica para asignarle un rol por defecto o recuperarlo de algún lugar.
            // Por ahora, si no hay userRole en localStorage, se mantendrá como null.
            if (!user && localStorage.getItem('userRole')) {
                localStorage.removeItem('userRole');
                setUserRole(null);
            }
            setLoadingAuth(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        usuario,
        userRole, // Exponemos el rol
        isAdmin, // Exponemos si es admin
        loadingAuth, // Exponemos el estado de carga de auth
        login, // Exponemos la función de login
        logout // Exponemos la función de logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);