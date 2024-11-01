import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Buscador from "./Busqueda"; 
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
  const [searchTerm, setSearchTerm] = useState("");

  // Filtra los datos en base al término de búsqueda
  const filteredData = data.filter(row =>
    columns.some(column => String(row[column.key]).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="tabla-con-buscador-container">
      {/* Contenedor del buscador */}
      <div className="buscador-container">
        <Buscador onSearch={setSearchTerm} />
     
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{row[column.key]}</td>
                ))}
              </tr>
            ))}
            {filteredData.length === 0 && (
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
