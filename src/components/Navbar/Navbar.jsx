// En Navbar.jsx

import React from 'react';
// import { Link } from 'react-router-dom';  // Importa Link para la navegación
import './Navbar.css';  // Importa un archivo de estilos CSS si es necesario
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

function Navbar({ setActivo,isInline = false, setopenMenu, bandera2}) {
  
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Eliminar el token de localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    navigate('/Login');
  };



  return (
   
    <div>
      
     {bandera2 === 'admin' ? <Menu
        style={{ backgroundColor: '#f1f1f1' }}
        mode={isInline ? "inline" : 'horizontal'}
        onClick={(e) => {
          switch (e.key) {
            case '1': setActivo('link'); break;
            case '2': setActivo('eventos'); break;
            case '3': setActivo('usuarios'); break;
            case '4': setActivo('asistencia'); break;
            case '5': setActivo('cumple'); break;
            case '6': setActivo('gestion'); break;
            case '7': setActivo('cerrar'); break;
            default: setActivo('link');
          }
          if (setopenMenu) setopenMenu(false); 
        }}
        items={[
          {
            key: 'logo',
            label: (
             <img src="../../img/logo.png" alt="logo" className='w-22 h-12 mb-3 mr-80' />
            ),
            disabled: true, // Hace que el logo no sea clickeable
          },
          { key: '1', label: 'Generar Link' },
          { key: '2', label: 'Eventos Creados' },
          { key: '3', label: 'Miembros registrados' },
          { key: '4', label: 'Asistencia' },
          { key: '5', label: 'Tabla Cumpleaños' },
          { key: '6', label: 'Gestión interna' },
          { key: '7', label: (<button className='lg:ml-36 lg:mt-3 bg-slate-500 flex justify-center items-center text-slate-100 w-32 h-10' onClick={handleLogout}>Cerrar Sesión</button>) },
        ]}
      /> : 
      <Menu
        style={{ backgroundColor: '#f1f1f1' }}
        mode={isInline ? "inline" : 'horizontal'}
        onClick={(e) => {
          switch (e.key) {
            case '1': setActivo('asistencia'); break;
            case '2': setActivo('usuarios'); break;
            case '3': setActivo('cerrar'); break;
            default: setActivo('asistencia');
          }
          if (setopenMenu) setopenMenu(false); 
        }}
        items={[
          {
            key: 'logo',
            label: (
             <img src="../../img/logo.png" alt="logo" className='w-22 h-12 mb-3 mr-[500px]' />
            ),
            disabled: true, // Hace que el logo no sea clickeable
          },
          { key: '1', label: (<span className=''>Asistencia</span>) },
          { key: '2', label: 'Miembros registrados' },
          { key: '3', label: (<button className='lg:ml-[450px] lg:mt-3 bg-slate-500 flex justify-center items-center text-slate-100 w-32 h-10' onClick={handleLogout}>Cerrar Sesión</button>)},
        ]}
      />}
    </div>
  );
}

export default Navbar;

