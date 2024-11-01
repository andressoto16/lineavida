import React, { useState, useEffect } from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';
import TablaConBuscador from './Components/Consulta/TablaConBuscador';

const columnas = [
  { key: 'serial', label: 'Serial' },
  { key: 'cedulaAnonima', label: 'Cedula'},
  { key: 'departamento', label: 'Departamento' },
  { key: 'ciudad', label: 'Ciudad'},
  { key: 'nivel_riesgo', label: 'Nivel de Riesgo', hasModal: true },
  { key: 'telefonoAnonimo', label: 'Celular', hasModal: true },
];

const obtenerDatos = async () => {
  try {
    const response = await fetch('https://formulariopruebas.unp.gov.co/api-django/lineavida/');
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const datos = await response.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return []; // Devuelve una lista vacía en caso de error
  }
};

function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await obtenerDatos();
      setDatos(result);
    };
    fetchData();
  }, []);

  return (
    <VentanaUsuario>
      {/* Tab para revisión de casos analista */}
      <TabVentana eventKey="Consultas" title="Consultas">
        <TablaConBuscador
          columns={columnas}
          data={datos}
        />
      </TabVentana>
    </VentanaUsuario>
  );
}

export default App;
