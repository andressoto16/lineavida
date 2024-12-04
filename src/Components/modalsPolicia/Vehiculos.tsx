import { Accordion, ListGroup } from 'react-bootstrap';

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
        <Accordion>
            {datosVehiculo.map((vehiculo, index) => (
                <Accordion.Item eventKey={`${index}`} key={index}>
                    <Accordion.Header>Placa: {vehiculo.placa}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className="text-start">
                                <p className="mb-0"><strong>Marca: </strong>{vehiculo.marca}</p>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-start">
                                <p className="mb-0"><strong>Tipo: </strong>{vehiculo.tipo}</p>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-start">
                                <p className="mb-0"><strong>Color: </strong>{vehiculo.color}</p>
                            </ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>

    );
};
