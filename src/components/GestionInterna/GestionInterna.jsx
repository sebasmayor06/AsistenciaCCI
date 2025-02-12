import { Button, Flex } from 'antd'
import React, { useState } from 'react'
import GeneratorLink from '../GeneratorLink/GeneratorLink';
import EventosCreados from '../EventosCreados/EventosCreados';


export default function GestionInterna() {

      const [activo, setActivo] = useState('usu');

  return (
    <>
      <h5 className='mt-4 mb-5 font-semibold text-xl md:text-4xl text-white'>Gestion Interna</h5>
      <div className="flex flex-col md:flex-row gap-2 mb-4">

        
      <Flex className='m-4 flex justify-center items-center' gap="small" wrap>
        <Button className={activo === 'usu' ? 'active-button' : ''} type="primary" onClick={() => setActivo('usu')}>Crear Usuarios</Button>
        <Button className={activo === 'prod' ? 'active-button' : ''} type="primary" onClick={() => setActivo('prod')}>Crear Productos</Button>
       
      </Flex>
       
      </div>

      {activo === 'usu' && <GeneratorLink />}
      {activo === 'prod' && <EventosCreados />}
    
      
    </>
  )
}
