import React, { useEffect, useState } from 'react';

interface UbicacionProps {
    tipoBusqueda: string;
    id: string;
}

export const Ubicacion: React.FC<UbicacionProps> = ({ tipoBusqueda, id }) => {
    const [valor, setValor] = useState('');

    useEffect(() => {
        const fetchUbicacion = async () => {
            try {
                const url = `${process.env.REACT_APP_URL}sistema/${tipoBusqueda}/${id}/`;
                const response = await fetch(url);

                if (response.ok) { 
                    const data = await response.json();

                    if(tipoBusqueda === "departamento"){
                        setValor(data.nombre_departamento);
                    } else {
                        setValor(data.nombre_municipio);
                    }

                    
                } else { 
                    console.log("Error al buscar ubicación.");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUbicacion();
    }, [tipoBusqueda, id]);

    return (
        <>{valor}</>
    );
};