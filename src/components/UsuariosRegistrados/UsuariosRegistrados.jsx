import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Table, Select } from 'antd';
import BotonExcel from '../BotonExcel/BotonExcel';

export default function UsuariosRegistrados() {
  const apiUrl = import.meta.env.VITE_URL;
  const bandera = 'usuRegister';

  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [fullData, setFullData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // Incluye estado de paginación

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
      render: (text, record, index) => ((pagination.current - 1) * pagination.pageSize) + index + 1 // Correct pagination index
    },
    { title: 'DNI', dataIndex: 'dni', key: 'dni' },
    {
      title: 'Nombre',
      dataIndex: 'full_name',
      key: 'full_name',
      render: text => <a>{text}</a>
    },
    { title: 'Estado Civil', dataIndex: 'estado_civil', key: 'estado_civil', 
      render: (text) => {
        switch (text) {
          case 'nino': return 'Niño';
          case 'soltero': return 'Soltero(a)';
          case 'casado': return 'Casado(a)';
          case 'separado': return 'Separado(a)';
          case 'viudo': return 'Viudo(a)';
          case 'divorciado': return 'Divorciado(a)';
          case 'joven': return 'Joven';
          case 'unionLibre': return 'Unión Libre';
          default: return text;
        }
      }
    },
    { title: 'Número Telefónico', dataIndex: 'phone_number', key: 'phone_number' },
    { title: 'Ciudad', dataIndex: 'ciudad', key: 'ciudad' },
    { title: 'Barrio', dataIndex: 'barrio', key: 'barrio' },
    { title: 'Dirección', dataIndex: 'direccion', key: 'direccion' },
    { title: 'Bautizo', dataIndex: 'bautizo', key: 'bautizo',
      render: text => {
        switch (text) {
          case 1: return 'Sí';
          case 2: return 'No';
          case 3: return 'Aún no';
          default: return 'N/A';
        }
      }
    },
    { title: 'Fecha de Nacimiento', dataIndex: 'fecha_de_nacimiento', key: 'fecha_de_nacimiento', 
      render: date => date ? String(date).split('T')[0] : 'N/A'
    },
  ];

  const handleConsultarReg = async () => {
    try {
      const response = await axios.get(`${apiUrl}/consultarRegistrados`, {
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
      <h5 className='mt-4 mb-5 font-semibold text-xl md:text-4xl text-white'>MIEMBROS REGISTRADOS</h5>
      
      <div className="mb-4 flex justify-between md:w-[1200px]">
        <Select
          value={pagination.pageSize}
          onChange={(value) => setPagination({ ...pagination, pageSize: value })}
          options={[
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
          style={{ width :80 }}
        />

        <Input
          placeholder="Buscar por nombre"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          className="mb-4 mt-4 w-80"
        />
        <BotonExcel fullData={fullData} bandera={bandera}/>
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
          onChange: (page, pageSize) => setPagination({ current: page, pageSize: pageSize })
        }}
      />
    </>
  );
}
