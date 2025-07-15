import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/estaticos/Footer';
import { useAuth } from '../context/AuthContext';

const Login = ({ setIsCartOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('Cliente'); // Estado para el rol seleccionado

    const navigate = useNavigate();
    const location = useLocation();
    const returnToCart = location.state?.returnToCart;

    const { usuario, isAdmin, loadingAuth, login } = useAuth();

    // Este useEffect se encarga de la redirección si el usuario ya está logueado
    // cuando carga la página de Login (ej. navega a /login estando ya logueado).
    // NO se encarga de la redirección inmediata post-login del formulario.
    useEffect(() => {
        // Si no está cargando la autenticación y hay un usuario logueado
        if (!loadingAuth && usuario) {
            // Si es admin y no está ya en /admin, redirigir
            if (isAdmin && location.pathname !== '/admin') {
                navigate('/admin', { replace: true });
            }
            // Si no es admin y no está ya en / (o su destino de no-admin), redirigir
            else if (!isAdmin && location.pathname !== '/') {
                if (returnToCart && typeof setIsCartOpen === 'function') {
                    setTimeout(() => setIsCartOpen(true), 300);
                }
                navigate('/', { replace: true });
            }
        }
    }, [usuario, isAdmin, loadingAuth, navigate, returnToCart, setIsCartOpen, location.pathname]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.warning('Por favor completá todos los campos');
            return;
        }

        // Llamar a la función de login del AuthContext
        // El 'rol' aquí es el que el usuario seleccionó en el formulario.
        const success = await login(email, password, rol);

        // Si el login fue exitoso, redirigimos inmediatamente basándonos en el 'rol' local
        if (success) {
            if (rol === 'Admin') { // <--- Usamos el estado 'rol' que acabamos de usar para el login
                navigate('/admin', { replace: true });
            } else { // Si no es admin, redirigimos al inicio o al carrito
                if (returnToCart && typeof setIsCartOpen === 'function') {
                    setTimeout(() => setIsCartOpen(true), 300);
                }
                navigate('/', { replace: true });
            }
        }
    };

    if (loadingAuth) {
        return <div>Cargando autenticación...</div>;
    }

    // Si el usuario ya está logueado, no mostramos el formulario de login
    // El useEffect se encargará de la redirección.
    if (usuario) {
        return (
            <div className="container mt-5" style={{ minHeight: '60vh', textAlign: 'center' }}>
                <h2 className="mb-4">Ya estás logueado</h2>
                <p>Redirigiendo...</p>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-5" style={{ minHeight: '60vh' }}>
                <h2 className="mb-4">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="form-container">
                    <label htmlFor="emailInput">Email:</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        id="emailInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="passwordInput">Contraseña:</label>
                    <input
                        type="password"
                        className="form-control mb-3"
                        id="passwordInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <label htmlFor="rolSelect">Rol:</label>
                    <select
                        className="form-control mb-4"
                        id="rolSelect"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    >
                        <option value="Cliente">Cliente</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <button type="submit" className="btn btn-primary">
                        Ingresar
                    </button>
                </form>
            </div>

            <Footer />
        </>
    );
};

export default Login;