import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Table, Select } from 'antd';
import BotonExcel from '../BotonExcel/BotonExcel';


export default function TablaCumple() {

  const apiUrl = import.meta.env.VITE_URL;

const bandera = 'cumple'
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [fullData, setFullData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [pageSize, setPageSize] = useState(10); // Tamaño de página inicial

  const handleSearch = (value) => {
    setSearchText(value);
    filterData(value, selectedMonth);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    filterData(searchText, month);
  };

  const filterData = (nameValue, monthValue) => {
    const filteredData = fullData.filter(item => {
      const matchesName = item.full_name.toLowerCase().includes(nameValue.toLowerCase());
      const matchesMonth = monthValue
        ? new Date(item.fecha_de_nacimiento).getMonth() + 1 === monthValue
        : true; // Si no hay mes seleccionado, no filtra por mes
      return matchesName && matchesMonth;
    });
    setTableData(filteredData);
  };

  const columns = [
    { title: '#', key: 'index', render: (text, record, index) => index + 1 },
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
    { title: 'Fecha de Nacimiento', dataIndex: 'fecha_de_nacimiento', key: 'fecha_de_nacimiento', render: date => date ? new Date(date).toLocaleDateString() : 'N/A' },
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
      <h5 className='mt-4 mb-5 font-semibold text-xl md:text-4xl'>CUMPLEAÑOS</h5>
      <div className="flex gap-2 mb-4 ">
        <Select
          placeholder="Selecciona un mes"
          onChange={handleMonthChange}
          style={{ width: 200 }}
          allowClear
        >
          <Select.Option value={1}>Enero</Select.Option>
          <Select.Option value={2}>Febrero</Select.Option>
          <Select.Option value={3}>Marzo</Select.Option>
          <Select.Option value={4}>Abril</Select.Option>
          <Select.Option value={5}>Mayo</Select.Option>
          <Select.Option value={6}>Junio</Select.Option>
          <Select.Option value={7}>Julio</Select.Option>
          <Select.Option value={8}>Agosto</Select.Option>
          <Select.Option value={9}>Septiembre</Select.Option>
          <Select.Option value={10}>Octubre</Select.Option>
          <Select.Option value={11}>Noviembre</Select.Option>
          <Select.Option value={12}>Diciembre</Select.Option>
        </Select>
        <Input
          placeholder="Buscar por nombre"
          value={searchText}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />

      </div>
      <div className=' flex justify-between md:w-[1200px]'>
      <Select
          value={pageSize}
          onChange={(value) => setPageSize(value)}
          options={[
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
          style={{ width: 100 }}
          placeholder="Registros por página"
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
          pageSize: pageSize, // Tamaño de página basado en el `Select`
        }}
      />
    </>
  );
}
