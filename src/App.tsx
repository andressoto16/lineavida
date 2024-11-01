import React, { useState } from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';

function App() {
  return (
    <VentanaUsuario>
    

    {/* Tab para revision casos analista */}
    <TabVentana eventKey="Administracion" title="Administracion">
    {/* <ContactForm />   */}
    <h3>ventana para admin</h3>
    </TabVentana>

    {/* Tab para consulta linea vida */}
    <TabVentana eventKey="LineaVida" title="Linea de Vida">
      <p>mostrar info linea de vida</p>
      
      {/* <ContactForm /> */}
    </TabVentana>

   
   
  </VentanaUsuario>
  );
}

export default App;
