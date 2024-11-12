import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Table, Select } from 'antd';
import BotonExcel from '../BotonExcel/BotonExcel';


export default function UsuariosRegistrados() {
  //  const api = 'http://localhost:3000'
 const api = 'https://asistencia-cci-backend-bd9b1252bc67.herokuapp.com/'
  const bandera= 'usuRegister'

  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [fullData, setFullData] = useState([]);
  const [pageSize, setPageSize] = useState(10); // Tamaño de página inicial

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
    { title: '#', key: 'index', render: (text, record, index) => index + 1 },
    { title: 'DNI', dataIndex: 'dni', key: 'dni' },
    {
      title: 'Nombre',
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
      ),
    },
    { title: 'Estado Civil', dataIndex: 'estado_civil', key: 'estado_civil' },
    { title: 'Número Telefónico', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Ciudad', dataIndex: 'ciudad', key: 'ciudad' },
    { title: 'Barrio', dataIndex: 'barrio', key: 'barrio' },
    { title: 'Dirección', dataIndex: 'direccion', key: 'direccion' },
    {
      title: 'Bautizo',
      dataIndex: 'bautizo',
      key: 'bautizo',
      render: text => {
        if (text === 1) return 'Sí';
        if (text === 2) return 'No';
        if (text === 3) return 'Aún no';
        return 'N/A';
      },
    },
    { title: 'Fecha de Nacimiento', dataIndex: 'fecha_de_nacimiento', key: 'fecha_de_nacimiento', render: date => date ? new Date(date).toLocaleDateString() : 'N/A' },
  ];
  
  const handleConsultarReg = async () => {
    try {
      const response = await axios.get(`${api}/consultarRegistrados`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTableData(response.data);
      setFullData(response.data); 
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  useEffect(() => {
    handleConsultarReg();
  }, []);

  return (
    <>
      <h5 className='mt-4 mb-5 font-semibold text-xl md:text-4xl'>USUARIOS REGISTRADOS</h5>
      
      <div className="mb-4 flex justify-between md:w-[1200px]">
        <Select
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          options={[
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
          style={{ width: 80 }}
        />
        <BotonExcel fullData = {fullData}  bandera ={bandera}/>
      </div>
      
      <Table
        className='mt-4 w-[1200px]'
        columns={columns}
        dataSource={tableData}
        rowKey="dni"
        scroll={{ x: 1000 }}
        pagination={{
          pageSize: pageSize, // Tamaño de página actual basado en el `Select`
        }}
      />
    </>
  );
}
