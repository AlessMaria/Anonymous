import { useState, useEffect, useCallback } from 'react'; // <-- Agregado useCallback
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // <-- Agregado toast
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';
import Swal from 'sweetalert2'; // <-- Agregado Swal

// Páginas
import Home from './pages/Home';
import AcercaDe from './pages/AcercaDe';
import Contactos from './pages/Contactos';
import GaleriaDeProductos from './pages/GaleriaDeProductos';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Pago from './pages/Pago';
import AdminPanel from './pages/AdminPanel';

// Componentes
import Header from './components/estaticos/Header';
import PrivateRoute from './components/PrivateRoute';
import Cart from './components/Cart';
import AdminRoute from './components/AdminRoute'; // Asegúrate de que esta importación exista, la agregamos antes

function App() {
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { usuario } = useAuth();

  // URL de tu MockAPI para productos
  const MOCKAPI_PRODUCTS_URL = 'https://682f77e9f504aa3c70f427f0.mockapi.io/productos'; // <-- TU URL DE MOCKAPI

  // Función para cargar los productos desde MockAPI
  const fetchProductos = useCallback(async () => { // <-- Envuelto en useCallback
    setCargando(true);
    setError(false);
    try {
      const response = await fetch(MOCKAPI_PRODUCTS_URL);
      if (!response.ok) {
        throw new Error('No se pudieron cargar los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(true);
      toast.error('Error al cargar los productos. Por favor, intentá de nuevo más tarde.');
    } finally {
      setCargando(false);
    }
  }, []); // Dependencias vacías porque la URL es constante

  // Cargar productos al inicio de la aplicación
  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]); // fetchProductos es una dependencia debido a useCallback

  const handleOpenCart = () => {
    if (usuario) {
      setIsCartOpen(true);
    } else {
      toast.warning('Por favor iniciá sesión para ver el carrito');
    }
  };

  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    // SweetAlert para agregar al carrito se maneja en Productos.jsx
  };

  const handleDeleteFromCart = (product) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === product.id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter(item => item !== null)
    );
  };

  const vaciarCarrito = () => {
    setCart([]);
  };

  return (
    <Router>
      <Header
        cartItems={cart}
        borrarProducto={handleDeleteFromCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              cart={cart}
              borrarProducto={handleDeleteFromCart}
              agregarCarrito={handleAddToCart}
              productos={productos}
              cargando={cargando}
            />
          }
        />

        <Route path="/acercade" element={<AcercaDe cart={cart} borrarProducto={handleDeleteFromCart} />} />

        <Route
          path="/productos"
          element={
            <GaleriaDeProductos
              cart={cart}
              borrarProducto={handleDeleteFromCart}
              agregarCarrito={handleAddToCart}
              productos={productos}
              cargando={cargando}
            />
          }
        />

        <Route path="/contacto" element={<Contactos cart={cart} borrarProducto={handleDeleteFromCart} />} />

        <Route path="/login" element={<Login setIsCartOpen={setIsCartOpen} />} />

        {/* Ruta protegida para administradores */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              {/* Le pasamos la función fetchProductos al AdminPanel */}
              <AdminPanel onProductAdded={fetchProductos} /> 
            </AdminRoute>
          }
        />

        <Route
          path="/pago"
          element={
            <PrivateRoute>
              <Pago cart={cart} setCart={setCart} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Cart
        isOpen={isCartOpen}
        cartItems={cart}
        onClose={() => setIsCartOpen(false)}
        borrarProducto={handleDeleteFromCart}
        vaciarCarrito={vaciarCarrito}
      />

      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
    </Router>
  );
}

export default App;