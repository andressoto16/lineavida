import React, { useState } from 'react';
import { Row, Col, Button, Form, Container } from 'react-bootstrap';
import { Encabezado, CardForm } from 'eco-unp/ui';

interface BusquedaProps {
  onSearch: (type: string, value: string) => void;
}

const Busqueda: React.FC<BusquedaProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('cedula'); // Valor predeterminado "cedula"

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
      alert('Por favor ingrese un número de Celular o Cédula');
    }
  };

  return (
    <>
      {/* Encabezado */}
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={11} xl={9}>
            <Encabezado dependencia="Linea Vida" />
          </Col>
        </Row>
      </Container>

      {/* Tarjeta de Búsqueda */}
      <CardForm method="POST" titulo="Consulta por número de Celular o Cédula">
        <div>
          <Row className="align-items-center mb-3">
            <Col md={4}>
              <Form.Group controlId="searchType" className="mb-3">
                <Form.Label>Seleccione el tipo de búsqueda</Form.Label>
                <Form.Select value={searchType} onChange={handleTypeChange}>
                  <option value="cedula">Cédula</option>
                  <option value="celular">Celular</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group controlId="searchTerm" className="mb-3">
                <Form.Label>Ingrese el número de {searchType === 'cedula' ? 'cédula' : 'celular'}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={searchType === 'cedula' ? 'Número de cédula' : 'Número de celular'}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleSearch} className="btn-sm w-50">
                Buscar
              </Button>
            </Col>
          </Row>
        </div>
      </CardForm>
    </>
  );
};

export default Busqueda;

