import React, { useState } from 'react';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";
import moment from 'moment';
import './BotonExcel.css';

export default function BotonExcel({ fullData, bandera }) {
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        setLoading(true);

        let tabla = [];
        let titulo = [{ A: "" }, []];
        let sheetName = "";
        let fileName = "";
        let columnWidths = [];

        if (bandera === 'confAsist') {
            titulo = [{ A: "Reporte de Asistencias" }, []];
            sheetName = "Asistencia";
            fileName = "ReporteDeAsistencia.xlsx";
            columnWidths = [5, 35, 25, 20, 25, 25, 25, 25];
            tabla = [
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
                    H: data.attended ? "Sí" : "No",
                });
            });
        } else if (bandera === 'usuRegister') {
            titulo = [{ A: "Reporte de Miembros Registrados" }, []];
            sheetName = "Miembros";
            fileName = "ReporteDeMiembros.xlsx";
            columnWidths = [5, 15, 35, 15, 20, 20, 25, 25, 10, 20];
            tabla = [
                {
                    A: "ID",
                    B: "DNI",
                    C: "NOMBRE COMPLETO",
                    D: "ESTADO CIVIL",
                    E: "NUMERO TELEFONICO",
                    F: "CIUDAD",
                    G: "BARRIO",
                    H: "DIRECCION",
                    I: "BAUTIZADO",
                    J: "FECHA NACIMIENTO"
                }
            ];
            fullData.forEach((data, index) => {
                tabla.push({
                    A: index + 1, 
                    B: data.dni,
                    C: data.full_name,
                    D: data.estado_civil,
                    E: data.phone_number,
                    F: data.ciudad,
                    G: data.barrio,
                    H: data.direccion,
                    I: data.bautizado ? "Sí" : "No",
                    J: moment(data.fecha_de_nacimiento).format('YYYY-MM-DD')
                });
            });
        } else if (bandera === 'cumple') {
            titulo = [{ A: "Reporte de Cumpleaños" }, []];
            sheetName = "Cumpleaños";
            fileName = "ReporteDeCumpleAños.xlsx";
            columnWidths = [5, 35, 20];
            tabla = [
                {
                    A: "ID",
                    B: "NOMBRE COMPLETO",
                    C: "FECHA NACIMIENTO"
                }
            ];
            fullData.forEach((data, index) => {
                tabla.push({
                    A: index + 1, 
                    B: data.full_name,
                    C: moment(data.fecha_de_nacimiento).format('YYYY-MM-DD')
                });
            });
        }

        setTimeout(() => {
            creandoArchivo(titulo, tabla, sheetName, fileName, columnWidths);
            setLoading(false);
        }, 1000);
    };

    const creandoArchivo = (titulo, tabla, sheetName, fileName, columnWidths) => {
        const libro = XLSX.utils.book_new();
        const dataFinal = [...titulo, ...tabla];
        const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

        hoja["!cols"] = columnWidths.map(w => ({ width: w }));
        XLSX.utils.book_append_sheet(libro, hoja, sheetName);
        XLSX.writeFile(libro, fileName);
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
