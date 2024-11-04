import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InicioSesion, PaginaNoEncontrada, PaginaNoPermitida } from "eco-unp/ui";
import LineaVida from "./Panel/LineaVida";
import { ProtectedRoote } from "eco-unp/utils";
 
const App = () => {
 
 
  return (
    <Router>
        <Routes>
          <Route path="/" element={<InicioSesion />} /> 

          <Route element={<ProtectedRoote />}>
            <Route path="oaj/gdj/bandeja-recurso-reposicion" element={<LineaVida />} />
          </Route>

          <Route path="/sistema/pagina-no-permitida" element={<PaginaNoPermitida />} />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
    </Router>
  );
};
 
export default App;