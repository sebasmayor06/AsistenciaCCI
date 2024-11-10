import { useEffect, useState } from "react";
import MyCarousel from "../components/Carrusel/Carrusel.jsx"
import Formulario from "../components/Formulario/Formulario.jsx"
import { useParams } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import 'moment/locale/es'; // Importa el locale español


const translateDayToSpanish = (day) => {
  switch (day) {
    case 'Sunday':
      return 'Domingo';
    case 'Monday':
      return 'Lunes';
    case 'Tuesday':
      return 'Martes';
    case 'Wednesday':
      return 'Miércoles';
    case 'Thursday':
      return 'Jueves';
    case 'Friday':
      return 'Viernes';
    case 'Saturday':
      return 'Sábado';
    default:
      return day; // Devuelve el día original si no coincide
  }
};

// Función para traducir el mes a español
const translateMonthToSpanish = (month) => {
  switch (month) {
    case 'January':
      return 'Enero';
    case 'February':
      return 'Febrero';
    case 'March':
      return 'Marzo';
    case 'April':
      return 'Abril';
    case 'May':
      return 'Mayo';
    case 'June':
      return 'Junio';
    case 'July':
      return 'Julio';
    case 'August':
      return 'Agosto';
    case 'September':
      return 'Septiembre';
    case 'October':
      return 'Octubre';
    case 'November':
      return 'Noviembre';
    case 'December':
      return 'Diciembre';
    default:
      return month; // Devuelve el mes original si no coincide
  }
};

// Configura moment para usar el locale español
moment.locale('es');
export default function Asistencia() {

  const [fecha, setFecha] = useState('')

   const api = 'https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com' 
  // const api = 'http://localhost:3000'
    const { eventId } = useParams();

    useEffect(() => {
      handleConsultaEvent(eventId)
    }, [eventId])

    const handleConsultaEvent = async (eventId) => {
      const response = await axios.post(`${api}/consultarEvento`, { eventId }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const eventDate = moment(response.data.event_date); 

    const dayInEnglish = eventDate.format('dddd'); 
    const monthInEnglish = eventDate.format('MMMM'); 
  
    const dayInSpanish = translateDayToSpanish(dayInEnglish);
    const monthInSpanish = translateMonthToSpanish(monthInEnglish);
  
    const formattedDate = `${dayInSpanish} ${eventDate.date()} de ${monthInSpanish} del ${eventDate.year()}`;
  
    setFecha(formattedDate)
    
          
    }
  return (
    <div className='bg-[#f5f5f5] w-screen min-h-screen flex justify-center items-center flex-col' > 
        
        <h5 className='font-bold text-[#1d1d1d] text-center text-2xl m-10'>INSCRIPCION SERVICIO DE AVIVAMIENTO FAMILIAR - {fecha}</h5>
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
                {/* <li className="mb-6">4. Cualquier duda, inquietud, pregunta, idea, aporte, comunícate con nosotros a la línea telefónica y de WhatsApp +573246125015.</li> */}
            </ol>
            <p>¡Te esperamos, hay un lugar para ti!</p>
            <p>Pastores Jonathan y Carolina</p>
            <p>FECHA: {fecha}</p>
            <p>LUGAR: CARRERA 11 # 11-70 BARRIO CENTENARIO</p>
            <p>HORARIO DE LA REUNIÓN: • Servicio Dominical - 9:00 AM</p>
        </div>


        
        <img className="h-[640'x] w-[550px] mb-10" src="/img/bg-image.jpg" alt="fotoPastores" />

      <MyCarousel/>
      <Formulario eventId={eventId}/>
      </div>
  )
}
