import React, { useState } from 'react'
import GeneratorLink from '../components/GeneratorLink/GeneratorLink';
import UsuariosRegistrados from '../components/UsuariosRegistrados/UsuariosRegistrados';
import { Button, Flex } from 'antd';
import './Admin.css';  // Asegúrate de importar tus estilos CSS
import ConfirmarAsist from './ConfirmarAsist';
import TablaCumple from '../components/TablaCumple/TablaCumple';
import EventosCreados from '../components/EventosCreados/EventosCreados';
import { MenuOutlined } from "@ant-design/icons"
import Navbar from "../components/Navbar/Navbar"
import { Drawer } from "antd"
import GestionInterna from '../components/GestionInterna/GestionInterna';

export default function Admin() {
  const [activo, setActivo] = useState('link');
  const [openMenu, setopenMenu] = useState(false)

  
  return (
    <div className='bg-[#1d1d1d] w-screen min-h-screen flex justify-start items-center flex-col'>
      <div className='w-full'>

       <div style={{backgroundColor: '#f1f1f1', color: 'black' , height: 60}} onClick={() => setopenMenu(true)} className="menuIcon">
        <MenuOutlined style={{fontSize: 20 , paddingLeft: 12, paddingTop: 12}}/>
      </div>
      <span className="headerMenu">
      <Navbar setActivo={setActivo} bandera2 = {'admin'}/>
      </span>
      <Drawer 
      style={{backgroundColor: '#f1f1f1'}}
      placement="left"
          open = {openMenu}
          onClose={() => setopenMenu(false)}
          closable={false}>
      <Navbar isInline setActivo={setActivo} setopenMenu={setopenMenu} bandera2 = {'admin'}/>
      </Drawer>
      </div>
      {activo === 'link' && <GeneratorLink />}
      {activo === 'eventos' && <EventosCreados />}
      {activo === 'usuarios' && <UsuariosRegistrados />}
      {activo === 'asistencia' && <ConfirmarAsist />}
      {activo === 'gestion' && <GestionInterna/>}
      {activo === 'cumple' && <TablaCumple />}

     
    </div>
    
  );
}
