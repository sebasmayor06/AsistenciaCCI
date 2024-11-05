import React, { useState } from 'react';
import { Button, Form, Input, Radio, Select, Tag, DatePicker } from 'antd';
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
  
  const [form] = Form.useForm();
  // const [requiredMark, setRequiredMarkType] = useState('optional');
  // const onRequiredTypeChange = ({ requiredMarkValue }) => {
  //   setRequiredMarkType(requiredMarkValue);
  // };
  const [asistePorPrimeraVez, setAsistePorPrimeraVez] = useState(null);
  const [dataConsul, setDataConsul] = useState('')

  const handleRadioChange = (e) => {
    setAsistePorPrimeraVez(e.target.value);
  };

  const { Option } = Select;

  const handleConsulta = async (dni) => {
    
    try {
      const response = await axios.post('http://localhost:3000/consultarAsistente', { dni }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const dataWithMoment = {
        ...response.data,
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
        
        const response1 = await axios.post('http://localhost:3000/registerAsistente', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }

      const response2 = await axios.post('http://localhost:3000/resgisterAsistencia', formData2, {
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
      
      <Form.Item name="dni" className='white-label' label="Numero Cedula:"  >
      <Input onBlur={handleBlur} disabled={dataConsul}/>
      </Form.Item>
      <Form.Item name="full_name" className='white-label' label="Nombre y apellido 📝:">
        <Input  disabled={dataConsul}/>
      </Form.Item>
      <Form.Item name="estado_civil" className='white-label' label="Estado civil:">
          <Select>
          {
            data.options.map((option, index) => {
              return  <Option key={index} value={option.value}>{option.label}</Option>
            })

          }
          </Select>
        </Form.Item>
      <Form.Item name="phone_number"  className='white-label' label="Numero Telefónico 📱📞☎️">
        <Input/>
      </Form.Item>
      <Form.Item
            className="white-label md:w-96"
            label="Fecha de nacimiento"
            name="fecha_de_nacimiento"
          >
            <DatePicker disabled={dataConsul}/>
          </Form.Item>
      <Form.Item name="ciudad" className='white-label' label="¿Desde qué ciudad nos visitas?🚗✈️🚲🛵🚌" >
        <Select>
          {
            data.locations.map((option, index) => {
              return  <Option key={index} value={option.value}>{option.label}</Option>
            })

          }

        </Select>
      </Form.Item>
      <Form.Item name="barrio" className='white-label' label="¿En que barrio vives?  🏘️🏘️" >
        <Input />
      </Form.Item>
      <Form.Item name="direccion" className='white-label' label="La dirección de tu casa 🏠🏠es: "> 
        <Input  />
      </Form.Item>
      <Form.Item name="bautizo" className='white-label' label="¿Eres bautizado(a)?😃">
      <Radio.Group className='flex flex-col'>
        <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={1}>Sí</Radio>
        <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={2}>No</Radio>
        <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={3}>Aun no pero quiero bautizarme, quiero agradar al Señor!!!</Radio>
      </Radio.Group>
    </Form.Item>
    <div className='border-dashed border-[#1d1d1d] border p-4 rounded-2xl my-4'>

        <Form.Item className='text-[#1d1d1d]'>
            <p className=' text-xs md:text-xl'>¿Este domingo puedes traer GRANOS (Cualquiera de estos: Enlatados, Lentejas, Frijoles, Azúcar, Arroz, etc.) como aporte para el Banco de Alimentos?</p>
            <p className=' text-xs md:text-xl'>NIÑOS, JÓVENES, ADULTOS, ANCIANOS, FAMILIAS TE LO AGRADECERÁN Y DIOS TE LO HA DE PAGAR</p>
            <p className=' text-xs md:text-xl'><i>(Por favor revisa la fecha de vencimiento de lo que traes al Banco de Alimentos)</i></p>
          </Form.Item>
          <Form.Item name="aporte" >
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
          <Form.Item name="nuevo" className='white-label' label="¿Asistes por primera vez a nuestra iglesia?" > 
                <Radio.Group onChange={handleRadioChange}>
                  <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={1}>SI</Radio>
                  <Radio className='text-[#1d1d1d] text-xs md:text-xl mb-2' value={0}>NO</Radio>
                </Radio.Group>
          </Form.Item>
          {asistePorPrimeraVez === 1 && (
            <Form.Item name="nombreinv" className='white-label' label="Nombre de la persona que te invitó">
              <Input />
            </Form.Item>
          )}
          <Form.Item >
            <Button type="primary" htmlType="submit">ENVIAR</Button>
          </Form.Item>
   
    </Form>
  );
};
export default Formulario;