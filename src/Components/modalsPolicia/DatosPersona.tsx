interface DatosBeneficiarioProps { 
    primerNombre: string; 
    segundoNombre: string; 
    primerApellido: string; 
    segundoApellido: string; 
    numeroIdentificacion: string;
}

export const DatosPersona: React.FC<DatosBeneficiarioProps> = ({ primerNombre, segundoNombre, primerApellido, segundoApellido, numeroIdentificacion }) => {
    return (
        <div>
            <p>Nombre Completo: {`${primerNombre} ${segundoNombre} ${primerApellido} ${segundoApellido}`}</p> 
            <p>Identificación: {numeroIdentificacion}</p>
        </div>
    );
};