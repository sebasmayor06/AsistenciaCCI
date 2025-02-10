import {Routes, Route, Navigate} from 'react-router-dom'
import Admin from '../pages/Admin.jsx'
import Asistencia from '../pages/Asistencia.jsx'
import ConfirmarAsist from '../pages/ConfirmarAsist.jsx'
import Landingpage from '../pages/Landingpage.jsx'
import Login from '../pages/Login.jsx'
import { useState } from 'react'
import User from '../pages/User.jsx'


export const AppRouter = () => {
    const [login, setLogin] = useState(false)
    
    return (
        <Routes>
            <Route path='/' element={<Landingpage/>}/>
            <Route path='/Login' element={<Login setLogin={setLogin}/>}/>
            <Route path='/Admin' element={login?<Admin/>:<Login setLogin={setLogin}/>}/>
            <Route path='/Asistencia/:eventId' element={<Asistencia/>}/>
            <Route path='/ConfirmarAsist' element={<ConfirmarAsist/>}/>
            <Route path='/User' element={<User/>}/>
        </Routes>
    )
}