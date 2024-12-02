import { BootstrapTable, CardForm, SubtituloForm, VentanaLienzo } from 'eco-unp/ui';
import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, Col, Row, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Ubicacion } from '../Components/componentesTablas/Ubicacion';
import { DatosPersona } from '../Components/modalsPolicia/DatosPersona';
import { Vehiculos } from '../Components/modalsPolicia/Vehiculos';

const FormPonal: React.FC = () => {
    const [data, setData] = useState<any[]>([]);

    // consultar datos
    useEffect(() => {
        const obtenerDatosPolicia = async () => {
            try {
                const response = await fetch('/datos.json');

                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    toast.error('Hubo un error al obtener los datos.');
                    console.log(response.status);
                }
            } catch (error) {
                toast.error('Hubo un error al obtener los datos.');
                console.log(error);
            }
        };
        obtenerDatosPolicia();
    }, []);

    const columnas = [
        { key: 'cronos', label: 'Cronos', hasModal: false },
        { key: "datos_beneficiario", label: "Beneficiario", hasModal: true },
        { key: "departamento", label: "Departamento", hasModal: false },
        { key: "municipio", label: "Municipio", hasModal: false },
        { key: "rol", label: "Rol", hasModal: false },
        { 
            key: "datos_vehiculo", label: "Vehículos", hasModal: true },
        {
            key: "enlaceAsignado",
            label: "Enlace",
            renderComponent: (row: any) =>
                <div>
                    <p><strong>Nombre: </strong> {row.enlaceAsignado.primerNombre} {row.enlaceAsignado.primerApellido}</p>
                    <p><strong>Teléfono: </strong> {row.telefonoEnlace} </p>
                </div>,
            hasModal: false
        },
        { key: "resolucion", label: "Resolución", hasModal: false },
    ];

    const renderModalContent = (row: Record<string, any>, column: any) => {
        switch (column.key) {
            case "datos_beneficiario":
                const { primerNombre, segundoNombre, primerApellido, segundoApellido } = row.beneficiario || {};
                return ( <DatosPersona primerNombre={primerNombre} segundoNombre={segundoNombre} primerApellido={primerApellido} segundoApellido={segundoApellido} numeroIdentificacion={row.numeroIdentificacionBeneficiario} /> );
            case "datos_vehiculo":
                return ( <Vehiculos datosVehiculo={row.vehiculos}></Vehiculos> );
            default:
                return <p>No hay información adicional disponible.</p>
        }
    };
    return (
        <VentanaLienzo>
            <BootstrapTable
                columns={columnas}
                data={data}
                renderModalContent={renderModalContent}
                totalDias={30}
                subtitle={"Datos de Beneficiarios"}
                items={""}
            />
        </VentanaLienzo>
    )
};
export default FormPonal;