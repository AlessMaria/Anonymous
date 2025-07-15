import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductList'
import loading from '../assets/loading2.gif'
import logo from "../assets/logo.png"
import { Carousel } from 'react-bootstrap'
import "../components/estaticos/styleEstatico.css"

const Home = ({ productos, cargando, agregarCarrito }) => {
  return (
    <>
            <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.postimg.cc/vTvhm4Dt/trevi.jpg"
            alt="Fontana di Trevi"
          />
          <Carousel.Caption>
            <h3 className='carru'>Arte clásico</h3>
            <p className='carru'>Piezas únicas de colección</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.postimg.cc/yx3cSWfZ/biblio.jpg"
            alt="Bioblioteca de Alejandría"
          />
          <Carousel.Caption>
            <h3 className='carru'>Reliquias ancestrales</h3>
            <p className='carru'>Testigos del tiempo</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.postimg.cc/kGwNmLhj/Jardines.jpg"
            alt="Jardines Colgantes"
          />
          <Carousel.Caption>
            <h3 className='carru'>Obras eternas</h3>
            <p className='carru'>Guardianas de la historia</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <main>
        <div className='titulo-logo'>
        <img className='logo' src={logo} alt="Anonymous" />
        <h1 className='titulo'>Anonymous Antiquities Aquisitions</h1>
        </div>
        <h2 className='noso'>Les da la bienvenida</h2>

        <p className='noso'>Si siempre sentiste algo especial por el Arte, las Megaconstrucciones, Las Maravillas del Mundo, y te considerás un Guardian de la Historia. <br></br> 
        Este es tu lugar.</p>
        {
          cargando ? <img src={loading} alt='loading' /> :

          <ProductList agregarCarrito={agregarCarrito} productos={productos}/>
        }

      </main>

      <Footer />
    </>
  )
}

export default Home
