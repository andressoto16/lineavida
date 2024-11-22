import React from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';
import { Container } from 'react-bootstrap';
import FormPonal from '../Components/FormPonal';

const ApiPonal: React.FC = () => {
  return (
    <VentanaUsuario>
      <TabVentana eventKey='API' title='API-POLICIA'>
        <Container className='mt-4'>
          <FormPonal />
        </Container>
      </TabVentana>

    </VentanaUsuario>
  );
}

export default ApiPonal;