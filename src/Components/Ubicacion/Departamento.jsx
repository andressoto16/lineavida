import React, { useState, useEffect } from 'react';

// Elementos de Bootstrap
import { FormGroup, FormLabel, FormSelect, FormControl } from 'react-bootstrap';

const Departamento = ({ idPais, onChange, departamentoRef, isInvalid }) => {
  const [departamentos, setDepartamentos] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('0');

  useEffect(() => {
    if (!idPais) {
      return;
    }

    const obtenerDepartamentos = async () => {
      try {
        const urlDepartamento = process.env.REACT_APP_URL + 'sistema/departamento/?pais=';
        const url = `${urlDepartamento}${idPais}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setDepartamentos(data);
          setDepartamentoSeleccionado('0')
        } else {
          console.error('Hubo un error al obtener los datos de los departamentos:', response.status);
        }
      } catch (error) {
        console.error('Hubo un error al obtener los datos de los departamentos:', error);
      }
    };

    obtenerDepartamentos();
  }, [idPais]);

  const handleDepartamentoChange = (event) => {
    setDepartamentoSeleccionado(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const selectDisabledStyle = {
    backgroundColor: 'white',
    color: 'black',
  };

  return (
    <FormGroup className="mb-3">
      <FormLabel>Departamento <span className="text-danger">*</span></FormLabel>
      <FormSelect
        as="select"
        ref={departamentoRef}
        required
        isInvalid={isInvalid}
        value={departamentoSeleccionado}
        onChange={handleDepartamentoChange}
        disabled={idPais == 0 ? true : false}
        style={idPais == 0 ? selectDisabledStyle : {}}
      >

        <option value="" style={{ color: 'darkgray' }}>Seleccione...</option>
        {departamentos.map((departamento) => (
          <option key={departamento.id_departamento} value={departamento.id_departamento}>
            {departamento.nombre_departamento}
          </option>
        ))}
      </FormSelect>
      <FormControl.Feedback type="invalid">
        Este campo es requerido
      </FormControl.Feedback>
    </FormGroup>
  );
}

export { Departamento }