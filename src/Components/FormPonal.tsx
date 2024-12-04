import { CardForm, SubtituloForm } from 'eco-unp/ui';
import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, Col, Row, Button, Spinner } from 'react-bootstrap';
import { FaPlusCircle, FaUser, FaSearch, FaAddressCard, FaCarSide } from 'react-icons/fa';
import { FaDatabase, FaLocationDot, FaTrash } from 'react-icons/fa6';
import { MdEmail, MdFamilyRestroom } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { RiPoliceBadgeFill } from "react-icons/ri";
import { Departamento } from "./Ubicacion/Departamento";
import { Municipio } from "./Ubicacion/Municipio";
import { Pais } from "./Ubicacion/Pais";
import { toast } from 'react-toastify';

const FormPonal: React.FC = () => {
    // Ref de Ubicación
    const paisSelectRef = useRef<HTMLSelectElement>(null);
    const departamentoSelectRef = useRef<HTMLSelectElement>(null);
    const municipioSelectRef = useRef<HTMLSelectElement>(null);

    // Interfaz para Nombres, tipo de Identificación y Familiares
    interface Nombres {
        primerNombre: string;
        segundoNombre?: string;
        primerApellido: string;
        segundoApellido?: string;
    }
    interface Familiar {
        nombres: Nombres;
        parentesco: string;
    }
    interface TipoIdentificacion {
        id_tidentificacion: number;
        nombre_tidentificacion: string
    }
    interface Vehiculo {
        placa: string;
        marca?: string;
        tipo?: string;
        color?: string;
    }

    // Variables
    const [cronos, setCronos] = useState<string>('');
    const [beneficiario, setBeneficiario] = useState<Nombres>({ primerNombre: '', segundoNombre: '', primerApellido: '', segundoApellido: '' });
    const [tipoIdentificacion, settipoIdentificacion] = useState<TipoIdentificacion[]>([]);
    const [tipoSeleccionadoBeneficiario, setTipoSeleccionadoBeneficiario] = useState("");
    const [numeroIdentificacionBeneficiario, setNumeroIdentificacionBeneficiario] = useState("");
    const [fechaExpedicionBeneficiario, setFechaExpedicionBeneficiario] = useState("");
    const [idPaisUbicacion, setIdPaisUbicacion] = useState("1");
    const [idDepartamentoUbicacion, setIdDepartamentoUbicacion] = useState('');
    const [idMunicipioUbicacion, setIdMunicipioUbicacion] = useState('');
    const [tipoEsquema, setTipoEsquema] = useState<string>('individual');
    const [rol, setRol] = useState<string>('');
    const [correoElectronico, setCorreoElectronico] = useState<string>('');
    const [telefonos, setTelefonos] = useState<string[]>(['']);
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([{ placa: '', marca: '', tipo: '', color: '' }]);
    const [familiares, setFamiliares] = useState<Familiar[]>([]);
    const [enlaceAsignado, setEnlaceAsignado] = useState<Nombres>({ primerNombre: '', segundoNombre: '', primerApellido: '', segundoApellido: '' });
    const [tipoSeleccionadoEnlace, setTipoSeleccionadoEnlace] = useState("");
    const [numeroIdentificacionEnlace, setNumeroIdentificacionEnlace] = useState("");
    const [fechaExpedicionEnlace, setFechaExpedicionEnlace] = useState("");
    const [telefonoEnlace, setTelefonoEnlace] = useState<string>('');
    const [enlacePonal, setEnlacePonal] = useState<string>('');
    const [resolucion, setResolucion] = useState<string>('');
    // Variable para validar campos requeridos
    const [validarDatos, setValidarDatos] = useState<boolean>(false);
    // Variable para identificar si esta cargando los datos de la busqueda
    const [cargando, setCargando] = useState(false);


    // Handle Beneficiario
    const handleBeneficiarioChange = (field: keyof Nombres, value: string) => {
        setBeneficiario((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    // validación para el campo de número de identificación Beneficiario
    const handleNumeroIdentificacionChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        if (tipoSeleccionadoBeneficiario === "1" || tipoSeleccionadoBeneficiario === "2") {
            if (/^\d{0,10}$/.test(value)) {
                setNumeroIdentificacionBeneficiario(value);
            }
        } if (tipoSeleccionadoBeneficiario === "4") {
            if (/^[A-Z0-9]{0,10}$/.test(value)) {
                setNumeroIdentificacionBeneficiario(value);
            }
        } else {
            if (/^\d{0,10}$/.test(value)) {
                setNumeroIdentificacionBeneficiario(value);
            }
        }
    };
    // validación para el campo de número de identificación Enlace
    const handleNumeroIdentificacionEnlaceChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        if (tipoSeleccionadoEnlace === "1" || tipoSeleccionadoEnlace === "2") {
            if (/^\d{0,10}$/.test(value)) {
                setNumeroIdentificacionEnlace(value);
            }
        } if (tipoSeleccionadoEnlace === "4") {
            if (/^[A-Z0-9]{0,10}$/.test(value)) {
                setNumeroIdentificacionEnlace(value);
            }
        } else {
            if (/^\d{0,10}$/.test(value)) {
                setNumeroIdentificacionEnlace(value);
            }
        }
    };

    // consulta al api para traer los diferentes tipos de identificacion
    useEffect(() => {
        const obtenertipoIdentificacion = async () => {
            try {
                const url = process.env.REACT_APP_URL + 'sistema/tipoidentificacion/';
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    settipoIdentificacion(data);
                } else {
                    console.error('Hubo un error al obtener los datos de los tipos de identificación:', response.status);
                }
            } catch (error) {
                console.error('Hubo un error al obtener los datos de los tipos de identificación:', error);
            }
        };
        obtenertipoIdentificacion();
    }, []);

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

    /* Handle Teléfonos */
    const handleAgregarTelefono = () => {
        if (telefonos.length < 4) {
            setTelefonos([...telefonos, '']);
        } else {
            toast.error('No puedes añadir más de 4 teléfonos.');
        }
    };
    const handleTelefonoChange = (index: number, value: string) => {
        const formattedValue = value.replace(/\D/g, '');
        const newTelefonos = [...telefonos];
        newTelefonos[index] = formattedValue;
        setTelefonos(newTelefonos);
    };
    const handleRemoverTelefono = (index: number) => {
        if (telefonos.length > 1) {
            const newTelefonos = telefonos.filter((_, i) => i !== index);
            setTelefonos(newTelefonos);
        }
    };

    /* Handle Vehículos */
    const handleAgregarVehiculo = () => {
        if (vehiculos.length < 10) {
            setVehiculos([...vehiculos, { placa: '', marca: '', tipo: '', color: '' }]);
        } else {
            toast.error('No puedes añadir más de 10 vehículos.');
        }
    };
    // Función para validar el formato de la placa 
    const validarPlaca = (placa: string): boolean => {
        const regex = /^[A-Za-z]{3}\d{3}$/i;
        return regex.test(placa);
    };
    const handleVehiculoChange = (index: number, field: keyof Vehiculo, value: string) => {
        const nuevosVehiculos = [...vehiculos];
        nuevosVehiculos[index][field] = value;
        setVehiculos(nuevosVehiculos);

        // Validar placa y actualizar estados de formulario 
        if (field === 'placa' && index === 0) {
            setValidarDatos(true);
        }
    };

    const handleRemoverVehiculo = (index: number) => {
        if (vehiculos.length > 1) {
            const newVehiculos = vehiculos.filter((_, i) => i !== index);
            setVehiculos(newVehiculos);
        }
    };

    // Handle Familiares
    const handleFamiliarChange = (index: number, field: keyof Familiar | 'nombres.primerNombre' | 'nombres.segundoNombre' | 'nombres.primerApellido' | 'nombres.segundoApellido', value: string) => {
        const newFamiliares = [...familiares];

        // Si el campo es un campo anidado dentro de "nombres"
        if (field.startsWith('nombres.')) {
            const nombreField = field.split('.')[1] as keyof Nombres;
            newFamiliares[index] = {
                ...newFamiliares[index],
                nombres: {
                    ...newFamiliares[index].nombres,
                    [nombreField]: value,
                }
            };
        } else {
            // Si el campo no es anidado
            newFamiliares[index] = {
                ...newFamiliares[index],
                [field]: value,
            };
        }
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

    // Handle Enlace Asignado
    const handleEnlaceChange = (field: keyof Nombres, value: string) => {
        setEnlaceAsignado((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    // Borrar datos del Formulario
    const limpiarFormulario = () => {
        setCronos('');
        setBeneficiario({
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: ''
        });
        setTipoSeleccionadoBeneficiario('');
        setNumeroIdentificacionBeneficiario('');
        setFechaExpedicionBeneficiario('');
        setIdPaisUbicacion("1");
        setIdDepartamentoUbicacion('0');
        setIdMunicipioUbicacion('0');
        setTipoEsquema('');
        setRol('');
        setCorreoElectronico('');
        setTelefonos(['']);
        setVehiculos(vehiculos.map(vehiculo => ({
            placa: '',
            marca: '',
            tipo: '',
            color: ''
        })));
        setFamiliares(familiares.map(familiar => ({
            nombres: {
                primerNombre: '',
                segundoNombre: '',
                primerApellido: '',
                segundoApellido: '',
            },
            parentesco: ''
        })));

        setEnlaceAsignado({
            primerNombre: '',
            segundoNombre: '',
            primerApellido: '',
            segundoApellido: ''
        });
        setTipoSeleccionadoEnlace('');
        setNumeroIdentificacionEnlace('');
        setNumeroIdentificacionEnlace('');
        setTelefonoEnlace('');
        setEnlacePonal('');
        setResolucion('');
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
            beneficiario,
            tipoSeleccionadoBeneficiario,
            numeroIdentificacionBeneficiario,
            fechaExpedicionBeneficiario,
            idPaisUbicacion,
            idDepartamentoUbicacion,
            idMunicipioUbicacion,
            tipoEsquema,
            rol,
            correoElectronico,
            telefonos,
            vehiculos,
            familiares,
            enlaceAsignado,
            tipoSeleccionadoEnlace,
            numeroIdentificacionEnlace,
            fechaExpedicionEnlace,
            telefonoEnlace,
            enlacePonal,
            resolucion
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
            throw new Error(`HTTP error! información: ${response.status}`);
        }
    }

    // Actualizar Datos
    const handleSearch = async (tipoBusqueda: string, valorBuscar: string) => {
        try {
            if (tipoBusqueda === 'identificación' && !valorBuscar) {
                toast.error('Ingrese un número de identificación.');
                return;
            } else if (tipoBusqueda === 'placa' && !valorBuscar) {
                toast.error('Ingrese una placa.');
                return;
            } else if (tipoBusqueda === 'cronos' && !valorBuscar) {
                toast.error('Ingrese el identificador cronos.');
                return;
            } else if (!valorBuscar) {
                toast.error('No se ha definido ningún filtro de busqueda.');
                return;
            }

            /*
                const url = `${process.env.REACT_APP_URL}sistema/datosPolicia/${tipoBusqueda}=${valorBuscar}`;
                const response = await fetch(url);
            */
            const response = await fetch('/data.json');
            console.log(response);
            if (response.ok) {
                setCargando(true);
                toast.success(`Se han encontrado los datos de la ${tipoBusqueda}: ${valorBuscar}`);
                const data = await response.json();
                // Actualizar los estados con los datos obtenidos
                setBeneficiario(data.beneficiario);
                setTipoSeleccionadoBeneficiario(data.tipoSeleccionadoBeneficiario);
                setNumeroIdentificacionBeneficiario(data.numeroIdentificacionBeneficiario);
                setFechaExpedicionBeneficiario(data.fechaExpedicionBeneficiario);

                if (paisSelectRef.current) {
                    paisSelectRef.current.value = data.idPaisUbicacion;
                    paisSelectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
                }
                // Espera a que los departamentos se carguen 
                await new Promise(resolve => setTimeout(resolve, 500));

                if (departamentoSelectRef.current) {
                    departamentoSelectRef.current.value = data.idDepartamentoUbicacion;
                    departamentoSelectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
                }
                /* Bloquear pantalla hasta que cargen departamentos y municipios */
                await new Promise(resolve => setTimeout(resolve, 500));

                if (municipioSelectRef.current) {
                    municipioSelectRef.current.value = data.idMunicipioUbicacion;
                    municipioSelectRef.current.dispatchEvent(new Event('change', { bubbles: true }));
                }
                setIdPaisUbicacion(data.idPaisUbicacion);
                setIdDepartamentoUbicacion(data.idDepartamentoUbicacion);
                setIdMunicipioUbicacion(data.idMunicipioUbicacion);
                setTipoEsquema(data.tipoEsquema);
                setRol(data.rol);
                setCorreoElectronico(data.correoElectronico);
                setTelefonos(data.telefonos);
                setVehiculos(data.vehiculos);
                setFamiliares(data.familiares);
                setEnlaceAsignado(data.enlaceAsignado);
                setTipoSeleccionadoEnlace(data.tipoSeleccionadoEnlace);
                setNumeroIdentificacionEnlace(data.numeroIdentificacionEnlace);
                setFechaExpedicionEnlace(data.fechaExpedicionEnlace);
                setTelefonoEnlace(data.telefonoEnlace);
                setEnlacePonal(data.enlacePonal);
                setResolucion(data.resolucion);

                setCargando(false);
            } else {
                toast.error('Hubo un error al obtener los datos: ' + numeroIdentificacionBeneficiario);
                console.error('Hubo un error al obtener los datos:', response.status);
            }
        } catch (error) {
            toast.error('Hubo un error al obtener los datos: ' + numeroIdentificacionBeneficiario);
            console.error('Hubo un error al obtener los datos:', error);
        }
    };

    return (
        <>
            {cargando && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}
                >
                    <Spinner animation="border" />
                </div>
            )}

            <CardForm
                method={"POST"}
                canEdit={false}
                titulo={"Formulario policia nacional"}
                validated={validarDatos}
                onSubmit={guardarEnApi}
                hasBody={true}>

                <SubtituloForm subtitulo={"Buscar por identifador"} icon={FaDatabase}></SubtituloForm>
                <Row className="mb-4">
                    {/* Identificador Cronos */}
                    <Form.Group as={Col} xs={12} md={6} controlId="cronos">
                        <Form.Label>Cronos</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={cronos}
                                min={0}
                                pattern='\d*'
                                onChange={(e) => setCronos(e.target.value)}
                            />
                            <Button
                                variant="outline-secondary"
                                onClick={() => handleSearch('cronos', cronos)}>
                                <FaSearch />
                            </Button>
                        </InputGroup>
                    </Form.Group>
                </Row>

                <SubtituloForm subtitulo={"Datos del beneficiario"} icon={FaUser}></SubtituloForm>
                <Row className="mb-4">
                    <Row className="mb-2">
                        {/* Campo Primer Nombre */}
                        <Form.Group as={Col} xs={12} md={6} controlId="primerNombre">
                            <Form.Label>Primer Nombre <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={beneficiario.primerNombre}
                                    required
                                    isInvalid={validarDatos && !beneficiario.primerNombre}
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
                    </Row>
                    <Row className="mb-2">
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
                    </Row>
                </Row>

                <SubtituloForm subtitulo={"Número único de identificación personal (NUIP)"} icon={FaAddressCard}></SubtituloForm>
                <Row className="mb-4">
                    {/* Select para el Tipo de identificación */}
                    <Col md={4} xs={12}>
                        <Form.Group>
                            <Form.Label>Tipo de identificación <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                value={tipoSeleccionadoBeneficiario}
                                required
                                onChange={(e) => { setTipoSeleccionadoBeneficiario(e.target.value); }}
                                isInvalid={validarDatos && !tipoSeleccionadoBeneficiario}
                            >
                                <option value="" disabled selected>Seleccione un tipo</option>
                                {tipoIdentificacion.map((tidentificacion) => (
                                    <option key={tidentificacion.id_tidentificacion} value={tidentificacion.id_tidentificacion}>
                                        {tidentificacion.nombre_tidentificacion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Input para el Número de identificación */}
                    <Col md={4} xs={12}>
                        <Form.Group>
                            <Form.Label>Nuip <span className="text-danger">*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={numeroIdentificacionBeneficiario}
                                    onChange={(e) => { handleNumeroIdentificacionChange(e) }}
                                    minLength={6}
                                    maxLength={15}
                                    isInvalid={validarDatos && !numeroIdentificacionBeneficiario}
                                    required
                                />
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => handleSearch('identificación', numeroIdentificacionBeneficiario)}>
                                    <FaSearch />
                                </Button>
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    {/* Input para la Fecha de expedición */}
                    <Col md={4} xs={12}>
                        <Form.Group>
                            <Form.Label>Fecha de expedición</Form.Label>
                            <Form.Control
                                type="date"
                                value={fechaExpedicionBeneficiario}
                                onChange={(e) => { setFechaExpedicionBeneficiario(e.target.value); }}
                                max={new Date().toISOString().split("T")[0]}
                                min={new Date('01-01-1911').toISOString().split("T")[0]}
                                isInvalid={validarDatos && !fechaExpedicionBeneficiario}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <SubtituloForm subtitulo={"Lugar de domicilio"} icon={FaLocationDot}></SubtituloForm>
                <Row className="justify-content-center align-items-center flex-wrap">
                    <Col xs={12} sm={6} md={3} lg={3}>
                        <Pais paisRef={paisSelectRef} idPaisUbicacion={1} onChange={handlePaisChange} isInvalid={validarDatos && !idPaisUbicacion} />
                    </Col>
                    <Col xs={12} sm={6} md={5} lg={5}>
                        <Departamento departamentoRef={departamentoSelectRef} idPais={idPaisUbicacion} onChange={handleDepartamentoChange} isInvalid={validarDatos && !idDepartamentoUbicacion} />
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                        <Municipio municipioRef={municipioSelectRef} idDepartamento={idDepartamentoUbicacion} onChange={handleMunicipioGet} isInvalid={validarDatos && !idMunicipioUbicacion} />
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Form.Group as={Col} xs={12} md={6} className='mb-2 d-none' controlId="tipoEsquema">
                        <Form.Label>Tipo de esquema <span style={{ color: 'red' }}>*</span></Form.Label>
                        <InputGroup>
                            <Form.Select
                                as="select"
                                value={tipoEsquema}
                                disabled
                                onChange={(e) => setTipoEsquema(e.target.value)}
                                isInvalid={validarDatos && !tipoEsquema}
                            >
                                <option value="" disabled selected>Selecciona una Opción</option>
                                <option value="individual" >Individual</option>
                                <option value="colectivo">Colectivo</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} xs={12} md={6} controlId="rol">
                        <Form.Label>Roles <span style={{ color: 'red' }}>*</span></Form.Label>
                        <InputGroup>
                            <Form.Select
                                as="select"
                                value={rol}
                                required
                                onChange={(e) => setRol(e.target.value)}
                                isInvalid={validarDatos && !rol}
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

                <SubtituloForm subtitulo={"Contacto telefónico"} icon={IoCall}></SubtituloForm>
                <Row className="mb-2">
                    {telefonos.map((telefono, index) => (
                        <Form.Group as={Col} xs={12} md={6} className='mb-2' controlId={`telefono-${index}`} key={index}>
                            <Form.Label>
                                Teléfono {index + 1}:
                                {index === 0 && <span style={{ color: 'red' }}>*</span>}
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    pattern="\d{10}"
                                    maxLength={10}
                                    value={telefono}
                                    onChange={(e) => handleTelefonoChange(index, e.target.value)}
                                    required={index === 0}
                                    isInvalid={validarDatos && !telefono}
                                />
                                <Form.Control.Feedback type="invalid">
                                    El número debe tener el formato 312 345 6789.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    ))}
                </Row>

                <Row className="mb-4">
                    <Button className='col-4 mx-auto' variant="secondary" onClick={handleAgregarTelefono}>
                        <FaPlusCircle /> Añadir Teléfono
                    </Button>

                    <Button variant="danger" onClick={() => handleRemoverTelefono(telefonos.length - 1)}
                        disabled={telefonos.length === 1} className='col-4 mx-auto'>
                        <FaTrash /> Eliminar Último Teléfono
                    </Button>
                </Row>

                <SubtituloForm subtitulo={"Contacto vía correo electrónico"} icon={MdEmail}></SubtituloForm>
                <Row className="mb-4">
                    {/* Correo Electrónico */}
                    <Form.Group as={Col} xs={12} md={6} controlId="correoElectronico">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="email"
                                value={correoElectronico}
                                onChange={(e) => setCorreoElectronico(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>

                <SubtituloForm subtitulo={"Vehículos"} icon={FaCarSide}></SubtituloForm>
                <Row className="mb-2">
                    {vehiculos.map((vehiculo, index) => (
                        <Row key={index} className='mb-2'>
                            <Form.Group as={Col} xs={12} md={6} className='mb-2' controlId={`vehiculo-${index}`}>
                                <Form.Label>
                                    Placa {index + 1} {index === 0 && <span style={{ color: 'red' }}>*</span>}
                                </Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        value={vehiculo.placa}
                                        maxLength={6}
                                        onChange={(e) => handleVehiculoChange(index, 'placa', e.target.value)}
                                        required={index === 0}
                                        isInvalid={validarDatos && !validarPlaca(vehiculo.placa) && vehiculo.placa.length > 0}
                                        isValid={validarDatos && validarPlaca(vehiculo.placa)}
                                    />
                                    {index === 0 && (
                                        <>
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => handleSearch('placa', vehiculo.placa)}>
                                                <FaSearch />
                                            </Button>
                                        </>
                                    )}
                                    <Form.Control.Feedback type="invalid">
                                        La placa debe tener el formato ABC123.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} xs={12} md={6} className='mb-2' controlId={`marca-${index}`}>
                                <Form.Label>Marca</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={vehiculo.marca}
                                    onChange={(e) => handleVehiculoChange(index, 'marca', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} xs={12} md={6} className='mb-2' controlId={`tipo-${index}`}>
                                <Form.Label>Tipo de Vehículo</Form.Label>
                                <Form.Select
                                    as="select"
                                    value={vehiculo.tipo}
                                    onChange={(e) => handleVehiculoChange(index, 'tipo', e.target.value)}
                                >
                                    <option value="" disabled selected>Seleccione un tipo</option>
                                    <option value="convencional">Convencional</option>
                                    <option value="blindado">Blindado</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} xs={12} md={6} className='mb-2' controlId={`color-${index}`}>
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={vehiculo.color}
                                    onChange={(e) => handleVehiculoChange(index, 'color', e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    ))}
                </Row>

                <Row className="mb-4">
                    <Button className='col-4 mx-auto' variant="secondary" onClick={handleAgregarVehiculo}>
                        <FaPlusCircle /> Añadir Vehículo
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => handleRemoverVehiculo(vehiculos.length - 1)}
                        disabled={vehiculos.length === 1}
                        className='col-4 mx-auto'>
                        <FaTrash /> Eliminar Último Vehículo
                    </Button>
                </Row>

                <SubtituloForm subtitulo={"Familiares"} icon={MdFamilyRestroom}></SubtituloForm>
                <Row >
                    {familiares.map((familiar, index) => (
                        <Row key={index} className="mb-2">
                            <h5>Familiar {index + 1}</h5>
                            <Col xs={12} md={4} className='mb-2'>
                                <Form.Group controlId={`familiar-${index}-nombre`}>
                                    <Form.Label>Primer Nombre:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={familiar.nombres.primerNombre}
                                        onChange={(e) => handleFamiliarChange(index, 'nombres.primerNombre', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={4} className='mb-2'>
                                <Form.Group controlId={`familiar-${index}-segundoNombre`}>
                                    <Form.Label>Segundo Nombre:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={familiar.nombres.segundoNombre || ''}
                                        onChange={(e) => handleFamiliarChange(index, 'nombres.segundoNombre', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={4} className='mb-2'>
                                <Form.Group controlId={`familiar-${index}-apellido`}>
                                    <Form.Label>Primer Apellido:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={familiar.nombres.primerApellido}
                                        onChange={(e) => handleFamiliarChange(index, 'nombres.primerApellido', e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col xs={12} md={4} className='mb-2'>
                                <Form.Group controlId={`familiar-${index}-segundoApellido`}>
                                    <Form.Label>Segundo Apellido:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={familiar.nombres.segundoApellido || ''}
                                        onChange={(e) => handleFamiliarChange(index, 'nombres.segundoApellido', e.target.value)}
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
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    ))}
                </Row>

                <Row className="mb-4">
                    <Button className="col-4 mx-auto" variant="secondary" onClick={handleAgregarFamiliar}>
                        <FaPlusCircle /> Añadir Familiar
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => handleRemoverFamiliar(familiares.length - 1)}
                        disabled={familiares.length === 0}
                        className="col-4 mx-auto"
                    >
                        <FaTrash /> Eliminar Último Familiar
                    </Button>
                </Row>

                <SubtituloForm subtitulo={"Enlace del esquema"} icon={RiPoliceBadgeFill}></SubtituloForm>
                <Row className="mb-2">
                    <Row className="mb-2">
                        {/* Campo Primer Nombre */}
                        <Form.Group as={Col} xs={12} md={6} controlId="primerNombreEnlace">
                            <Form.Label>Primer Nombre <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={enlaceAsignado.primerNombre}
                                    required
                                    isInvalid={validarDatos && !enlaceAsignado.primerNombre}
                                    onChange={(e) => handleEnlaceChange('primerNombre', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {/* Campo Segundo Nombre */}
                        <Form.Group as={Col} xs={12} md={6} controlId="segundoNombreEnlace">
                            <Form.Label>Segundo Nombre</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={enlaceAsignado.segundoNombre}
                                    onChange={(e) => handleEnlaceChange('segundoNombre', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        {/* Campo Primer Apellido */}
                        <Form.Group as={Col} xs={12} md={6} controlId="primerApellidoEnlace">
                            <Form.Label>Primer Apellido <span style={{ color: 'red' }}>*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={enlaceAsignado.primerApellido}
                                    required
                                    isInvalid={validarDatos && !enlaceAsignado.primerApellido}
                                    onChange={(e) => handleEnlaceChange('primerApellido', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {/* Campo Segundo Apellido */}
                        <Form.Group as={Col} xs={12} md={6} controlId="segundoApellidoEnlace">
                            <Form.Label>Segundo Apellido</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={enlaceAsignado.segundoApellido}
                                    onChange={(e) => handleEnlaceChange('segundoApellido', e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                </Row>

                <SubtituloForm subtitulo={"Número único de identificación personal (NUIP) - Enlace"} icon={FaAddressCard}></SubtituloForm>
                <Row className="mb-4">
                    {/* Select para el Tipo de identificación */}
                    <Col md={4} xs={12}>
                        <Form.Group>
                            <Form.Label>Tipo de identificación <span className="text-danger">*</span></Form.Label>
                            <Form.Select
                                value={tipoSeleccionadoEnlace}
                                required
                                onChange={(e) => { setTipoSeleccionadoEnlace(e.target.value); }}
                                isInvalid={validarDatos && !tipoSeleccionadoEnlace}
                            >
                                <option value="" disabled selected>Seleccione un tipo</option>
                                {tipoIdentificacion.map((tidentificacion) => (
                                    <option key={tidentificacion.id_tidentificacion} value={tidentificacion.id_tidentificacion}>
                                        {tidentificacion.nombre_tidentificacion}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    {/* Input para el Número de identificación */}
                    <Col md={4} xs={12}>
                        <Form.Group>
                            <Form.Label>Nuip <span className="text-danger">*</span></Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    value={numeroIdentificacionEnlace}
                                    onChange={(e) => { handleNumeroIdentificacionEnlaceChange(e) }}
                                    minLength={6}
                                    maxLength={15}
                                    isInvalid={validarDatos && !numeroIdentificacionEnlace}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Este campo es obligatorio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    {/* Input para la Fecha de expedición */}
                    <Col md={4} xs={12}>
                        <Form.Group>
                            <Form.Label>Fecha de expedición</Form.Label>
                            <Form.Control
                                type="date"
                                value={fechaExpedicionEnlace}
                                onChange={(e) => { setFechaExpedicionEnlace(e.target.value); }}
                                max={new Date().toISOString().split("T")[0]}
                                min={new Date('01-01-1911').toISOString().split("T")[0]}
                                isInvalid={validarDatos && !fechaExpedicionEnlace}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <SubtituloForm subtitulo={"Contacto telefónico"} icon={IoCall}></SubtituloForm>
                <Row className="mb-4">
                    <Form.Group as={Col} xs={12} md={6} className='mb-2' controlId="telefonoEnlace">
                        <Form.Label>Teléfono: </Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                pattern="\d{10}"
                                maxLength={10}
                                value={telefonoEnlace}
                                onChange={(e) => setTelefonoEnlace(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>


                <Row className="mb-4">
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
                <Row className='mb-2'>
                    <Form.Group as={Col} xs={12} md={12} controlId="resolucion">
                        <Form.Label>Resolución <span style={{ color: 'red' }}>*</span></Form.Label>
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                value={resolucion}
                                required
                                onChange={(e) => setResolucion(e.target.value)}
                                maxLength={5000}
                                isInvalid={validarDatos && !resolucion}
                            />
                            <Form.Control.Feedback type="invalid">
                                Este campo es obligatorio.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
            </CardForm>
        </>
    )
};
export default FormPonal;