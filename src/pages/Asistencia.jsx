import MyCarousel from "../components/Carrusel/Carrusel.jsx"
import Formulario from "../components/Formulario/Formulario.jsx"
import { useParams } from 'react-router-dom';

export default function Asistencia() {
    const { eventId } = useParams();
  return (
    <div className='bg-[#f5f5f5] w-screen min-h-screen flex justify-center items-center flex-col' > 
        
        <h5 className='font-bold text-[#1d1d1d] text-center text-2xl m-10'>INSCRIPCION SERVICIO DE AVIVAMIENTO FAMILIAR - Domingo 27 de Octubre del 2024</h5>
        <div className="font-semibold w-[350px] md:w-[800px] text-[#1d1d1d] mb-6">
          <p className="mb-4">¡Somos los Pastores Jonathan y Carolina y de parte de la iglesia Centro Cristiano Internacional te damos la bienvenida.</p>
          <p className="mb-4">Este es el link de inscripción para que te puedas inscribir junto con tus familiares y amigos.
          </p>
          <p className="mb-4">Te invitamos a diligenciar este formulario de inscripción para asistir a nuestras celebraciones:
          </p>
        </div>
            <h5 className="text-2xl mb-4 font-bold text-[#1d1d1d]">Indicaciones para Inscripción</h5>
        <div className="font-semibold w-[350px] md:w-[800px] text-[#1d1d1d] mb-6">
            <ol>
                <li className="mb-4">1. Inscríbete lo más rápido posible, no lo dejes para lo último, Dios bendice tu interés y diligencia!</li>
                <li className="mb-4">2. Puedes compartir este link para invitar personas nuevas, que han dejado de asistir a la iglesia, miembros regulares, etc.</li>
                <li className="mb-4">3. Recuerda ser puntual.</li>
                <li className="mb-6">4. Cualquier duda, inquietud, pregunta, idea, aporte, comunícate con nosotros a la línea telefónica y de WhatsApp +573246125015.</li>
            </ol>
            <p>¡Te esperamos, hay un lugar para ti!</p>
            <p>Pastores Jonathan y Carolina</p>
            <p>FECHA: 27 de Octubre 2024</p>
            <p>LUGAR: CARRERA 11 # 11-70 BARRIO CENTENARIO</p>
            <p>HORARIO DE LA REUNIÓN: • Servicio Dominical - 9:00 AM</p>
        </div>


        
        <img className="h-[640'x] w-[550px] mb-10" src="/img/bg-image.jpg" alt="fotoPastores" />

      <MyCarousel/>
      <Formulario eventId={eventId}/>
      </div>
  )
}
