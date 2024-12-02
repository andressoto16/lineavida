import React, { useState, useEffect } from 'react';

// Elementos de Bootstrap
import { FormGroup, FormLabel, FormSelect, FormControl } from 'react-bootstrap';

const Pais = ({ idPaisUbicacion, onChange, paisRef, isInvalid }) => {
  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('0');

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL + 'sistema/pais/');
        if (response.ok) {
          const data = await response.json();
          if (idPaisUbicacion) {
            const paisFiltrado = data.find(pais => pais.id_pais === idPaisUbicacion);
            setPaises(paisFiltrado ? [paisFiltrado] : []);
          } else {
            setPaises(data);
          }
        } else {
          console.error('Hubo un error al obtener los datos de los países:', response.status);
        }
      } catch (error) {

        console.error('Hubo un error al obtener los datos de los países:', error);
      }
    };

    obtenerPaises();
  }, [idPaisUbicacion]);

  const handlePaisChange = (event) => {
    setPaisSeleccionado(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <FormGroup className="mb-3">
      <FormLabel>País <span className="text-danger">*</span></FormLabel>
      <FormSelect
        as="select"
        ref={paisRef}
        value={paisSeleccionado}
        onChange={handlePaisChange}
        isInvalid={isInvalid}
        required
      >
        <option value="" disabled selected>Seleccione...</option>
        {paises.map((pais) => (
          <option key={pais.id_pais} value={pais.id_pais}>
            {pais.nombre_pais}
          </option>
        ))}
      </FormSelect>
      <FormControl.Feedback type="invalid">
        Este campo es requerido
      </FormControl.Feedback>
    </FormGroup>
  );
};

export { Pais };
