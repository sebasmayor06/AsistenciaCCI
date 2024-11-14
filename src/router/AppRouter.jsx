import {Routes, Route, Navigate} from 'react-router-dom'
import Admin from '../pages/Admin.jsx'
import Asistencia from '../pages/Asistencia.jsx'
import ConfirmarAsist from '../pages/ConfirmarAsist.jsx'
import Landingpage from '../pages/Landingpage.jsx'


export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Landingpage/>}/>
            <Route path='/Admin' element={<Admin/>}/>
            <Route path='/Asistencia/:eventId' element={<Asistencia/>}/>
            <Route path='/ConfirmarAsist' element={<ConfirmarAsist/>}/>
        </Routes>
    )
}