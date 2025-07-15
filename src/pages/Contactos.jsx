import React from 'react'
import Footer from '../components/estaticos/Footer'

const Contactos = () => {
  return (
    <>
      <h1 className='noso'>Contáctanos</h1>
      <h3 className='noso'>Puedes ponerte en contacto con nosotros, llenando el siguiente formulario</h3>

      <div className="form-container">
          <form action="https://formspree.io/f/meoqqknv" method="POST">
            <label htmlFor="email">e-mail</label><br />
            <input type="email" id="email" name="email" required /><br />

            <label htmlFor="nombre">Nombre</label><br />
            <input type="text" id="nombre" name="nombre" required /><br />

            <label htmlFor="mensaje">Mensaje:</label><br />
            <textarea id="mensaje" name="mensaje" placeholder="Dejanos tu mensaje.." style={{ height: '200px' }}></textarea><br />

            <input type="submit" value="Enviar mensaje" />
            <input type="reset" value="Reingresar Datos" />
          </form>
        </div>

      <Footer/>
    </>
  )
}

export default Contactos
