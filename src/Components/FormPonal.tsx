import { CardForm, SubtituloForm } from 'eco-unp/ui';
import React, { useState } from 'react';
import { Form, InputGroup, Col, Row, Button } from 'react-bootstrap';
import { FaPlusCircle, FaUser } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import { Departamento } from "./Ubicacion/Departamento";
import { Municipio } from "./Ubicacion/Municipio";
import { Pais } from "./Ubicacion/Pais";
import { toast } from 'react-toastify';

const FormPonal: React.FC = () => {
    interface Nombres {
        primerNombre: string;
        segundoNombre?: string;
        primerApellido: string;
        segundoApellido?: string;
    }

    // Variables
    const [idPaisUbicacion, setIdPaisUbicacion] = useState('');
    const [idDepartamentoUbicacion, setIdDepartamentoUbicacion] = useState('0');
    const [idMunicipioUbicacion, setIdMunicipioUbicacion] = useState('0');
    const [beneficiario, setBeneficiario] = useState<Nombres>({ primerNombre: '', segundoNombre: '', primerApellido: '', segundoApellido: '' });
    const [cedula, setCedula] = useState<string>('');
    const [contactos, setContactos] = useState<string[]>(['']);
    const [Resolucion, setResolucion] = useState<string>("");
    const [tipoEsquema, setTipoEsquema] = useState<string>('');
    const [liderAsignado, setLiderAsignado] = useState<Nombres>({ primerNombre: '', segundoNombre: '', primerApellido: '', segundoApellido: '' });
    const [medidasExtensivasFamilia, setMedidasExtensivasFamilia] = useState<string>('');
    const [placas, setPlacas] = useState<string[]>(['']);
    const [enlacePonal, setEnlacePonal] = useState<string>('');
    // Variable para validar campos requeridos
    const [validarDatos, setValidarDatos] = useState<boolean>(false);

    interface ComposicionFamiliar {
        nombres: Nombres;
        parentesco: string;
    }
    const [familiares, setFamiliares] = useState<ComposicionFamiliar[]>([]);

    const handleFamiliarChange = (index: number, field: string, value: string) => {
        const newFamiliares = [...familiares];
        newFamiliares[index] = {
            ...newFamiliares[index],
            [field]: value
        };
        setFamiliares(newFamiliares);
    };

    const handleAgregarFamiliar = () => {
        setFamiliares([
            ...familiares,
            { nombres: { primerNombre: '', primerApellido: '' }, parentesco: '' }
        ]);
    };

    const handleRemoverFamiliar = (index: number) => {
        const newFamiliares = familiares.filter((_, i) => i !== index);
        setFamiliares(newFamiliares);
    };

    const limpiarFormulario = () => {
        setIdPaisUbicacion('1');
        setIdDepartamentoUbicacion('');
        setIdMunicipioUbicacion('');
        //setBeneficiario();
        setCedula('');
        setContactos(['']);
        setResolucion('');
        setTipoEsquema('');
        //setNombreLiderAsignado(['']);
        setPlacas(['']);
        setEnlacePonal('');
        //setFamiliares(['']);
    };

    const handleBeneficiarioChange = (field: keyof Nombres, value: string) => {
        setBeneficiario((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleChangeLider = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLiderAsignado(prevLider => ({
            ...prevLider,
            [name]: value
        }));
    };

    /* Handle Ubicación */
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

    /* Handle Contactos */
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

    /* Handle Placas */
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

    /* Envio de datos */
    const guardarEnApi = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidarDatos(true);
            toast.error('Por favor completa todos los campos requeridos.');
            return;
        }
        setValidarDatos(true);

        const datosPonal = {
            idPaisUbicacion,
            idDepartamentoUbicacion,
            idMunicipioUbicacion,
            beneficiario,
            cedula,
            contactos,
            Resolucion,
            tipoEsquema,
            liderAsignado,
            placas,
            enlacePonal
        }

        const response = await fetch(process.env.REACT_APP_URL + "sistema/guardarponal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datosPonal),
        });
        if (response.ok) {
            const data = await response.json();
            toast.success('Datos enviados con éxito.');
            limpiarFormulario();
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }



    return (
        <CardForm method={"POST"} canEdit={false} titulo={"FORMULARIO POLICIA NACIONAL"} validated={validarDatos}
            onSubmit={guardarEnApi} hasBody={true}>
            <SubtituloForm subtitulo={"Datos del solicitante"} icon={FaUser}></SubtituloForm>
            <Row className="mb-3">
                {/* Campo Primer Nombre */}
                <Form.Group as={Col} xs={12} md={6} controlId="beneficiario">
                    <Form.Label>Primer Nombre <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={beneficiario.primerNombre}
                            required
                            isInvalid={validarDatos && !beneficiario.primerApellido}
                            onChange={(e) => handleBeneficiarioChange('primerNombre', e.target.value)}
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
                            value={beneficiario.segundoNombre}
                            onChange={(e) => handleBeneficiarioChange('segundoNombre', e.target.value)}

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
                            value={beneficiario.primerApellido}
                            required
                            isInvalid={validarDatos && !beneficiario.primerApellido}
                            onChange={(e) => handleBeneficiarioChange('primerApellido', e.target.value)}
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
                            value={beneficiario.segundoApellido}
                            onChange={(e) => handleBeneficiarioChange('segundoApellido', e.target.value)}
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
                            min="0"
                            pattern="\d*"
                            onChange={(e) => setCedula(e.target.value)}
                            isInvalid={validarDatos && !cedula}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="justify-content-center align-items-center flex-wrap">
                <Col xs={12} sm={6} md={3} lg={3}>
                    <Pais paisRef={undefined} idPaisUbicacion={1} onChange={handlePaisChange} />
                </Col>
                <Col xs={12} sm={6} md={5} lg={5}>
                    <Departamento departamentoRef={undefined} idPais={idPaisUbicacion} onChange={handleDepartamentoChange} />
                </Col>
                <Col xs={12} sm={6} md={4} lg={4}>
                    <Municipio municipioRef={undefined} idDepartamento={idDepartamentoUbicacion} onChange={handleMunicipioGet} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} xs={12} md={6} controlId="tipoEsquema">
                    <Form.Label>Tipo de esquema <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                        <Form.Select
                            as="select"
                            value={tipoEsquema}
                            required
                            onChange={(e) => setTipoEsquema(e.target.value)}
                            isInvalid={validarDatos && !tipoEsquema}
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
                <Form.Group as={Col} xs={12} md={6} controlId="medidasExtensivasFamilia">
                    <Form.Label>Medidas extensivas a la familia <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                        <Form.Select
                            as="select"
                            value={medidasExtensivasFamilia}
                            required
                            onChange={(e) => setMedidasExtensivasFamilia(e.target.value)}
                            isInvalid={validarDatos && !medidasExtensivasFamilia}
                        >
                            <option value="" disabled selected>Selecciona una Opción</option>
                            <option value="FAMILIAR">Familiar</option>
                            <option value="FIRMANTE">Firmante </option>
                            <option value="FIRMANTE DE PAZ">Firmate de paz</option>
                            <option value="INDIVIDUAL">Individual</option>
                            <option value="NO APLICA">No aplica</option>
                            <option value="NO FIRMANTE DE PAZ">No firmante de paz</option>
                            <option value="NO REGISTRA">No registra</option>
                            <option value="PARTIDO COMUNES">Partido comunes</option>
                            <option value="PARTIDO POLITICO">Partido politico</option>
                            <option value="PNIS-PARTIDO COMUNES">PNIS-Partido comunes</option>
                            <option value="REPRESENTANTE LEGAL DEL COMITE NACIONAL">Representante legal del comite nacional</option>
                            <option value="UBPD-PARTIDO COMUNES">UBPD-Partido comunes</option>
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
                                min="0"
                                pattern="\d*"
                                onChange={(e) => handleContactoChange(index, e.target.value)}
                                required={index === 0}
                                isInvalid={validarDatos && !contacto}
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
                                type="text"
                                value={placa}
                                onChange={(e) => handlePlacaChange(index, e.target.value)}
                                required={index === 0}
                                isInvalid={validarDatos && !placa}
                            />
                        </InputGroup>
                    </Form.Group>
                ))}
            </Row>

            <Row className="mb-4">
                <Button className='col-4 mx-auto' variant="secondary" onClick={handleAgregarPlaca}>
                    <FaPlusCircle /> Añadir Placa
                </Button>

                <Button variant="danger" onClick={() => handleRemoverPlaca(placas.length - 1)}
                    disabled={placas.length === 1} className='col-4 mx-auto'>
                    <FaTrash /> Eliminar Última Placa
                </Button>
            </Row>


            <Row className="mb-3">
                <h4>Familiares</h4>
                {familiares.map((familiar, index) => (
                    <Row key={index} className="mb-3">
                        <h5>Familiar {index+1}</h5>
                        <Col xs={12} md={4}>
                            <Form.Group controlId={`familiar-${index}-nombre`}>
                                <Form.Label>Primer Nombre:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={familiar.nombres.primerNombre}
                                    onChange={(e) => handleFamiliarChange(index, 'nombres.primerNombre', e.target.value)}
                                    placeholder="Primer Nombre"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={4}>
                            <Form.Group controlId={`familiar-${index}-segundoNombre`}>
                                <Form.Label>Segundo Nombre:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={familiar.nombres.segundoNombre || ''}
                                    onChange={(e) => handleFamiliarChange(index, 'nombres.segundoNombre', e.target.value)}
                                    placeholder="Segundo Nombre"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={4}>
                            <Form.Group controlId={`familiar-${index}-apellido`}>
                                <Form.Label>Primer Apellido:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={familiar.nombres.primerApellido}
                                    onChange={(e) => handleFamiliarChange(index, 'nombres.primerApellido', e.target.value)}
                                    placeholder="Primer Apellido"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={4}>
                            <Form.Group controlId={`familiar-${index}-segundoApellido`}>
                                <Form.Label>Segundo Apellido:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={familiar.nombres.segundoApellido || ''}
                                    onChange={(e) => handleFamiliarChange(index, 'nombres.segundoApellido', e.target.value)}
                                    placeholder="Segundo Apellido"
                                />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={4}>
                            <Form.Group controlId={`familiar-${index}-parentesco`}>
                                <Form.Label>Parentesco:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={familiar.parentesco}
                                    onChange={(e) => handleFamiliarChange(index, 'parentesco', e.target.value)}
                                    placeholder="Parentesco"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                ))}
            </Row>

            <Row className="mb-3">
                <Button className="col-4 mx-auto" variant="secondary" onClick={handleAgregarFamiliar}>
                    <FaPlusCircle /> Añadir Familiar
                </Button>

                <Button
                    variant="danger"
                    onClick={() => handleRemoverFamiliar(familiares.length - 1)}
                    disabled={familiares.length === 1}
                    className="col-4 mx-auto"
                >
                    <FaTrash /> Eliminar Último Familiar
                </Button>
            </Row>

            <Row className="mb-3">
                <h4>Lider de Asignación</h4>
                {/* Campo Primer Nombre */}
                <Form.Group as={Col} xs={12} md={6} controlId="primerNombreLider">
                    <Form.Label>Primer Nombre <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={liderAsignado.primerNombre}
                            required
                            onChange={handleChangeLider}
                            isInvalid={validarDatos && !liderAsignado.primerNombre}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                {/* Campo Segundo Nombre */}
                <Form.Group as={Col} xs={12} md={6} controlId="segundoNombreLider">
                    <Form.Label>Segundo Nombre</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={liderAsignado.segundoNombre}
                            onChange={handleChangeLider}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                {/* Campo Primer Apellido */}
                <Form.Group as={Col} xs={12} md={6} controlId="primerApellidoLider">
                    <Form.Label>Primer Apellido <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={liderAsignado.primerApellido}
                            required
                            onChange={handleChangeLider}
                            isInvalid={validarDatos && !liderAsignado.primerApellido}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                {/* Campo Segundo Apellido */}
                <Form.Group as={Col} xs={12} md={6} controlId="segundoApellidoLider">
                    <Form.Label>Segundo Apellido</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={liderAsignado.segundoApellido}
                            onChange={handleChangeLider}

                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} xs={12} md={6} controlId="enlacePonal">
                    <Form.Label>Enlace Policia Nacional <span style={{ color: 'red' }}>*</span></Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={enlacePonal}
                            required
                            onChange={(e) => setEnlacePonal(e.target.value)}
                            isInvalid={validarDatos && !enlacePonal}
                        />
                        <Form.Control.Feedback type="invalid">
                            Este campo es obligatorio.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Form.Group as={Col} xs={12} md={12} controlId="Resolucion">
                <Form.Label>Resolución <span style={{ color: 'red' }}>*</span></Form.Label>
                <InputGroup>
                    <Form.Control
                        as="textarea"
                        value={Resolucion}
                        required
                        onChange={(e) => setResolucion(e.target.value)}
                        maxLength={5000}
                        isInvalid={validarDatos && !Resolucion}
                    />
                    <Form.Control.Feedback type="invalid">
                        Este campo es obligatorio.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </CardForm>
    )
};
export default FormPonal;