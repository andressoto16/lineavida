import React, { useState } from 'react';
import Encabezado from './Encabezado';

import { Card, Row, Col, Button, Form, Container } from 'react-bootstrap';
import { toast } from 'react-toastify'
import { FaMagnifyingGlass } from "react-icons/fa6"

import '../styles/Styles.css';

interface BusquedaProps {
  onSearch: (type: string, value: string) => void;
}

const Busqueda: React.FC<BusquedaProps> = ({ onSearch }) => {

  const [searchTerm, setSearchTerm] = useState<string>(''); // Tipo string
  const [searchType, setSearchType] = useState<string>('cedula'); // Tipo string

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchType, searchTerm);
    } else {
      toast.error('Por favor ingrese un número de cédula o celular.');
    }
  };

  return (
    <>
      {/* Encabezado */}

      {/* <Row className='mt-4 mb-2 mx-1'>
        <Encabezado dependencia={'Subdirección Especializada de Seguridad y Protección'} />
      </Row> */}

      {/* Tarjeta de Búsqueda */}
      <Row className="align-items-center mt-4 mb-5 px-2">

        <Col xs={12} lg={12} className='d-flex mb-2'>
          <FaMagnifyingGlass style={{ fontSize: '1.4rem', marginTop: '2px', marginRight: '1rem', color: '#5A5A58' }} />
          <h4 style={{ fontWeight: '600', color: '#5A5A58' }}>Generar</h4>
        </Col>

        {/* Selección de tipo de búsqueda */}
        <Col md={5}>
          <Form.Group controlId="searchType" className="mb-3">
            <Form.Label>Seleccione el tipo de búsqueda</Form.Label>
            <Form.Select value={searchType} onChange={handleTypeChange}>
              <option value="cedula">Número único de identificación personal (NUIP)</option>
              <option value="celular">Número de teléfono o celular</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Campo de entrada para número */}
        <Col md={5}>
          <Form.Group controlId="searchTerm" className="mb-3">
            <Form.Label>Ingrese el número de {searchType === 'cedula' ? 'identificación' : 'teléfono o celular'}</Form.Label>
            <Form.Control
              type="number"
              placeholder={searchType === 'cedula' ? 'Número' : 'Número'}
              value={searchTerm}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>

        {/* Botón de búsqueda */}
        <Col md={2}>
          <Button
            onClick={handleSearch}
            className="btn-sm btn-custom w-100"
            style={{ height: '36px', marginTop: '15px' }}
          >
            Buscar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Busqueda;
