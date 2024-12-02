import React from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';
import { Container } from 'react-bootstrap';
import FormPonal from '../Components/FormPonal';
import TablaPolicia from '../Components/TablaPolicia';

const ApiPonal: React.FC = () => {
  return (
    <VentanaUsuario>
      <TabVentana eventKey='APIPONAL' title='Api Policia'>
        <Container className='mt-4'>
          <FormPonal />
        </Container>
      </TabVentana>
      <TabVentana eventKey='TABLABENEFICIARIOS' title='Beneficiarios'>
        <Container className='mt-4'>
          <TablaPolicia />
        </Container>
      </TabVentana>
    </VentanaUsuario>
  );
}

export default ApiPonal;