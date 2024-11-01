import React, { useState } from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';
import TablaConBuscador from './Components/Consulta/TablaConBuscador';
const columnas = [
  { key: 'serial', label: 'Serial' },
  { key: 'cedulaAnonima', label: 'Cedula'},
  { key: 'departamento', label: 'Departamento' },
  { key: 'ciudad', label: 'Ciudad'},
  { key: 'nivel_riesgo', label: 'Nivel de Riesgo', hasModal: true },
  { key: 'telefono_contactoAnonimo', label: 'Celular', hasModal: true },
];

const datos = [
  { serial: 1, cedulaAnonima:'231523345', departamento: 'Caqueta',ciudad:'Florencia', nivel_riesgo: '1',  telefono_contactoAnonimo:'xxxxxx2315' },
  { serial: 2, cedulaAnonima:'233456678', departamento: 'Nariño',ciudad:'Tumaco', nivel_riesgo: '2', telefono_contactoAnonimo:'xxxxxx2315' },
];

function App() {
  return (
    <VentanaUsuario>
    

    {/* Tab para revision casos analista */}
    <TabVentana eventKey="Consultas" title="Consultas">
    <TablaConBuscador
      columns={columnas}
      data={datos}
      // renderModalContent={RenderModalContent}
   />
    </TabVentana>

    {/* Tab para consulta linea vida */}
    <TabVentana eventKey="PanelEstadistico" title="Panel Estadistico">
      <p>mostrar info linea de vida</p>
      
      {/* <ContactForm /> */}
    </TabVentana>

   
   
  </VentanaUsuario>
  );
}

export default App;
