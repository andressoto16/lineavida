import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Container } from 'react-bootstrap';
import { Encabezado } from 'eco-unp/ui';

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
      <Card className="border-0 rounded-3 shadow mt-4">
        <Card.Header className="text-center bg-dark text-light rounded-top">
          <h4>Consulta por número de Celular o Cédula</h4>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center">
            {/* Selección de tipo de búsqueda */}
            <Col md={4}>
              <Form.Group controlId="searchType" className="mb-3">
                <Form.Label>Seleccione el tipo de búsqueda</Form.Label>
                <Form.Select value={searchType} onChange={handleTypeChange}>
                  <option value="cedula">Cédula</option>
                  <option value="celular">Celular</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Campo de entrada para número */}
            <Col md={5}>
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

            {/* Botón de búsqueda */}
            <Col md={3} className="d-flex justify-content-center">
              <Button variant="primary" onClick={handleSearch} className="btn-sm w-75 mt-3">
                Buscar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Busqueda;
