import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Form, Button, DatePicker, ConfigProvider, Input, Select } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import 'moment/locale/es';
import moment from 'moment';
import axios from 'axios';
import BotonExcel from '../components/BotonExcel/BotonExcel';
import Navbar from '../components/Navbar/Navbar';

moment.locale('es');

const ConfirmarAsist = ({bandera1}) => {
  const apiUrl = import.meta.env.VITE_URL;
  const bandera = 'confAsist';

  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [acomuladorFir, setAcomuladorFir] = useState(0)
  const [acomuladorAsist, setAcomuladorAsist] = useState(0)
  const [dniArray, setDniArray] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(0);

  const handleAsistio = async (dni, newStatus, event_id) => {
    try {
      const newData = fullData.map(item => item.dni === dni ? { ...item, attended: newStatus } : item);
      setFullData(newData);
      if (!searchText) {
        setTableData(newData);
      } else {
        filterData(searchText);
      }
      await axios.post(`${apiUrl}/updateAsistencia`, { dni, attended: newStatus, event_id }, {
        headers: { 'Content-Type': 'application/json' },
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
      render: (text, record, index) => (pagination.current - 1) * pagination.pageSize + index + 1
    },
    { title: 'DNI', dataIndex: 'dni', key: 'dni' },
    { title: 'Nombre', dataIndex: 'full_name', key: 'full_name' },
    { title: 'Numero Teléfonico', dataIndex: 'phone_number', key: 'phone_number' },
    {
      title: 'Rango Edad',
      dataIndex: 'fecha_de_nacimiento',
      key: 'fecha_de_nacimiento',
      render: date => {
        const age = moment().diff(moment(date), 'years');
        if (age >= 18) return 'Adulto';
        if (age >= 12) return 'Joven';
        return 'Iglekids';
      },
      filters: [
        { text: 'Adulto', value: 'Adulto' },
        { text: 'Joven', value: 'Joven' },
        { text: 'Iglekids', value: 'Iglekids' }
      ],
      onFilter: (value, record) => {
        const age = moment().diff(moment(record.fecha_de_nacimiento), 'years');
        return (
          (age >= 18 && value === 'Adulto') ||
          (age >= 12 && age < 18 && value === 'Joven') ||
          (age < 12 && value === 'Iglekids')
        );
      }
    },
    { title: 'Ciudad', dataIndex: 'ciudad', key: 'ciudad' },
    { title: 'Barrio', dataIndex: 'barrio', key: 'barrio' },
    {
      title: 'Asiste por 1ra vez',
      dataIndex: 'nuevo',
      key: 'nuevo',
      render: nuevo => nuevo ? 'Sí' : 'No'
    },
    { title: 'Quien te invito', dataIndex: 'nombreinv', key: 'nombreinv' },
    { title: 'Fecha de Registro', dataIndex: 'registration_time', key: 'registration_time', render: date => moment.utc(date).format('YYYY-MM-DD') },
    { title: 'Hora de Registro', dataIndex: 'registration_time', key: 'registration_time', render: date => moment.utc(date).format('HH:mm') },
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
    {
      title: "Ponderado Asistencia",
      dataIndex: "attended",
      key: "attended",
      render: (attended, record) => {
        // Acumular DNIs sin repetir
        setDniArray((prev) => {
          if (!prev.includes(record.dni)) {
            return [...prev, record.dni];
          }
          return prev;
        });
    
        // Filtrar los registros de este DNI y obtener los últimos 5
        console.log({resultados});
        
        const filteredResults = resultados
          .filter((item) => item.dni === record.dni)
          .slice(-5); // Últimos 5 elementos
          console.log({filteredResults});
          
    
        return (
          <div className="flex justify-center items-center gap-2 w-full">
            {filteredResults.map((item, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  item.promedio ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            ))}
          </div>
        );
      },
    }
    
    
  ];
  useEffect(() => {
    if (dniArray.length > 0) {
      axios
        .post(`${apiUrl}/consultarAttend`, { dniList: dniArray }, {
          headers: { 'Content-Type': 'application/json' },
        }) // Mandamos todos los DNIs juntos
        .then((res) => {
          setResultados(res.data); // Guardamos los resultados en un objeto
        })
        .catch((err) => console.error("Error en la consulta:", err));
    }
  }, [dniArray, triggerFetch]);

  
  const reconsultar = () => {
    setTriggerFetch((prev) => prev + 1); // Incrementa el trigger para forzar la consulta
  };
  const handleSubmit = async () => {
    try {
      const formData = form.getFieldsValue();
      const { fechaEvento } = formData;
      reconsultar()
      if (fechaEvento) {
        const fechaFormateada = moment(fechaEvento.$d).format('YYYY/MM/DD');
        const requestData = { fecha: fechaFormateada };
        const response = await axios.post(`${apiUrl}/consultarAsistencia`, requestData, {
          headers: { 'Content-Type': 'application/json' },
        });
        setTableData(response.data);
        setFullData(response.data);
        setAcomuladorFir(response.data.length)
        // setAcomuladorAsist(response.data.)
        const filter = response.data.filter(asistio => asistio.attended)
        setAcomuladorAsist(filter.length)

      } else {
        console.log('No se seleccionó una fecha');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // const bandera2 = 'user';

  return (
    <ConfigProvider locale={esES}>
      <div className="bg-[#1d1d1d] w-screen min-h-screen flex justify-start items-center flex-col">
        {/* {bandera1 === 'admin' ? '' : <Navbar bandera2 = {bandera2}/>} */}
        <div className='contenedor flex sm:flex-row flex-col justify-center items-center'>
          <div className='w-40'>

          </div>
          <div className='contenedorForm flex flex-col justify-center items-center'>
            <h5 className='mt-4 font-semibold text-xl md:text-4xl text-white'>CONFIRMACIÓN DE ASISTENCIA</h5>
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

            <Input
              placeholder="Buscar por nombre"
              value={searchText}
              onChange={e => handleSearch(e.target.value)}
              className="mb-4 mt-4 w-80"
            />

          </div>
          <div className=' w-40 flex flex-col justify-center items-center'>
            <div className="flex sm:flex-col flex-row items-center gap-20 md:gap-0">
              <div className="md:mb-4 flex flex-col items-center">
                <label htmlFor="acomuladorFir" className="block text-white mb-2">REGISTROS</label>
                <Input id="acomuladorFir" className="w-20" value={acomuladorFir} />
              </div>

              <div className="md:mt-4 flex flex-col items-center">
                <label htmlFor="acomuladorAsist" className="block text-white mb-2">ASISTENCIA</label>
                <Input id="acomuladorAsist" className="w-20" value={acomuladorAsist} />
              </div>
            </div>
          </div>
        </div>

          <div className="flex flex-row justify-between md:w-[1200px] gap-4 mt-8">
            <Select
              value={pagination.pageSize}
              onChange={(value) => setPagination({ ...pagination, pageSize: value })}
              options={[
                { value: 10, label: '10' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
                { value: 200, label: '200' },
              ]}
              style={{ width: 80 }}
            />
            <BotonExcel fullData={fullData} bandera={bandera} />
          </div>

          <Table
            className='mt-4 w-[1200px]'
            columns={columns}
            dataSource={tableData}
            rowKey="dni"
            scroll={{ x: 1000 }}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              onChange: (page, pageSize) => setPagination({ current: page, pageSize: pageSize }),
            }}
          />

      </div>
    </ConfigProvider>
  );
};

export default ConfirmarAsist;
