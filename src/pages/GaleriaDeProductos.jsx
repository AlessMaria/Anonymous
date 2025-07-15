import React, { useState, useEffect } from 'react';
import Footer from '../components/estaticos/Footer';
import ProductList from '../components/ProductList';
import loading from '../assets/loading2.gif';

const GaleriaDeProductos = ({ productos, cargando, agregarCarrito }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4; // Definimos 4 productos por página

  // Lógica de filtrado de productos
  const filteredProducts = productos.filter(producto => {
    // MODIFICACIÓN CRÍTICA AQUÍ: Prioriza 'nombre', si no existe, usa 'name'.
    const productName = producto.nombre || producto.name; 
    return productName && productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Resetear la página actual a 1 cuando cambia el término de búsqueda
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <div className="container mt-5" style={{ minHeight: '80vh' }}>
        <h1 className='noso'>Lo que te Ofrecemos</h1>
        <h2 className='noso'>Puede ser tuyo con un simple Click</h2>

        {/* Buscador de productos */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
          <input
            type="text"
            placeholder="Buscar productos por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              width: '300px', // Ancho del buscador
              fontSize: '1rem',
              marginRight: '10px',
            }}
          />
        </div>

        {cargando ? (
          <img src={loading} alt='Cargando...' style={{ display: 'block', margin: '50px auto' }} />
        ) : (
          <>
            {/* Mostrar ProductList con los productos de la página actual */}
            {currentProducts.length > 0 ? (
                <ProductList agregarCarrito={agregarCarrito} productos={currentProducts} />
            ) : (
                <p style={{textAlign: 'center', fontSize: '1.2rem', marginTop: '50px'}}>No se encontraron productos que coincidan con la búsqueda.</p>
            )}


            {/* Controles de paginación */}
            {filteredProducts.length > productsPerPage && ( // Solo muestra paginación si hay más de 4 productos
              <div style={{
                display: 'flex',
                justifyContent: 'center', // Centra los botones
                marginTop: '30px',
                marginBottom: '50px', // Espacio abajo
                gap: '10px' // Espacio entre botones
              }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    style={{
                      padding: '8px 15px',
                      border: `1px solid ${currentPage === i + 1 ? '#007bff' : '#ccc'}`,
                      borderRadius: '5px',
                      backgroundColor: currentPage === i + 1 ? '#007bff' : '#f8f9fa',
                      color: currentPage === i + 1 ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                      transition: 'background-color 0.3s, color 0.3s'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;