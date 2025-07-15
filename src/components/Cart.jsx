import './styleCart.css';
import Swal from 'sweetalert2';

const Cart = ({
  cartItems = [],
  isOpen,
  onClose,
  borrarProducto,
  vaciarCarrito
}) => {
  const hasItems = Array.isArray(cartItems) && cartItems.length > 0;

  const totalCompra = cartItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const handlePagoSimulado = () => {
    if (!hasItems) return;

    Swal.fire({
      title: 'Confirmación de pago',
      text: `¿Deseás confirmar el pago de $${totalCompra.toFixed(2)}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, pagar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Pago exitoso!',
          text: 'Gracias por tu compra. Las reliquias serán enviadas con historia incluida 🏺📦',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          vaciarCarrito(); // 🧹 limpia el carrito
          onClose();       // 🔒 lo cierra
        });
      }
    });
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h3 style={{ color: 'black' }}>Carrito de Compras</h3>
        <button onClick={onClose} className="close-button">X</button>
      </div>

      <div className="cart-content">
        {!hasItems ? (
          <p style={{ color: 'black' }}>El carrito está vacío</p>
        ) : (
          <>
            <ul className="cart-item">
              {cartItems.map((item) => (
                <li key={item.id} style={{ color: 'black' }}>
                  {item.nombre} – ${item.precio} × {item.cantidad} = ${item.precio * item.cantidad}
                  <button onClick={() => borrarProducto(item)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>
            <div
              className="cart-total"
              style={{ color: 'black', marginTop: '1rem', fontWeight: 'bold' }}
            >
              Total: ${totalCompra.toFixed(2)}
            </div>
            <button className="btn btn-success mt-3" onClick={handlePagoSimulado}>
              Finalizar compra
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
