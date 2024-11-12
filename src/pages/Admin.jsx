import React, { useState } from 'react'
import GeneratorLink from '../components/GeneratorLink/GeneratorLink';
import UsuariosRegistrados from '../components/UsuariosRegistrados/UsuariosRegistrados';
import { Button, Flex } from 'antd';
import './Admin.css';  // Asegúrate de importar tus estilos CSS
import ConfirmarAsist from './ConfirmarAsist';
import TablaCumple from '../components/TablaCumple/TablaCumple';

export default function Admin() {
  const [activo, setActivo] = useState('link');
  
  return (
    <div className='bg-[#1d1d1d] w-screen min-h-screen flex justify-start items-center flex-col'>
      <Flex className='m-4 flex justify-center items-center' gap="small" wrap>
        <Button className={activo === 'link' ? 'active-button' : ''} type="primary" onClick={() => setActivo('link')}>Generar Link</Button>
        <Button className={activo === 'usuarios' ? 'active-button' : ''} type="primary" onClick={() => setActivo('usuarios')}>Miembros registrados</Button>
        <Button className={activo === 'asistencia' ? 'active-button' : ''} type="primary" onClick={() => setActivo('asistencia')}>Asistencia</Button>
        <Button className={activo === 'cumple' ? 'active-button' : ''} type="primary" onClick={() => setActivo('cumple')}>Tabla Cumpleaños</Button>
      </Flex>

      {activo === 'link' && <GeneratorLink />}
      {activo === 'usuarios' && <UsuariosRegistrados />}
      {activo === 'asistencia' && <ConfirmarAsist />}
      {activo === 'cumple' && <TablaCumple />}
    </div>
  );
}
