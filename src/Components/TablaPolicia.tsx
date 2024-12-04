import { BootstrapTable, VentanaLienzo } from 'eco-unp/ui';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
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
                    

                    // por cada elemento agregar No. vehiculos, nombre departamento y nombre municipio
                    for (let item of data) {
                        // Agregar un campo de solo nombre y apellido del beneficiario
                        item.nombreBeneficiario = `${item.beneficiario.primerNombre} ${item.beneficiario.primerApellido}`;

                        // Agregar Numero de vehiculos
                        item.numeroVehiculos = item.vehiculos.length;

                        // Agregar un campo de solo nombre y apellido del enlace
                        item.nombreEnlace = `${item.enlaceAsignado.primerNombre} ${item.enlaceAsignado.primerApellido}`;
                        /*
                        const idDepartamento = item.idDepartamentoUbicacion;
                        const idMunicipio = item.idMunicipioUbicacion;
                        
                        // Fetch para obtener Departamento
                        const responseDepartamento = await fetch(`${process.env.REACT_APP_URL}sistema/departamento/${idDepartamento}/`);
                        if (responseDepartamento.ok) {
                            const dataDepartamento = await responseDepartamento.json();
                            // Agrega nombre departamento al item
                            item.nombreDepartamento = dataDepartamento.nombre_departamento;
                        } else {
                            toast.error('Error al obtener el nombre del departamento');
                        }
                    
                        // Fetch para obtener Municipio
                        const responseMunicipio = await fetch(`${process.env.REACT_APP_URL}sistema/municipio/${idMunicipio}/`);
                        if (responseMunicipio.ok) {
                            const dataMunicipio = await responseMunicipio.json();
                            // Agrega nombre municipio al item
                            item.nombreMunicipio = dataMunicipio.nombre_municipio;
                        } else {
                            toast.error('Error al obtener el nombre del municipio');
                        }*/
                    }

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
        { key: "nombreBeneficiario", label: "Beneficiario", hasModal: false },
        { key: "numeroIdentificacionBeneficiario", label: "Nuip", hasModal: false },
        { key: "nombreDepartamento", label: "Departamento", hasModal: false },
        { key: "nombreMunicipio", label: "Municipio", hasModal: false },
        { key: "rol", label: "Rol", hasModal: false },
        {
            key: "numeroVehiculos",
            label: "No. vehículos",
            hasModal: true
        },
        { key: "nombreEnlace", label: "Enlace", hasModal: false },
        { key: "telefonoEnlace", label: "Teléfono", hasModal: false },
        { key: "resolucion", label: "Resolución", hasModal: false },
    ];

    const renderModalContent = (row: Record<string, any>, column: any) => {
        switch (column.key) {
            case "datosBeneficiario":
                const { primerNombre, segundoNombre, primerApellido, segundoApellido } = row.beneficiario || {};
                return (<DatosPersona primerNombre={primerNombre} segundoNombre={segundoNombre} primerApellido={primerApellido} segundoApellido={segundoApellido} numeroIdentificacion={row.numeroIdentificacionBeneficiario} />);
            case "numeroVehiculos":
                return (<Vehiculos datosVehiculo={row.vehiculos}></Vehiculos>);
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