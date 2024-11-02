import React, { useState, useEffect } from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';
import TablaConBuscador from './Components/Consulta/TablaConBuscador';
import Busqueda from './Components/Consulta/Busqueda';


interface Dato {
  serial: string;
  cedulaAnonima: string;
  departamento: string;
  ciudad: string;
  nivel_riesgo: string;
  telefonoAnonimo: string;
}

const columnas = [
  { key: 'serial', label: 'Serial' },
  { key: 'cedulaAnonima', label: 'Cédula' },
  { key: 'departamento', label: 'Departamento' },
  { key: 'ciudad', label: 'Ciudad' },
  { key: 'nivel_riesgo', label: 'Nivel de Riesgo', hasModal: true },
  { key: 'telefonoAnonimo', label: 'Celular', hasModal: true },
];

const obtenerDatos = async (queryType = '', queryValue = '') => {
  try {
    // Construye la URL de la API con los parámetros de búsqueda
    const url = queryValue
    ? `https://formulariopruebas.unp.gov.co/api-django/lineavida/?${queryType}=${queryValue}`
    : 'https://formulariopruebas.unp.gov.co/api-django/lineavida/';
  

    console.log("URL de búsqueda:", url); // Verifica la URL de búsqueda en la consola

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const datos = await response.json();
    console.log("Datos obtenidos:", datos); // Depuración de los datos obtenidos de la API
    return datos;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
};

function App() {
  const [filteredData, setFilteredData] = useState<Dato[]>([]);
  
  const handleSearch = async (type: string, value: string) => {
    // Configuración de los parámetros para la API
    const queryType = type === 'cedula' ? 'cedula' : 'celular';
    const result = await obtenerDatos(queryType, value);

    if (result.length > 0) {
      setFilteredData(result); // Actualizamos los datos de la tabla solo si hay resultados
    } else {
      alert("No se encontraron resultados.");
    }
  };  

  return (
    <VentanaUsuario>
      <TabVentana eventKey="Consultas" title="Consultas">
      <Busqueda onSearch={handleSearch} />
        <TablaConBuscador columns={columnas} data={filteredData} />
      </TabVentana>
    </VentanaUsuario>
  );
}

export default App;
