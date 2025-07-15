import React , {useState}from 'react'
import './styleProductos.css'
import Swal from 'sweetalert2'; // <-- NUEVA IMPORTACIÓN

const Productos = ({producto,agregarCarrito}) => {

  const [cantidad, setCantidad] = useState(1);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCartClick = () => {
    agregarCarrito({ ...producto, cantidad });
    // Mostrar SweetAlert de éxito cuando se agrega al carrito
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado',
      text: `${producto.nombre} ha sido añadido al carrito.`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <section className='card'>
      <div className='imganContainer'>
        <img src={producto.imagen}alt="" className='imagen'/>
      </div>

      <h3 className='nombre'>{producto.name}</h3>
      <p className='precio'>${producto.price}</p>
      <p className='stock'>{producto.stock}</p>

      <div className='cantidadContainer'>
        <button className='qtyButton' onClick={decrease}>-</button>
        <span>{cantidad}</span>
        <button className='qtyButton' onClick={increase}>+</button>
      </div>

      <button onClick={handleAddToCartClick}> {/* <-- Se cambió la llamada aquí */}
        Agregar al carrito
      </button>

    </section>
  )
}

export default Productos