import { CardForm, SubtituloForm, TabVentana, VentanaUsuario } from 'eco-unp/ui';
import React, { useState } from 'react';
import { Form, InputGroup, Col, Row, Button } from 'react-bootstrap';
import { FaPlusCircle, FaUser } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { Departamento } from "./Ubicacion/Departamento";
import { Municipio } from "./Ubicacion/Municipio";
import { Pais } from "./Ubicacion/Pais";

const FormPonal: React.FC = () => {
    const [idPaisUbicacion, setIdPaisUbicacion] = useState('0');
    const [idDepartamentoUbicacion, setIdDepartamentoUbicacion] = useState('0');
    const [idMunicipioUbicacion, setIdMunicipioUbicacion] = useState('0');

    const handlePaisChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setIdPaisUbicacion(event.target.value);
        setIdDepartamentoUbicacion('0');
        setIdMunicipioUbicacion('0');
      };
    
      const handleDepartamentoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setIdDepartamentoUbicacion(event.target.value);
        setIdMunicipioUbicacion('');
      };
    
      const handleMunicipioGet = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setIdMunicipioUbicacion(event.target.value);
      };

    const [primerNombre, setPrimerNombre] = useState<string>('');
    const [segundoNombre, setSegundoNombre] = useState<string>('');
    const [primerApellido, setPrimerApellido] = useState<string>('');
    const [segundoApellido, setSegundoApellido] = useState<string>('');
    const [cedula, setCedula] = useState<string>('');
    const [contactos, setContactos] = useState<string[]>(['']);

    const handleAgregarContacto = () => {
        if (contactos.length < 4) {
            setContactos([...contactos, '']);
        } else {
            alert('No puedes añadir más de 4 contactos.');
        }
    };

    const handleContactoChange = (index: number, value: string) => {
        const newContactos = [...contactos];
        newContactos[index] = value;
        setContactos(newContactos);
    };

    const handleRemoverContacto = (index: number) => {
        if (contactos.length > 1) {
            const newContactos = contactos.filter((_, i) => i !== index);
            setContactos(newContactos);
        }
    };

    const [tipoEsquema, setTipoEsquema] = useState<string>('');
    const [nombreLiderAsignado, setNombreLiderAsignado] = useState<string>('');
    const [placas, setPlacas] = useState<string[]>(['']);

    const handleAgregarPlaca = () => {
        if (placas.length < 10) {
            setPlacas([...placas, '']);
        } else {
            alert('No puedes añadir más de 10 placas.');
        }
    };

    const handlePlacaChange = (index: number, value: string) => {
        const newPlacas = [...placas];
        newPlacas[index] = value;
        setPlacas(newPlacas);
    };

    const handleRemoverPlaca = (index: number) => {
        if (placas.length > 1) {
            const newPlacas = placas.filter((_, i) => i !== index);
            setPlacas(newPlacas);
        }
    };

    const [enlacePonal, setEnlacePonal] = useState<string>('');



    return (
        <VentanaUsuario>
            <TabVentana eventKey={"FormPonal"} title={"Formulario Ponal"} >
                <CardForm method={"POST"} canEdit={false} titulo={"FORMULARIO POLICIA NACIONAL"} validated={true}>
                    <SubtituloForm subtitulo={"DATOS DEL SOLICITANTE"} icon={FaUser}></SubtituloForm>
                    <Row className="mb-3">
                        {/* Campo Primer Nombre */}
                        <Form.Group as={Col} xs={12} md={6} controlId="primerNombre">
                            <Form.Label>Primer Nombre <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={primerNombre}
                                    required
                                    onChange={(e) => setPrimerNombre(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {/* Campo Segundo Nombre */}
                        <Form.Group as={Col} xs={12} md={6} controlId="segundoNombre">
                            <Form.Label>Segundo Nombre</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={segundoNombre}
                                    onChange={(e) => setSegundoNombre(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {/* Campo Primer Apellido */}
                        <Form.Group as={Col} xs={12} md={6} controlId="primerApellido">
                            <Form.Label>Primer Apellido <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={primerApellido}
                                    required
                                    onChange={(e) => setPrimerApellido(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {/* Campo Segundo Apellido */}
                        <Form.Group as={Col} xs={12} md={6} controlId="segundoApellido">
                            <Form.Label>Segundo Apellido</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={segundoApellido}
                                    onChange={(e) => setSegundoApellido(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {/* NUIP */}
                        <Form.Group as={Col} xs={12} md={6} controlId="cedula">
                            <Form.Label>NUIP <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={cedula}
                                    required
                                    onChange={(e) => setCedula(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Col lg={3} md={6} xs={12}>
                        <Pais paisRef={undefined} idPaisUbicacion={1} onChange={handlePaisChange} />
                        <Departamento departamentoRef={undefined} idPais={idPaisUbicacion} onChange={handleDepartamentoChange} />
                    </Col>
                    <Col lg={3} md={6} xs={12}>
                        <Municipio municipioRef={undefined} idDepartamento={idDepartamentoUbicacion} onChange={handleMunicipioGet} />
                    </Col>
                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="tipoEsquema">
                            <Form.Label>Tipo de esquema <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Select
                                    as="select"
                                    value={tipoEsquema}
                                    required
                                    onChange={(e) => setTipoEsquema(e.target.value)}
                                >
                                    <option value="" disabled selected>Selecciona una Opción</option>
                                    <option value="individual">Individual</option>
                                    <option value="colectivo">Colectivo</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        {contactos.map((contacto, index) => (
                            <Form.Group as={Col} xs={12} md={6} controlId={`contacto-${index}`} key={index}>
                                <Form.Label>Contacto {index + 1}: </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="number"
                                        value={contacto}
                                        onChange={(e) => handleContactoChange(index, e.target.value)}
                                        required={index === 0}
                                    />
                                </InputGroup>
                            </Form.Group>
                        ))}
                    </Row>

                    <Row className="mb-3">
                        <Button className='col-4 mx-auto' variant="secondary" onClick={handleAgregarContacto}>
                            <FaPlusCircle /> Añadir Contacto
                        </Button>

                        <Button variant="danger" onClick={() => handleRemoverContacto(contactos.length - 1)}
                            disabled={contactos.length === 1} className='col-4 mx-auto'>
                            <FaTrash /> Eliminar Último Contacto
                        </Button>
                    </Row>

                    <Row className="mb-3">
                        {placas.map((placa, index) => (
                            <Form.Group as={Col} xs={12} md={6} controlId={`placa-${index}`} key={index}>
                                <Form.Label>Placa {index + 1}: </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="string"
                                        value={placa}
                                        onChange={(e) => handlePlacaChange(index, e.target.value)}
                                        required={index === 0}
                                    />
                                </InputGroup>
                            </Form.Group>
                        ))}
                    </Row>

                    <Row className="mb-3">
                        <Button className='col-4 mx-auto' variant="secondary" onClick={handleAgregarPlaca}>
                            <FaPlusCircle /> Añadir Placa
                        </Button>

                        <Button variant="danger" onClick={() => handleRemoverPlaca(placas.length - 1)}
                            disabled={placas.length === 1} className='col-4 mx-auto'>
                            <FaTrash /> Eliminar Última Placa
                        </Button>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} xs={12} md={6} controlId="nombreLiderAsignado">
                            <Form.Label>Nombre del lider de asignación <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={nombreLiderAsignado}
                                    required
                                    onChange={(e) => setNombreLiderAsignado(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6} controlId="enlacePonal">
                            <Form.Label>Enlace Policia Nacional <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={enlacePonal}
                                    required
                                    onChange={(e) => setEnlacePonal(e.target.value)}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                </CardForm>
            </TabVentana>
        </VentanaUsuario >
    )
};
export default FormPonal;