import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ListGroup } from 'react-bootstrap';

interface Vehiculo { 
    placa: string; 
    marca: string; 
    tipo: string; 
    color: string; 
} 

interface VehiculosProps { 
    datosVehiculo: Vehiculo[];
}

export const Vehiculos: React.FC<VehiculosProps> = ({ datosVehiculo }) => {
    return ( 
        <ListGroup> 
            {datosVehiculo.map((vehiculo, index) => ( 
                <ListGroup.Item key={index}> 
                    <p><strong>Placa:</strong> {vehiculo.placa}</p> 
                    <p><strong>Marca:</strong> {vehiculo.marca}</p> 
                    <p><strong>Tipo:</strong> {vehiculo.tipo}</p> 
                    <p><strong>Color:</strong> {vehiculo.color}</p> 
                </ListGroup.Item> 
            ))} 
        </ListGroup>
    );
};
