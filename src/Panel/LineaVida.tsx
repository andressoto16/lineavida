import React from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';

import TablaConBuscador from '../Components/TablaConBuscador';
import Busqueda from '../Components/Busqueda';

interface Dato {
  serial: string;
  cedulaAnonima: string;
  departamento: string;
  ciudad: string;
  nivel_riesgo: string;
  telefonoAnonimo: string;
}

const columnas = [
  { key: 'serial', label: 'Id' },
  { key: 'cedulaAnonima', label: 'Nuip' },
  { key: 'departamento', label: 'Departamento' },
  { key: 'ciudad', label: 'Municipio / Ciudad' },
  { key: 'nivel_riesgo', label: 'Nivel de riesgo'},
  { key: 'telefonoAnonimo', label: 'Teléfono o celular'},
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

const LineaVida: React.FC = () => {

  const [filteredData, setFilteredData] = React.useState<Dato[]>([]);

  const handleSearch = async (type: string, value: string) => {
    // Configuración de los parámetros para la API
    const queryType = type === 'cedula' ? 'cedula' : 'telefono_contacto';
    const result = await obtenerDatos(queryType, value);

    if (result.length > 0) {
      setFilteredData(result); // Actualizamos los datos de la tabla solo si hay resultados
    } else {
      alert("No se encontraron resultados.");
    }
  };

  return (
    <VentanaUsuario>
      <TabVentana eventKey="Consulta" title="Panel de consulta">
        <Busqueda onSearch={handleSearch} />
        <TablaConBuscador columns={columnas} data={filteredData} />
      </TabVentana>

      <TabVentana eventKey='Dashboard' title='Panel estadístico'>
        <div className='d-flex justify-content-center align-items-center' style={{height: '90vh'}}>
          <p style={{margin: '0px', color: 'darkgrey', fontSize: '2rem', fontWeight: '600'}}>Próximamente</p>
        </div>
      </TabVentana>
    </VentanaUsuario>
  );
}

export default LineaVida;