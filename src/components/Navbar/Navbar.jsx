// En Navbar.jsx

import React from 'react';
// import { Link } from 'react-router-dom';  // Importa Link para la navegación
import './Navbar.css';  // Importa un archivo de estilos CSS si es necesario

function Navbar() {
  return (
    <nav className="navbar flex flex-row justify-center items-center">
        <img src="../../img/logo.png" alt="logo" className='w-44 h-24' />
      {/* <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">Acerca de</Link>
        </li>
        <li className="nav-item">
          <Link to="/services" className="nav-link">Servicios</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">Contacto</Link>
        </li>
      </ul> */}
    </nav>
  );
}

export default Navbar;

