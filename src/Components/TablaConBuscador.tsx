import React, { useState } from "react";
import { Table } from "react-bootstrap";

interface Column {
  key: string;
  label: string;
}

interface TablaConBuscadorProps {
  columns: Column[];
  data: any[];
}

const TablaConBuscador: React.FC<TablaConBuscadorProps> = ({ columns, data }) => {
    console.log("Datos recibidos en TablaConBuscador:", data); 

  // Filtra los datos en base al término de búsqueda

  return (
    <div className="mx-3 my-4">
      {/* Contenedor del buscador */}
      <div className="buscador-container">
             
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr style={{height: '50px'}}>
              <td colSpan={columns.length} className="text-center">
                Por favor defina e ingrese un criterio de búsqueda
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default TablaConBuscador;
