import { Select, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect, useState } from 'react'

export default function EventosCreados() {
    const apiUrl = import.meta.env.VITE_URL;
    const bandera= 'usuRegister'
  
    const [tableData, setTableData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 }); // Control de paginación

    const columns = [
      { 
        title: '#', 
        key: 'index', 
        render: (text, record, index) => ((pagination.current - 1) * pagination.pageSize) + index + 1 // Correct pagination index
      },
      { title: 'Nombre evento', dataIndex: 'event_name', key: 'event_name' },
      { title: 'Fecha del Evento', dataIndex: 'event_date', key: 'event_date', render: date => moment.utc(date).format('YYYY-MM-DD') },
    ];

    const eventId = 0
    
    const handleConsultarReg = async () => {
      try {
        const response = await axios.post(`${apiUrl}/consultarEvento`, { eventId }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setTableData(response.data);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
  
    useEffect(() => {
      handleConsultarReg();
    }, []);
    
    return (
      <>
        <h5 className='mt-4 mb-5 font-semibold text-xl md:text-4xl text-white'>EVENTOS CREADOS</h5>
        
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
            style={{ width: 80 }}
          />
        </div>
        
        <Table
          className='mt-4 w-[1200px]'
          columns={columns}
          dataSource={tableData}
          rowKey="event_id" // Asegúrate de tener un identificador único aquí
          scroll={{ x: 1000 }}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            onChange: (page, pageSize) => setPagination({ current: page, pageSize: pageSize })
          }}
        />
      </>
    )
}
