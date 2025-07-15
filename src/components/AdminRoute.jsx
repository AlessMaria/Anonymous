import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar useAuth

const AdminRoute = ({ children }) => {
    const { usuario, isAdmin, loadingAuth } = useAuth();

    if (loadingAuth) {
        // Muestra un spinner de carga mientras se verifica la autenticación
        return <div>Cargando panel de administración...</div>;
    }

    // Si no hay usuario logueado, redirige a login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // Si el usuario no es admin, redirige a una página de no autorizado o al home
    if (!isAdmin) {
        return <Navigate to="/" replace />; // O a una página de error 403 / NoAutorizado
    }

    // Si es admin, permite el acceso
    return children;
};

export default AdminRoute;