import React, { useState } from 'react';
import { Button, Form, Input, Radio, Select, Tag } from 'antd';
import './Formulario.css'
import data from '../../../public/data'
import axios from 'axios';

const customizeRequiredMark = (label, { required }) => (
  <>
    {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
    {label}
  </>
);
const App = () => {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const [asistePorPrimeraVez, setAsistePorPrimeraVez] = useState(null);

  const handleRadioChange = (e) => {
    setAsistePorPrimeraVez(e.target.value);
  };

  const { Option } = Select;

  const handleSubmit = async () => {
    const formData = form.getFieldsValue();
    
    try {
      const response = await axios.post('http://localhost:3000/registerAsistente', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error('Error en la solicitud:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
    
  };

  const handleConsulta = async (dni) => {
    
    try {
      const response = await axios.post('http://localhost:3000/consultarAsistente', { dni }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const {} = response.data
      form.setFieldsValue(response.data)
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
      initialValues={{
        requiredMarkValue: requiredMark,
      }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
      onFinish={handleSubmit}
    >
      
      <Form.Item name="dni" className='white-label' label="Numero Cedula:"  >
      <Input onBlur={handleBlur}/>
      </Form.Item>
      <Form.Item name="full_name" className='white-label' label="Nombre y apellido 📝:">
        <Input  />
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
      <Form.Item name="edad" className='white-label' label="Edad  🎂:">
        <Select>
           {Array.from({ length: 80 }, (_, i) => (
             <Option key={i + 1} value={i + 1}>
               {i + 1}
             </Option>
           ))}
             <Option key={100} value={100} >Mas de 80</Option>
        </Select>
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
        <Radio className='text-white text-xs md:text-xl mb-2' value={1}>Sí</Radio>
        <Radio className='text-white text-xs md:text-xl mb-2' value={2}>No</Radio>
        <Radio className='text-white text-xs md:text-xl mb-2' value={3}>Aun no pero quiero bautizarme, quiero agradar al Señor!!!</Radio>
      </Radio.Group>
    </Form.Item>
    <div className='border-dashed border p-4 rounded-2xl my-4'>

        <Form.Item className='text-white'>
            <p className=' text-xs md:text-xl'>¿Este domingo puedes traer GRANOS (Cualquiera de estos: Enlatados, Lentejas, Frijoles, Azúcar, Arroz, etc.) como aporte para el Banco de Alimentos?</p>
            <p className=' text-xs md:text-xl'>NIÑOS, JÓVENES, ADULTOS, ANCIANOS, FAMILIAS TE LO AGRADECERÁN Y DIOS TE LO HA DE PAGAR</p>
            <p className=' text-xs md:text-xl'><i>(Por favor revisa la fecha de vencimiento de lo que traes al Banco de Alimentos)</i></p>
          </Form.Item>
          <Form.Item name="aporte" >
            <Radio.Group>
              <Radio className='text-white text-xs md:text-xl mb-2 ' value="si">Sí, este domingo llevaré mi aporte 😃❤️🍞</Radio>
              <Radio className='text-white text-xs md:text-xl mb-2' value="no">No puedo llevar este aporte 😔❤️</Radio>
              <Radio className='text-white text-xs md:text-xl mb-2' value="necesito ayuda">Estoy pasando una situación económica difícil y necesito ser beneficiado del Banco de Alimentos 🥒🍞🥕🍏</Radio>
            </Radio.Group>
          </Form.Item>
    </div>
          <Form.Item name="peticion"  className='white-label' label="¿Tienes alguna petición de oración? 🙏" > 
            <Input />
          </Form.Item>
          <Form.Item name="nuevo" className='white-label' label="¿Asistes por primera vez a nuestra iglesia?" > 
                <Radio.Group onChange={handleRadioChange}>
                  <Radio className='text-white text-xs md:text-xl mb-2' value={1}>SI</Radio>
                  <Radio className='text-white text-xs md:text-xl mb-2' value={0}>NO</Radio>
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
export default App;