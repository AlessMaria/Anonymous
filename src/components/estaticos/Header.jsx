import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './styleEstatico.css';
import { useAuth } from '../../context/AuthContext'; // Importar useAuth
// Ya no necesitamos importar signOut ni auth directamente aquí si AuthContext los maneja
// import { signOut } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';

const Header = ({ cartItems = [], onOpenCart }) => {
  const navigate = useNavigate();
  // Obtener usuario, isAdmin y logout del contexto
  const { usuario, isAdmin, logout } = useAuth(); 

  const handleCartClick = () => {
    if (!usuario) {
      toast.info('Iniciá sesión para ver el carrito 🛒');
      navigate('/login', { state: { returnToCart: true } });
    } else {
      onOpenCart();
    }
  };

  // Usamos la función logout del AuthContext
  const handleLogout = async () => {
    const success = await logout(); // Llama a la función de logout centralizada
    if (success) {
      navigate('/'); // Redirige a la página de inicio después del logout exitoso
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Anonymous</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/acercade">Sobre nosotros</Nav.Link>
            <Nav.Link as={Link} to="/productos">Galería de productos</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            
            {/* ENLACE CONDICIONAL PARA ADMIN */}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">Panel Admin</Nav.Link>
            )}
          </Nav>

          {/* Saludo personalizado */}
          {usuario ? ( // Usamos 'usuario' para verificar si está logueado
            <span className="text-white me-3">
              Hola {isAdmin ? 'Administrador' : 'Usuario'} 👋
            </span>
          ) : (
            // No hay saludo si no hay usuario
            null
          )}

          {/* Login / Logout dinámico */}
          {!usuario ? ( // Si no hay usuario, mostrar botón de Login
            <Button variant="outline-light" as={Link} to="/login">
              Login
            </Button>
          ) : ( // Si hay usuario, mostrar botón de Logout
            <Button variant="outline-warning" onClick={handleLogout}>
              Logout
            </Button>
          )}

          {/* Botón del carrito */}
          <Button variant="outline-light" onClick={handleCartClick} className="ms-2">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <span className="ms-2">({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
            )}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;