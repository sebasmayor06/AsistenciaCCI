import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element, role }) => {
  const { token, rol } = useSelector((state) => state.auth);
  console.log(token, rol);
  

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/Login" />;
  }

  // Si el rol no coincide con el requerido, redirige al login
  if (role && rol !== role) {
    return <Navigate to="/Login" />;
  }

  // Si todo está bien, devuelve el componente que se pasaba como prop 'element'
  return element;
};

export default PrivateRoute;
