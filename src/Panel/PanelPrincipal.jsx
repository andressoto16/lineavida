import React, { useState, useEffect, useRef } from "react";
import { Container, Tabs, Row, Col, Tab, Button } from "react-bootstrap";
import { MenuLateral } from "../Titulos/MenuLateral";
import '../Styles/Bootstrap.css';
import { NotificacionUsuario } from "../Titulos/NotificacionUsuario";
import { FaEye } from "react-icons/fa";

const PanelPrincipal = () => {
  // Estado para los diferentes controles}

  const [menuOpen, setMenuOpen] = useState(false);
  const [key, setKey] = useState('solicitudes');



  // Función para alternar el estado del menú lateral
    const handleToggle = () => {
        setMenuOpen(!menuOpen);
    };


        return (
            <React.Fragment>
              <MenuLateral onToggle={handleToggle} isOpen={menuOpen} />
        
              <div className={`${menuOpen ? 'menu-open' : ''}`}>
                <div className="main-section">
                  <div className="position-absolute top-0 end-0 m-3">
                    <NotificacionUsuario />
                  </div>
                </div>
              </div>

            </React.Fragment>
          );
        }

export { PanelPrincipal };
