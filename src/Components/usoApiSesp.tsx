import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Encabezado from './Encabezado';
import { VentanaLienzo } from 'eco-unp/ui';

const UsoApiSesp: React.FC = () => {

    const data = [
        {
            serial: "SESP-00000",
            cedulaAnonima: "XXXXXX789",
            departamento: "DEPARTAMENTO",
            ciudad: "MUNICIPIO / CIUDAD",
            nivel_riesgo: "RIESGO",
            telefonoAnonimo: "XXXXXX0000"
        }
    ];

    return (
        <VentanaLienzo>
            <Row className='mt-4 mb-4 ms-0'>
                <Encabezado dependencia={'Subdirección Especializada de Seguridad y Protección (SESP)'} />
            </Row>

            <Row className='justify-content-star'>
                <Col xs={12} md={10} lg={8} className='mb-5'>
                    <h3>Propósito</h3>
                    <p> La API de la Subdirección Especializada de Seguridad y Protección (API-SESP) ha sido creada para proporcionar
                        un acceso seguro y confiable a la información de solicitantes, evaluados y beneficiarios. Esto se logra mediante
                        la anonimización de datos sensibles y personales, siguiendo las Políticas de Seguridad de la Información y
                        Protección de Datos Personales de la Entidad. Gracias a la API-SESP, las personas inscritas en la UNP pueden
                        consultar y filtrar datos por número de cédula u otros criterios de búsqueda, ofreciendo así una herramienta
                        eficiente para la gestión de la información y los datos.
                    </p>
                    <h3>Endpoints disponibles</h3>
                    <p className='mt-3'>1. Consulta por Número único de identificación personal (Nuip)</p>
                    <p className='mx-3'>
                        <b>• Endpoint: </b>
                        <code style={{ color: 'black', fontSize: '0.9rem', backgroundColor: 'lightgray' }}>https://formulariopruebas.unp.gov.co/api-django/lineavida/?cedula=[ nuip o cedula ]</code>.
                    </p>
                    <p className='mx-3'>
                        <b>• Descripción: </b>
                        Permite consultar la información de una persona específica utilizando su número de cédula.
                    </p>
                    <p className='mx-3'>
                        <b>• Parámetro: </b>
                        <code style={{ color: 'black', fontSize: '0.9rem', backgroundColor: 'lightgray' }}>cedula</code> (requerido) - El número de cédula de la persona.
                    </p>
                    <p className='mx-3'>
                        <b>• Ejemplo de URL: </b>
                        <code style={{ color: 'black', fontSize: '0.9rem', backgroundColor: 'lightgray' }}>https://formulariopruebas.unp.gov.co/api-django/lineavida/?cedula=123456789</code>
                    </p>
                    <p className='mt-3'>2. Consultar por Celular</p>
                    <p className='mx-3'>
                        <b>• Endpoint: </b>
                        <code style={{ color: 'black', fontSize: '0.9rem', backgroundColor: 'lightgray' }}>https://formulariopruebas.unp.gov.co/api-django/lineavida/?telefono_contacto=[ celular o teléfono ]</code>.
                    </p>
                    <p className='mx-3'>
                        <b>• Descripción: </b>
                        Permite consultar la información de una persona específica utilizando su número de celular.
                    </p>
                    <p className='mx-3'>
                        <b>• Parámetro: </b>
                        <code style={{ color: 'black', fontSize: '0.9rem', backgroundColor: 'lightgray' }}>telefono_contacto</code> (requerido) - El número de celular de la persona.
                    </p>
                    <p className='mx-3'>
                        <b>• Ejemplo de URL: </b>
                        <code style={{ color: 'black', fontSize: '0.9rem', backgroundColor: 'lightgray' }}>https://formulariopruebas.unp.gov.co/api-django/lineavida/?telefono_contacto=3013010000</code>
                    </p>
                    <h3>Respuesta de la API</h3>
                    <p>La respuesta de la API estará en formato JSON e incluirá los siguientes campos:</p>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                    <h3>Contacto</h3>
                    <p>Para cualquier consulta adicional o asistencia técnica, por favor contacte al equipo de soporte técnico en ecosistema@unp.gov.co.</p>
                </Col>
            </Row>

        </VentanaLienzo>
    );
};

export default UsoApiSesp;
