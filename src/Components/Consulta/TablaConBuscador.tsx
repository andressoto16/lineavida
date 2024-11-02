import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "../../Styles/TablaConBuscador.css"; 

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
    <div className="tabla-con-buscador-container">
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
            <tr>
              <td colSpan={columns.length} className="text-center">
                No se encontraron resultados
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
