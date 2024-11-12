import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio, Select, Tag, DatePicker, notification } from 'antd';
import './Formulario.css'
import data from '../../../public/data'
import axios from 'axios';
import moment from 'moment';


// const customizeRequiredMark = (label, { required }) => (
//   <>
//     {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
//     {label}
//   </>
// );
const Formulario = (event_id) => {
  
  
  //  const api = 'http://localhost:3000'
 const api = 'https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com/'

  const [form] = Form.useForm();
  // const [requiredMark, setRequiredMarkType] = useState('optional');
  // const onRequiredTypeChange = ({ requiredMarkValue }) => {
  //   setRequiredMarkType(requiredMarkValue);
  // };
  const [asistePorPrimeraVez, setAsistePorPrimeraVez] = useState(null);
  const [dataConsul, setDataConsul] = useState('');


  useEffect(()=>{

    if (dataConsul && dataConsul.dni) {
      handleConsultarAsistenciaGet(event_id);
  }

  }, [dataConsul.dni])

  const handleConsultarAsistenciaGet = async (event_id) => {
    try {

      const response = await axios.post(`${api}/consultarAsistenciaEvent`, { event_id }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const dniBuscado = dataConsul.dni; 

    const existe = response.data.some(asistente => asistente.dni === dniBuscado);

    if (existe) {
      notification.open({
        message: 'Asistencia',
        description: `Esta persona ya firmo su asistencia`,
        type: 'warning', // Puedes cambiar el tipo a 'success', 'error', o 'warning' según sea necesario
         style: {
          backgroundColor: '#fff3cd', // Cambia el color de fondo
          border: '1px solid #ffeeba', // Cambia el borde
          color: '#856404', // Cambia el color del texto
        }
      });
      form.resetFields()
      setDataConsul('')
    }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  }
  

  const handleRadioChange = (e) => {
    setAsistePorPrimeraVez(e.target.value);
  };

  const { Option } = Select;

  const handleConsulta = async (dni) => {
    
    try {
      const response = await axios.post(`${api}/consultarAsistente`, { dni }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const dataWithMoment = {
        ...response.data,
        nuevo: dataConsul === '' ? 0 : 1,
        fecha_de_nacimiento: response.data.fecha_de_nacimiento ? moment(response.data.fecha_de_nacimiento) : null,
      };
  
      setDataConsul(response.data);
      form.setFieldsValue(dataWithMoment);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  const handleSubmit = async () => {
    const {dni, full_name, estado_civil, phone_number, fecha_de_nacimiento, ciudad, barrio, direccion, bautizo } = form.getFieldValue()
    const formData = {dni, full_name, estado_civil, phone_number, fecha_de_nacimiento, ciudad, barrio, direccion, bautizo};
    const formData2 = {
      dni: formData.dni,
      event_id: event_id.eventId,
      registration_time: moment().format('YYYY-MM-DD HH:mm:ss'), // Fecha y hora actual
      update_asit: moment().format('YYYY-MM-DD HH:mm:ss'),       // Fecha y hora actual
      attended: false,
      peticion: form.getFieldValue().peticion,
      aporte: form.getFieldValue().aporte, 
      nuevo: form.getFieldValue().nuevo, 
      nombreinv: form.getFieldValue().nombreinv
    };
    
    try {
      if (dataConsul === '') {
        
        const response1 = await axios.post(`${api}/registerAsistente`, formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      const response2 = await axios.post(`${api}/resgisterAsistencia`, formData2, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if ( response2.status === 200) {
        window.location.reload();
      } else {
        console.error('Error en la solicitud:', response2.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    
  };

  const handleBlur = (e) => {
    const dni = e.target.value;
    if (dni) { 
      handleConsulta(dni);
    }
  };



  return (
    <Form
    className= 'w-80 md:w-[600px] mt-10 '
      form={form}
      layout="vertical"
      // initialValues={{
      //   requiredMarkValue: requiredMark,
      // }}
      // onValuesChange={onRequiredTypeChange}
      // requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
      onFinish={handleSubmit}
    >
      
      <Form.Item name="dni" className='white-label' label="Numero Cedula:" rules={[{ required: true, message: 'Por favor ingresa tu número de cédula.' }]} >
      <Input onBlur={handleBlur} disabled={dataConsul} autoComplete='tel'/>
      </Form.Item>
      <Form.Item name="full_name" className='white-label' label="Nombre y apellido 📝:" rules={[{ required: true, message: 'Por favor ingresa tu nomnbre completo.' }]}>
        <Input  disabled={dataConsul} autoComplete="name"/>
      </Form.Item>
      <Form.Item name="estado_civil" className='white-label' label="Estado civil:" rules={[{ required: true, message: 'Por favor selecciona tu estado civil.' }]}>
          <Select>
          {
            data.options.map((option, index) => {
              return  <Option key={index} value={option.value}>{option.label}</Option>
            })

          }
          </Select>
        </Form.Item>
      <Form.Item name="phone_number"  className='white-label' label="Numero Telefónico 📱📞☎️" rules={[{ required: true, message: 'Por favor ingresa tu numero telefónico.' }]}>
        <Input/>
      </Form.Item>
      <Form.Item
            className="white-label md:w-96"
            label="Fecha de nacimiento"
            name="fecha_de_nacimiento"
            rules={[{ required: true, message: 'Por favor selecciona tu fecha de nacimiento.' }]}
          >
            <DatePicker disabled={dataConsul}/>
          </Form.Item>
      <Form.Item name="ciudad" className='white-label' label="¿Desde qué ciudad nos visitas?🚗✈️🚲🛵🚌" rules={[{ required: true, message: 'Por favor selecciona la ciudad de donde nos visitas.' }]} >
        <Select>
          {
            data.locations.map((option, index) => {
              return  <Option key={index} value={option.value}>{option.label}</Option>
            })

          }

        </Select>
      </Form.Item>
      <Form.Item name="barrio" className='white-label' label="¿En que barrio vives?  🏘️🏘️"  rules={[{ required: true, message: 'Por favor ingresa el barrio donde vives.' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="direccion" className='white-label' label="La dirección de tu casa 🏠🏠es: " rules={[{ required: true, message: 'Por favor ingresa la dirección donde vives.' }]}> 
        <Input  />
      </Form.Item>
      <Form.Item name="bautizo" className='white-label' label="¿Eres bautizado(a)?😃" rules={[{ required: true, message: 'Por favor selecciona al menos una respuesta' }]}>
      <Radio.Group className='flex flex-col'>
        <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={1}>Sí</Radio>
        <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={2}>No</Radio>
        <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={3}>Aun no pero quiero bautizarme, quiero agradar al Señor!!!</Radio>
      </Radio.Group>
    </Form.Item>
    <div className='border-dashed border-[#1d1d1d] border p-4 rounded-2xl my-4'>

        <Form.Item className='text-[#1d1d1d]' rules={[{ required: true, message: 'Por favor selecciona al menos una respuesta' }]}>
            <p className=' text-xs md:text-xl'>¿Este domingo puedes traer GRANOS (Cualquiera de estos: Enlatados, Lentejas, Frijoles, Azúcar, Arroz, etc.) como aporte para el Banco de Alimentos?</p>
            <p className=' text-xs md:text-xl'>NIÑOS, JÓVENES, ADULTOS, ANCIANOS, FAMILIAS TE LO AGRADECERÁN Y DIOS TE LO HA DE PAGAR</p>
            <p className=' text-xs md:text-xl'><i>(Por favor revisa la fecha de vencimiento de lo que traes al Banco de Alimentos)</i></p>
          </Form.Item>
          <Form.Item name="aporte" rules={[{ required: true, message: 'Por favor selecciona al menos una respuesta.' }]}>
            <Radio.Group>
              <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2 ' value="si">Sí, este domingo llevaré mi aporte 😃❤️🍞</Radio>
              <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value="no">No puedo llevar este aporte 😔❤️</Radio>
              <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value="necesito ayuda">Estoy pasando una situación económica difícil y necesito ser beneficiado del Banco de Alimentos 🥒🍞🥕🍏</Radio>
            </Radio.Group>
          </Form.Item>
    </div>
          <Form.Item name="peticion"  className='white-label' label="¿Tienes alguna petición de oración? 🙏" > 
            <Input />
          </Form.Item>
          {/* <Form.Item name="nuevo" className='white-label' label="¿Asistes por primera vez a nuestra iglesia?" rules={[{ required: true, message: 'Por favor selecciona al menos una respuesta.' }]}> 
                <Radio.Group onChange={handleRadioChange}>
                  <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={1}>SI</Radio>
                  <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={0}>NO</Radio>
                </Radio.Group>
          </Form.Item> */}
          {dataConsul === '' && (
             <>
             <Form.Item name="nuevo" className='white-label hidden' label="Nombre de la persona que te invitó">
               <Input />
             </Form.Item>
             <Form.Item name="nombreinv" className='white-label' label="Nombre de la persona que te invitó">
               <Input />
             </Form.Item>
           </>
          )}
          <Form.Item >
            <Button type="primary" htmlType="submit">ENVIAR</Button>
          </Form.Item>
   
    </Form>
  );
};
export default Formulario;