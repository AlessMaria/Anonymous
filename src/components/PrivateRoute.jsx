import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- NUEVA IMPORTACIÓN

const PrivateRoute = ({ children }) => {
    const { usuario, loadingAuth } = useAuth(); // Obtener usuario y loadingAuth del contexto

    // Muestra un estado de carga mientras se verifica la autenticación
    if (loadingAuth) {
        return <div>Cargando...</div>; // O un spinner
    }

    // Si el usuario NO está autenticado, redirige al login
    return usuario ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;