import React from 'react'
import Footer from '../components/estaticos/Footer'
import somos from "../assets/nosotros.jpg"


const AcercaDe = () => {
  return (
    <>
      <h1 className='noso'>Quienes Somos</h1>
      <p className='noso'>Bienvenidos a un rincón donde el tiempo no caduca y la belleza jamás se devalúa. Aquí, cada pieza tiene una historia que contar, un susurro del pasado que merece ser escuchado.<br></br>
      No somos un simple comercio, somos los curadores de la inmortalidad, los cazadores de maravillas perdidas, los embajadores de la historia que se niega a quedar en el olvido. Desde la majestuosidad de una obra maestra hasta el encanto de un objeto que desafió el paso del tiempo, cada pieza que ofrecemos es un testimonio de lo que nos hace humanos: nuestra obsesión por crear, preservar y maravillarnos.<br></br>
      ¿Comprar? No. Aquí, lo que hacemos es adoptar fragmentos de cultura, darle un nuevo hogar a aquello que ha visto siglos pasar, y permitir que cada uno de ustedes sea parte de este legado. Porque si la historia nos ha enseñado algo, es que las verdaderas joyas no están en los escaparates convencionales, sino en las manos de quienes saben apreciarlas.<br></br>
      Así que, adelante: conviértanse en los nuevos guardianes de la historia. Que el arte, la cultura y la magia sean bienvenidos en su mundo.
      </p>

      <img className='somos' src={somos} alt='Nosotros'></img>

      <Footer />
    </>
  )
}

export default AcercaDe
