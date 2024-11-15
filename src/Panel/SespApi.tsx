import React from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';

import TablaConBuscador from '../Components/TablaConBuscador';
import Busqueda from '../Components/Busqueda';
import SespApi from '../Components/GetRequest';
import Encabezado from '../Components/Encabezado';

import { toast } from 'react-toastify'
import { Card, Container, Row } from 'react-bootstrap';

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
  { key: 'nivel_riesgo', label: 'Nivel de riesgo' },
  { key: 'telefonoAnonimo', label: 'Teléfono o celular' },
];

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#3c4f6f",
  alignItems: "center",
};

const obtenerDatos = async (queryType = '', queryValue = '') => {

  try {
    // Construye la URL de la API con los parámetros de búsqueda
    const url = queryValue
      ? `https://formulariopruebas.unp.gov.co/api-django/lineavida/?${queryType}=${queryValue}`
      : 'https://formulariopruebas.unp.gov.co/api-django/lineavida/';


    // console.log("URL de búsqueda:", url); // Verifica la URL de búsqueda en la consola

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const datos = await response.json();
    // console.log("Datos obtenidos:", datos); // Depuración de los datos obtenidos de la API
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
      setFilteredData([]);
      toast.error('No se encontraron resultados.');
    }
  };

  return (
    <VentanaUsuario>

      <TabVentana eventKey="Consulta" title="Consultar">
        <Container className='mt-4'>
          {/* Encabezado */}

          <Row className='mt-4 mb-2 mx-3'>
            <Encabezado dependencia={'Subdirección Especializada de Seguridad y Protección'} />
          </Row>

          <Card className="border-0 rounded-3 shadow-sm mx-3">
            <Card.Header style={headerStyle} className="text-start text-light rounded-top-3 d-flex aling-items-center justify-content-center border-bottom-0"> {/* style={{ backgroundColor: '#335581' }} */}
              <h4 style={{ margin: '0px' }} className='my-3'>Consulta</h4>
            </Card.Header>
            <Card.Body>
              <Busqueda onSearch={handleSearch} />
              <TablaConBuscador columns={columnas} data={filteredData} />
            </Card.Body>
          </Card>
        </Container>
      </TabVentana>

      <TabVentana eventKey='API' title='API-SESP'>
        <Container className='mt-4'>
          <SespApi />
        </Container>
      </TabVentana>

      <TabVentana eventKey='Dashboard' title='Estadísticas'>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '90vh' }}>
          <p style={{ margin: '0px', color: 'darkgrey', fontSize: '2rem', fontWeight: '600' }}>Próximamente</p>
        </div>
      </TabVentana>

    </VentanaUsuario>
  );
}

export default LineaVida;