import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InicioSesion } from "eco-unp/ui";
import LineaVida from "./Panel/LineaVida";
 
const App = () => {
 
 
  return (
    <Router>
        <Routes>
          <Route path="/" element={<InicioSesion />} />  
          <Route path="sg/gga/linea-vida" element={<LineaVida />} />
        </Routes>
    </Router>
  );
};
 
export default App;