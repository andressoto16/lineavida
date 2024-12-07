import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PaginaNoEncontrada, PaginaNoPermitida } from "eco-unp/ui";
import LineaVida from "./Panel/SespApi";
import { ProtectedRoute, UserRoute } from "eco-unp/utils";
import UsoApiSesp from "./Components/usoApiSesp";
 
const App = () => {
 
 
  return (
    <Router>
        <Routes>

          <Route element={<ProtectedRoute />} >
            <Route path="sesp/gps/api" element={<LineaVida />} />
            <Route path="sesp/gps/uso-api" element={<UsoApiSesp />} />
          </Route>
          
          <Route element={<UserRoute />} >
            <Route path="/sistema/pagina-no-permitida" element={<PaginaNoPermitida />} />
          </Route>

          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
    </Router>
  );
};
 
export default App;