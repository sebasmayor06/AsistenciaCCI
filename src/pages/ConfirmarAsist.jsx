import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Form, Button, DatePicker, ConfigProvider, Input } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import 'moment/locale/es';
import moment from 'moment';
import axios from 'axios';

moment.locale('es');

const ConfirmarAsist = () => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchText, setSearchText] = useState('');

//   useEffect(() => {
//     cargarDatosIniciales();
//   }, []);

//   const cargarDatosIniciales = async () => {
//     try {
//       const response = await axios.get('https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com/consultarAsistenciaInicial');
//       setTableData(response.data);
//       setFullData(response.data);
//     } catch (error) {
//       console.error('Error al cargar los datos iniciales:', error);
//     }
//   };

  const handleAsistio = async (dni, newStatus, event_id) => {
    try {
      const newData = fullData.map(item => item.dni === dni ? { ...item, attended: newStatus } : item);
      setFullData(newData);
      if (!searchText) {
        setTableData(newData);
      } else {
        filterData(searchText);
      }
      await axios.post('https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com/updateAsistencia', { dni, attended: newStatus, event_id }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error al actualizar la asistencia:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value);
  };

  const filterData = (value) => {
    const filteredData = fullData.filter(item =>
      item.full_name.toLowerCase().includes(value.toLowerCase())
    );
    setTableData(filteredData);
  };
  

  const columns = [
    {
        title: '#',
        key: 'index',
        render: (text, record, index) => index + 1, // +1 para empezar la numeración en 1 en lugar de 0
      },
    { title: 'Nombre',
        dataIndex: 'full_name',
        key: 'full_name',
        render: text => <a>{text}</a>,
        filterDropdown: () => (
          <Input
            placeholder="Buscar por nombre"
            value={searchText}
            onChange={e => handleSearch(e.target.value)}
            onPressEnter={() => handleSearch(searchText)}
          />
        ),},
    { title: 'Numero Teléfonico', dataIndex: 'phone_number', key: 'phone_number' },
    {
        title: 'Rango Edad',
        dataIndex: 'fecha_de_nacimiento',
        key: 'fecha_de_nacimiento',
        render: date => {
          const age = moment().diff(moment(date), 'years');
          if (age >= 18) {
            return 'Adulto';
          } else if (age >= 12) {
            return 'Joven';
          } else {
            return 'Iglekids';
          }
        },
        filters: [
          { text: 'Adulto', value: 'Adulto' },
          { text: 'Joven', value: 'Joven' },
          { text: 'Iglekids', value: 'Iglekids' }
        ],
        onFilter: (value, record) => {
          const age = moment().diff(moment(record.fecha_de_nacimiento), 'years');
          if (age >= 18) {
            return value === 'Adulto';
          } else if (age >= 12) {
            return value === 'Joven';
          } else {
            return value === 'Iglekids';
          }
        }
      },
      
    { title: 'Ciudad', dataIndex: 'ciudad', key: 'ciudad' },
    { title: 'Barrio', dataIndex: 'barrio', key: 'barrio' },
    { title: 'Fecha del Evento', dataIndex: 'event_date', key: 'event_date', render: date => moment(date).format('YYYY-MM-DD') },
    {
        title: 'Asiste por 1ra vez',
        dataIndex: 'nuevo',
        key: 'nuevo',
        render: nuevo => nuevo ? 'Sí' : 'No'
      },
    { title: 'Quien te invito', dataIndex: 'nombreinv', key: 'nombreinv' },

    {
      title: 'Asistió',
      dataIndex: 'attended',
      key: 'attended',
      render: (attended, record) => (
        <Checkbox
          checked={attended}
          onChange={() => handleAsistio(record.dni, !attended, record.event_id)}
        />
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      const formData = form.getFieldsValue();
      const { fechaEvento } = formData;
      if (fechaEvento) {
        const fechaFormateada = moment(fechaEvento.$d).format('YYYY/MM/DD');
        const requestData = { fecha: fechaFormateada };
        const response = await axios.post('https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com/consultarAsistencia', requestData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTableData(response.data);
        setFullData(response.data);
      } else {
        console.log('No se seleccionó una fecha');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <ConfigProvider locale={esES}>
      <div className="bg-[#1d1d1d] w-screen min-h-screen flex justify-start items-center flex-col">
        <Form
          className="border border-[#f5f5f5] p-6 rounded-2xl border-dashed flex justify-center items-center flex-col mt-10"
          form={form}
          layout="vertical"
          initialValues={{}}
          onFinish={handleSubmit}
        >
          <Form.Item
            className="white-label2 md:w-96 flex flex-col justify-center items-center"
            label="Fecha del evento"
            name="fechaEvento"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">ENVIAR</Button>
          </Form.Item>
        </Form>
        <Table className='mt-4 w-[1200px]' columns={columns} dataSource={tableData} rowKey="dni" scroll={{ x: 1000 }} />
      </div>
    </ConfigProvider>
  );
};

export default ConfirmarAsist;
