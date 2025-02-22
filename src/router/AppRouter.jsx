import {Routes, Route, Navigate} from 'react-router-dom'
import Admin from '../pages/Admin.jsx'
import Asistencia from '../pages/Asistencia.jsx'
import ConfirmarAsist from '../pages/ConfirmarAsist.jsx'
import Landingpage from '../pages/Landingpage.jsx'
import Login from '../pages/Login.jsx'
import PrivateRoute from '../components/PrivateRoute.jsx'
import { useState, useEffect} from 'react'
import User from '../pages/User.jsx'
import { useDispatch } from "react-redux";
// import { setRegisteredUsers } from "../features/auth/authSlice.js"; // Asegúrate de que la ruta sea correcta
import axios from "axios";


export const AppRouter = () => {

    // const dispatch = useDispatch();
    const [login, setLogin] = useState(false)

  //   const fetchRegisteredUsers = async () => {
  //       try {
  //         const response = await axios.get(`${apiUrl}/consultarRegistrados`, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //         dispatch(setRegisteredUsers(response.data)); // Guardamos los usuarios en el estado global
  //       } catch (error) {
  //         console.error("Error en la solicitud:", error);
  //       }
  //     };

  // useEffect(() => {
  //   fetchRegisteredUsers();
  // }, [dispatch]);
    
    return (
        <Routes>
            <Route path='/' element={<Landingpage/>}/>
            <Route path='/Login' element={<Login />}/>
            {/* <Route path='/Admin' element={login?<Admin/>:<Login setLogin={setLogin}/>}/> */}
            <Route
          path="/admin"
          element={<PrivateRoute element={<Admin />} role="admin" />}
        />
        <Route
          path="/user"
          element={<PrivateRoute element={<User />} role="servidor" />}
        />
            <Route path='/Asistencia/:eventId' element={<Asistencia/>}/>
            {/* <Route path='/ConfirmarAsist' element={login?<ConfirmarAsist/>:<Login setLogin={setLogin}/>}/> */}
            {/* <Route path='/ConfirmarAsist' element={<ConfirmarAsist/>}/> */}
            {/* <PrivateRoute path="/user" element={<User />} role="user" /> */}
        </Routes>
    )
}