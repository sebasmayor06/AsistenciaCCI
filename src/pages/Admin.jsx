import React, { useState } from 'react';
import { DatePicker, Form, Button, ConfigProvider, Select, Input } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import 'moment/locale/es';
import moment from 'moment';
import axios from 'axios';
import data from '../../public/data'
import '../pages/Admin.css'


// Configurar Moment.js en español
moment.locale('es');

export default function Admin() {
  const [form] = Form.useForm();
  const [link, setLink] = useState('')

  const handleSubmit = async () => {
    try {
      const formData = form.getFieldsValue();
      const {fechaEvento} = formData;

      if (fechaEvento) {
        const fechaFormateada = moment(fechaEvento.$d).format('DD/MM/YYYY');
        const formData2 = {
            event_date : fechaFormateada,
            event_name : formData.event_name,
            location : formData.location
        }
        const response = await axios.post('https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com/registerEvent', formData2, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true // Esto asegura que las cookies o credenciales se envíen
      });
      
          setLink(`https://asistencia-cci-front-dc13af93f3e4.herokuapp.com/Asistencia/${response.data.event_id}`)
          
      } else {
        console.log('No se seleccionó una fecha');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <ConfigProvider locale={esES}>
      <div className='bg-[#1d1d1d] w-screen min-h-screen flex justify-start items-center flex-col'>
        <h5 className='mt-10 mb-5'>ADMINISTRADOR</h5>
        <Form
          className='border border-[#f5f5f5] p-6 rounded-2xl border-dashed ' 
          form={form}
          layout="vertical"
          initialValues={{}}
          onFinish={handleSubmit}
        >
          <Form.Item
            className='white-label2'
            label="Fecha del evento"
            name="fechaEvento"
          >
            <DatePicker />
          </Form.Item>
            <Form.Item name="location" className='white-label2' label="Lugar del evento:">
            <Select>
                {
                    data.locations.map((option, index) => {
                    return  <Option key={index} value={option.value}>{option.label}</Option>
                    })

                }
            </Select>
            </Form.Item>
            <Form.Item name="event_name" className='white-label2' label="Nombre del evento 📝:">
                <Input  />
            </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">ENVIAR</Button>
          </Form.Item>
        </Form>
        <Input className='w-80 mt-20' type='text' disabled={link === ''} value={link} readOnly ></Input>
      </div>
    </ConfigProvider>
  );
}
