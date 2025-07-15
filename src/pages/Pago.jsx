import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Pago = ({ cart = [], setCart }) => {
const navigate = useNavigate();

  // Evita que cart sea undefined o null
const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.precio * item.quantity, 0)
    : 0;

const handleFinalizar = () => {
    if (!Array.isArray(cart) || cart.length === 0) {
        toast.warning('El carrito ya está vacío 🛒');
        return;
    }

    setCart([]);
    toast.success('¡Compra finalizada con éxito! 🎉 Gracias por tu pedido');
};

return (
    <div className="container mt-4">
    <h2>Resumen de tu compra</h2>

    {Array.isArray(cart) && cart.length > 0 ? (
        <>
        <ul className="list-group mb-3">
            {cart.map((item) => (
            <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span>{item.nombre} × {item.quantity}</span>
                <span>${item.precio * item.quantity}</span>
            </li>
            ))}
        </ul>

        <h4 className="mb-4">Total: ${total}</h4>

        <button className="btn btn-success" onClick={handleFinalizar}>
            Finalizar compra
        </button>
        </>
        ) : (
        <>
            <p>No hay productos en el carrito.</p>
            <button onClick={() => navigate('/')} className="btn btn-outline-primary mt-3">
            Volver al inicio
        </button>
        </>
        )}
    </div>
    );
};

export default Pago;