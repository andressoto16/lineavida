import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InicioSesion, PaginaNoEncontrada, PaginaNoPermitida } from "eco-unp/ui";
import LineaVida from "./Panel/SespApi";
import { ProtectedRoote } from "eco-unp/utils";
import UsoApiSesp from "./Components/usoApiSesp";
 
const App = () => {
 
 
  return (
    <Router>
        <Routes>
          {/* <Route path="/" element={<InicioSesion />} />  */}

          {/* <Route element={<ProtectedRoote />}> */}
            <Route path="sesp/gps/api-sesp" element={<LineaVida />} />
          {/* </Route> */}
          <Route path="sesp/gps/uso-api-sesp" element={<UsoApiSesp />} />
          <Route path="/sistema/pagina-no-permitida" element={<PaginaNoPermitida />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
    </Router>
  );
};
 
export default App;