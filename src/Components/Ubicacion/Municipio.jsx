import React, { useState, useEffect } from 'react';

// Elementos de Bootstrap
import { FormGroup, FormLabel, FormSelect, FormControl } from 'react-bootstrap';

const Municipio = ({ idDepartamento, onChange, municipioRef, isInvalid }) => {
  const [municipios, setMunicipios] = useState([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState('0');


  useEffect(() => {

    if (!idDepartamento) {
      return;
    }

    const obtenerMunicipio = async () => {
      try {
        const urlMunicipio = process.env.REACT_APP_URL + 'sistema/municipio/?departamento=';
        const url = `${urlMunicipio}${idDepartamento}`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setMunicipios(data);
          setMunicipioSeleccionado('0')
        } else {
          console.error('Hubo un error al obtener los datos de los municipios:', response.status);
        }
      } catch (error) {
        console.error('Hubo un error al obtener los datos de los municipios:', error);
      }
    };

    obtenerMunicipio();
  }, [idDepartamento]);

  const handleMunicipioChange = (event) => {
    setMunicipioSeleccionado(event.target.value);
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
      <FormLabel>Municipio / Ciudad  <span className="text-danger">*</span></FormLabel>
      <FormSelect
        as="select"
        ref={municipioRef}
        required
        isInvalid={isInvalid}
        value={idDepartamento != 0 ? municipioSeleccionado : 0}
        onChange={handleMunicipioChange}
        disabled={idDepartamento == 0 ? true : false}
        style={idDepartamento == 0 ? selectDisabledStyle : {}}
      >
        <option value="" selected style={{ color: 'darkgray' }}>Seleccione...</option>
        {municipios.map((municipio) => (
          <option key={municipio.id_municipio} value={municipio.id_municipio}>
            {municipio.nombre_municipio}
          </option>
        ))}
      </FormSelect>
      <FormControl.Feedback type="invalid">
        Este campo es requerido
      </FormControl.Feedback>
    </FormGroup>

  );
}

export { Municipio }
