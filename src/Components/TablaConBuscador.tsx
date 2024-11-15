import React, { useState } from "react";

import { Card, CardBody, Col, Row, Table } from "react-bootstrap";
import { FaFileCircleCheck, FaPersonCircleCheck, FaUserCheck, FaUserXmark } from "react-icons/fa6"

interface Column {
  key: string;
  label: string;
}

interface TablaConBuscadorProps {
  columns: Column[];
  data: any[];
}

const TablaConBuscador: React.FC<TablaConBuscadorProps> = ({ columns, data }) => {
  // console.log("Datos recibidos en TablaConBuscador:", data);

  // Filtra los datos en base al término de búsqueda

  return (
    <Row className="align-items-center mt-3 mb-3 px-2">
      <Col xs={12} lg={12} className='d-flex mb-2'>
        {data.length === 0 ?
          <FaUserXmark style={{ fontSize: '1.4rem', marginTop: '2px', marginRight: '1rem', color: '#5A5A58' }} />
          :
          <FaUserCheck style={{ fontSize: '1.4rem', marginTop: '2px', marginRight: '1rem', color: '#5A5A58' }} />
        }
        <h4 style={{ fontWeight: '600', color: '#5A5A58' }}>Resultado</h4>
      </Col>

      {/* Contenedor del buscador */}
      <Table striped hover responsive className="rounded-5">
        <thead className="rounded-5">
          <tr className="rounded-5">
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{colIndex === 0 ? <b>{row[column.key].toUpperCase()}</b> : row[column.key]}</td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr style={{ height: '50px' }}>
              <td colSpan={columns.length} className="text-center">
                Por favor defina e ingrese un criterio de búsqueda
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Row>
  );
};

export default TablaConBuscador;
