import React, { useState } from 'react';
import Encabezado from './Encabezado';
import { Card, CardBody, CardHeader, Col, FormControl, FormSelect, Row, InputGroup } from 'react-bootstrap'
import { FaComputerMouse, FaFileSignature, FaLink, FaCopy, FaFileCode, FaFilter } from "react-icons/fa6"
import { toast } from 'react-toastify'

const SespApi = () => {

    const initialUrl = 'https://formulariopruebas.unp.gov.co/api-django/lineavida/?cedula={valor}';

    const [queryType, setQueryType] = useState('cedula');
    const [queryValue, setQueryValue] = useState('');
    const [result, setResult] = useState(null);
    const [apiUrl, setApiUrl] = useState(initialUrl);
    const [inputValue, setInputValue] = useState(initialUrl);

    const handleTypeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setQueryType(e.target.value);
    };

    const handleValueChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setQueryValue(e.target.value);
    };

    const handleSearchApi = async () => {
        const url = `https://formulariopruebas.unp.gov.co/api-django/lineavida/?${queryType}=${queryValue}`;
        setApiUrl(url);
        setInputValue(url);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            setResult(null);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(inputValue).then(() => {
            setTimeout(() => {
                toast.success('¡URL copiada al portapapeles!');
            }, 100); 
        }).catch(err => {
            toast.error('Error al copiar la URL.');
        });
    };

    const exampleResult = [{
        serial: "SESP-00000",
        cedulaAnonima: "123456789",
        departamento: "DEPARTAMENTO",
        ciudad: "MUNICIPIO / CIUDAD",
        nivel_riesgo: "RIESGO",
        telefonoAnonimo: "CELULAR"
    }];

    const navigateToUsoApi = () => {
        window.open('/sesp/gps/uso-api-sesp', '_blank');
    };

    return (
        <React.Fragment>

            <Row className='mt-4 mb-2 mx-3'>
                <Encabezado dependencia={'Subdirección Especializada de Seguridad y Protección'} />
            </Row>

            <Row className='mb-4 mx-1'>
                <Col xs={12} lg={8}>
                    <p style={{textAlign: 'justify'}}>
                        La API de la Subdirección Especializada de Seguridad y Protección (API-SESP) ha sido creada para proporcionar un acceso seguro
                        y confiable a la información de solicitantes, evaluados y beneficiarios. Esto se logra mediante la anonimización de datos
                        sensibles y personales, siguiendo las Políticas de Seguridad de la Información y Protección de Datos Personales de la Entidad.
                        Gracias a la API-SESP, las personas inscritas en la UNP pueden consultar y filtrar datos por número de cédula u otros
                        criterios de búsqueda, ofreciendo así una herramienta eficiente para la gestión de la información y los datos.
                    </p>
                </Col>
                <Col xs={12} lg={4}>
                    <Card>
                        <CardHeader style={{ backgroundColor: '#e25155' }}>
                            <p style={{ color: '#FFF', margin: '0px', fontWeight: '500' }}>API-SESP (V-0.1)</p>
                        </CardHeader>
                        <CardBody>
                            <div className='d-flex'>
                                <FaFileSignature style={{ fontSize: '1.5rem', marginRight: '10px', marginLeft: '1px' }} />
                                <a
                                    href='https://www.unp.gov.co/normativa/politicas-de-seguridad-de-la-informacion-y-proteccion-de-datos-personales/'
                                    style={{ textDecoration: 'none', color: '#212529', fontWeight: '400' }}
                                    target="_blank"
                                >
                                    <p className="mb-2" style={{ margin: 0 }}>Políticas de seguridad de información y protección de datos personales</p>
                                </a>
                            </div>
                            <div className='d-flex'>
                                <FaComputerMouse style={{ fontSize: '1rem', marginRight: '10px', marginTop: '3px', color: '#212529', fontWeight: '400' }} />
                                <p style={{ margin: 0, cursor: 'pointer' }} onClick={navigateToUsoApi}>Uso y respuesta de la API</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row className='my-3 mx-1'>
                <Col xs={12} lg={12} className='d-flex mb-2'>
                    <FaFilter style={{ fontSize: '1.4rem', marginTop: '2px', marginRight: '7px', color: '#5A5A58' }} />
                    <h4 style={{ fontWeight: '600', color: '#5A5A58' }}>Uso (Consumption)</h4>
                </Col>
                <Col xs={12} lg={4} className='d-flex mb-3'>
                    <label style={{ margin: '0px', marginTop: '7px', marginRight: '10px', fontWeight: '600' }}>Criterio</label>
                    <FormSelect value={queryType} onChange={handleTypeChange}>
                        <option value="cedula">Nuip / Cédula</option>
                        <option value="telefono_contacto">Celular</option>
                    </FormSelect>
                </Col>
                <Col xs={12} lg={3} className='d-flex mb-3'>
                    <label style={{ margin: '0px', marginTop: '7px', marginRight: '10px', fontWeight: '600' }}>Valor</label>
                    <FormControl
                        type='text'
                        value={queryValue}
                        onChange={handleValueChange}
                    />
                </Col>
                <Col xs={12} lg={1} style={{ paddingRight: '12px' }}>
                    <button className='btn w-100' onClick={handleSearchApi} style={{backgroundColor:'#e25155', color:'#fff'}}>GET</button>
                </Col>
            </Row>

            <Row className='mt-4 mx-1'>
                <Col xs={12} lg={12} className='d-flex mb-2'>
                    <FaLink style={{ fontSize: '1.4rem', marginTop: '2px', marginRight: '7px', color: '#5A5A58' }} />
                    <h4 style={{ fontWeight: '600', color: '#5A5A58' }}>Enlace (URL)</h4>
                </Col>
                <Col xs={12} lg={8}>
                    <InputGroup className="mb-3">
                        <FormControl
                            defaultValue={initialUrl}
                            value={inputValue}
                        />
                        <InputGroup.Text onClick={handleCopy} style={{ backgroundColor: '#e25155', cursor: 'pointer' }}>
                            <FaCopy style={{ color: '#FFF' }} />
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
            </Row>

            <Row className='mt-3 mx-1'>
                <Col xs={12} lg={12} className='d-flex mb-2'>
                    <FaFileCode style={{ fontSize: '1.4rem', marginTop: '2px', marginRight: '7px', color: '#5A5A58' }} />
                    <h4 style={{ fontWeight: '600', color: '#5A5A58' }}>Recurso (JSON)</h4>
                </Col>
                <Col xs={12} lg={8}>
                    <Card>
                        <CardBody>
                            <pre>
                                {result
                                    ? JSON.stringify(result, null, 2)
                                    : JSON.stringify(exampleResult, null, 2)
                                }
                            </pre>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Row className='mt-5'></Row>
        </React.Fragment>
    );
};

export default SespApi;