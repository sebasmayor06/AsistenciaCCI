import React, { useState } from 'react';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";
import './BotonExcel.css'

export default function BotonExcel({ fullData }) {
    const [loading, setLoading] = useState(false);

    const titulo = [{ A: "Reporte de Asistencias" }, []];

    const longitudes = [5, 35, 25, 20, 25, 25, 25];

    const handleDownload = () => {
        setLoading(true);

        let tabla = [
            {
                A: "ID",
                B: "NOMBRE COMPLETO",
                C: "NUMERO TELEFONICO",
                D: "CIUDAD",
                E: "BARRIO",
                F: "ASISTE PRIMERA VEZ",
                G: "QUIEN TE INVITO",
                H: "ASISTIO"
            }
        ];

        fullData.forEach((data, index) => {
            tabla.push({
                A: index + 1, 
                B: data.full_name,
                C: data.phone_number,
                D: data.ciudad,
                E: data.barrio,
                F: data.nuevo ? "Sí" : "No",
                G: data.nombreinv,
                H:  data.attended ? "Sí" : "No",
            });
        });

        const dataFinal = [...titulo, ...tabla];

        setTimeout(() => {
            creandoArchivo(dataFinal);
            setLoading(false);
        }, 1000);
    };

    const creandoArchivo = (dataFinal) => {
        const libro = XLSX.utils.book_new();

        const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

        hoja["!merges"] = [
            XLSX.utils.decode_range("A1:H1"),
            XLSX.utils.decode_range("A2:H2"),
            XLSX.utils.decode_range("A34:H34"),  // Asegúrate de que estos rangos sean correctos
        ];

        let propiedades = [];

        longitudes.forEach((col) => {
            propiedades.push({ width: col });
        });

        hoja["!cols"] = propiedades;

        XLSX.utils.book_append_sheet(libro, hoja, "Asistencia");

        XLSX.writeFile(libro, "ReporteDeAsistencia.xlsx");
    };

    return (
        <>
            <Button
                type="primary"
                icon={loading ? <PoweroffOutlined spin /> : null}
                onClick={handleDownload}
                disabled={loading}
                className='btn'
            >
                {loading ? 'Cargando...' : 'Exportar a Excel'}
            </Button>
        </>
    );
}
