import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Container } from 'react-bootstrap';
import Encabezado from './Encabezado';

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
      alert('Por favor ingrese un número de Celular o Cédula');
    }
  };

  return (
    <>
      {/* Encabezado */}

      <div className='mt-4 mb-3 mx-3'>
        <Encabezado dependencia="Subdirección Especializada de Seguridad y Protección (SESP)" />
      </div>

      {/* Tarjeta de Búsqueda */}
      <Card className="border-0 rounded-3 shadow mt-4 mx-3">
        <Card.Header style={{ backgroundColor: '#303D50' }} className="text-center text-light rounded-top d-flex aling-items-center justify-content-center">
          <h5 style={{margin: '0px'}} className='py-1'>Generar consulta</h5>
        </Card.Header>
        <Card.Body>
          <Row className="align-items-center mt-3 mb-3 px-2">
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
                  type="text"
                  placeholder={searchType === 'cedula' ? 'Número' : 'Número'}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>

            {/* Botón de búsqueda */}
            <Col md={2} className="d-flex justify-content-center">
              <Button 
                onClick={handleSearch} 
                className="btn-sm w-100" 
                style={{ backgroundColor: '#D13C47', borderColor: '#D13C47', height: '36px', marginTop: '15px'}}
              >
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
