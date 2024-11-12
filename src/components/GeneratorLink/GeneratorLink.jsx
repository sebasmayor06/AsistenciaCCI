import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import axios from 'axios';
import esES from 'antd/lib/locale/es_ES';
import { DatePicker, Form, Button, ConfigProvider, Select, Input } from 'antd';
import data from '../../../public/data'
import './GeneratorLink.css'


moment.locale('es');


export default function GeneratorLink() {


//  const api = 'http://localhost:3000'
 const api = 'https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com/'


let urlCompleta = window.location.href;

let objetoUrl = new URL(urlCompleta);

let baseUrl = objetoUrl.origin; 


  const [form] = Form.useForm();
  const [link, setLink] = useState('')

  const {Option} = Select

  const handleSubmit = async () => {
    try {
      const formData = form.getFieldsValue();
      const {fechaEvento} = formData;

      if (fechaEvento) {
        const fechaFormateada = moment(fechaEvento.$d).format('YYYY-MM-DD');
        const formData2 = {
            event_date : fechaFormateada,
            event_name : formData.event_name,
            location : formData.location
        }
        const response = await axios.post(`${api}/registerEvent`, formData2, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          setLink(`${baseUrl}/Asistencia/${response.data.event_id}`)
          
      } else {
        console.log('No se seleccionó una fecha');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <ConfigProvider locale={esES}>
        <h5 className='mt-4 mb-5 font-semibold text-xl md:text-4xl'>CREADOR DE EVENTOS</h5>
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
        <div className='flex flex-row mt-20 gap-2 '>
        <h5>LINK :</h5>
        <Input className='w-80 md:mr-14' type='text' disabled={link === ''} value={link} readOnly ></Input>
        </div>
    </ConfigProvider>
  )
}
