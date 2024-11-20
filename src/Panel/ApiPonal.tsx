import React from 'react';
import { TabVentana, VentanaUsuario } from 'eco-unp/ui';
import { toast } from 'react-toastify'
import { Container } from 'react-bootstrap';
import FormPonal from '../Components/FormPonal';

interface Dato {
  serial: string;
  cedulaAnonima: string;
  departamento: string;
  ciudad: string;
  nivel_riesgo: string;
  telefonoAnonimo: string;
}

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
      <TabVentana eventKey='API' title='API-POLICIA'>
        <Container className='mt-4'>
          <FormPonal />
        </Container>
      </TabVentana>

    </VentanaUsuario>
  );
}

export default LineaVida;