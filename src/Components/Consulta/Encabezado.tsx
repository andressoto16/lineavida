import React from "react";

interface EncabezadoProps {
  dependencia: String;
}

const titleStyle = {
  borderLeft: "10px solid",
  borderLeftColor: "#d13c47",
  height: "90px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  height: "80px",
  marginLeft: "20px",
  marginRight: "25px",
  alignSelf: "center",
};

const Encabezado: React.FC<EncabezadoProps> = ({ dependencia }) => {
  return (
    <div style={titleStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <img src="https://i.imgur.com/MYXJbgg.png" style={logoStyle} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <h3 style={{ margin: "0px 0px 7px 0px", fontWeight: "700" }}>
            Unidad Nacional de Protección
          </h3>
          <h5 style={{ margin: "0px 0px 7px 0px", color: "#6b6b6b" }}>
            {dependencia}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Encabezado;
