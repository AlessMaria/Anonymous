import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AdminPanel = () => {
    // Estados para el formulario de agregar producto
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [stock, setStock] = useState('');
    const [imagen, setImagen] = useState('');

    // NUEVOS ESTADOS para gestionar la lista de productos en el admin
    const [products, setProducts] = useState([]); // Almacena los productos de MockAPI
    const [loadingProducts, setLoadingProducts] = useState(true); // Estado de carga para la lista de productos

    const MOCKAPI_PRODUCTS_URL = 'https://682f77e9f504aa3c70f427f0.mockapi.io/productos';

    // Función para obtener los productos desde MockAPI
    const fetchProducts = async () => {
        setLoadingProducts(true);
        try {
            const response = await fetch(MOCKAPI_PRODUCTS_URL);
            if (!response.ok) {
                throw new Error('Error al obtener productos de MockAPI');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Error al cargar la lista de productos.');
        } finally {
            setLoadingProducts(false);
        }
    };

    // useEffect para cargar los productos cuando el componente se monta
    useEffect(() => {
        fetchProducts();
    }, []); // El array vacío asegura que se ejecute solo una vez al montar

    // Función para manejar el envío del formulario de agregar producto
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !precio || !stock || !imagen) {
            toast.error('Por favor, completá todos los campos.');
            return;
        }
        if (isNaN(precio) || parseFloat(precio) <= 0) {
            toast.error('El precio debe ser un número positivo.');
            return;
        }
        if (isNaN(stock) || parseInt(stock) < 0) {
            toast.error('El stock debe ser un número entero no negativo.');
            return;
        }

        const nuevoProducto = {
            nombre,
            precio: parseFloat(precio),
            stock: parseInt(stock),
            imagen
        };

        try {
            const response = await fetch(MOCKAPI_PRODUCTS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                throw new Error('Error al agregar producto');
            }

            toast.success('Producto agregado exitosamente 🎉');
            setNombre('');
            setPrecio('');
            setStock('');
            setImagen('');
            fetchProducts(); // Recargar la lista de productos después de agregar uno nuevo
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error al agregar el producto.');
        }
    };

    // NUEVA FUNCIÓN: Manejar la eliminación de un producto
    const handleDeleteProduct = async (productId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${productId}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar producto');
                    }

                    toast.success('Producto eliminado exitosamente 👋');
                    fetchProducts(); // Recargar la lista de productos después de eliminar uno
                } catch (error) {
                    console.error('Error deleting product:', error);
                    toast.error('Error al eliminar el producto.');
                }
            }
        });
    };

    return (
        <div className="container mt-5" style={{ minHeight: '80vh' }}>
            <h2 className="mb-4">Panel de Administración</h2>

            {/* Sección para Agregar Producto */}
            <h3 className="mb-3">Agregar Nuevo Producto</h3>
            <form onSubmit={handleSubmit} className="mb-5 p-4 border rounded shadow-sm">
                <div className="mb-3">
                    <label htmlFor="nombreProducto" className="form-label">Nombre del Producto:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreProducto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precioProducto" className="form-label">Precio:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precioProducto"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        step="0.01"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stockProducto" className="form-label">Stock:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stockProducto"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imagenProducto" className="form-label">URL de la Imagen:</label>
                    <input
                        type="url"
                        className="form-control"
                        id="imagenProducto"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Agregar Producto
                </button>
            </form>

            {/* Sección para Gestionar Productos Existentes */}
            <h3 className="mt-5 mb-3">Gestionar Productos Existentes</h3>
            {loadingProducts ? (
                <p>Cargando productos...</p> // Puedes poner un spinner aquí si quieres
            ) : products.length === 0 ? (
                <p>No hay productos para gestionar.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Imagen</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    {/* Muestra 'nombre' si existe, si no, 'name' */}
                                    <td>{product.nombre || product.name}</td>
                                    <td>${product.precio || product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <img
                                            src={product.imagen || product.image} // También aquí, considera 'image' por si hay inconsistencia
                                            alt={product.nombre || product.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;