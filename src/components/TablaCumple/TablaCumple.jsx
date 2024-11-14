import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Table, Select } from 'antd';
import BotonExcel from '../BotonExcel/BotonExcel';
import moment from 'moment';

export default function TablaCumple() {
  const apiUrl = import.meta.env.VITE_URL;
  const bandera = 'cumple';
  const [tableData, setTableData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [fullData, setFullData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // Incluye estado de paginación

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
    {
      title: '#', 
      key: 'index', 
      render: (text, record, index) => ((pagination.current - 1) * pagination.pageSize) + index + 1 // Correct pagination index
    },
    {
      title: 'Nombre',
      dataIndex: 'full_name',
      key: 'full_name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Edad',
      dataIndex: 'fecha_de_nacimiento',
      key: 'fecha_de_nacimiento',
      render: date => moment().diff(moment(date), 'years')
    },
    {
      title: 'Fecha de Nacimiento',
      dataIndex: 'fecha_de_nacimiento',
      key: 'fecha_de_nacimiento',
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
      <h5 className='mt-4 mb-5 font-semibold text-xl md:text-4xl text-white'>CUMPLEAÑOS</h5>
      <div className="flex gap-2 mb-4">
        <Select
          placeholder="Selecciona un mes"
          onChange={handleMonthChange}
          style={{ width: 200 }}
          allowClear
        >
          {/* Options for months */}
          {Array.from({ length: 12 }, (v, k) => k + 1).map(month => (
            <Select.Option key={month} value={month}>{moment(month, 'M').format('MMMM')}</Select.Option>
          ))}
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
          value={pagination.pageSize}
          onChange={(value) => setPagination({ ...pagination, pageSize: value })}
          options={[10, 25, 50, 100].map(size => ({ value: size, label: `${size}` }))}
          style={{ width: 100 }}
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
          onChange: (page, pageSize) => setPagination({ current: page, pageSize })
        }}
      />
    </>
  );
}
