import React, { useState, useEffect } from "react";
import "./slidebar.css";

const Slidebar: React.FC = () => {
  const [docenteNombre, setDocenteNombre] = useState<string | null>(null);
  const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState<string | null>(null);

  useEffect(() => {
    // Recuperar datos del localStorage
    const nombre = localStorage.getItem("docenteNombre");
    const apellidoPaterno = localStorage.getItem("docenteApellidoPaterno");

    if (nombre && apellidoPaterno) {
      setDocenteNombre(nombre);
      setDocenteApellidoPaterno(apellidoPaterno);
    }
  }, []);

  return (
    <div className="slidebar">
      <div className="welcome-section">
        <h3 className="admin-name">
          Bienvenido,{" "}
          <span id="docenteNombre">
            {docenteNombre && docenteApellidoPaterno
              ? `${docenteNombre} ${docenteApellidoPaterno}`
              : "Cargando..."}
          </span>
        </h3>
      </div>
      <ul className="menu">
        
        <li className="menu-item">Perfil</li>
        <li className="menu-item">Configuración</li>
        <li className="menu-item">subir archivos</li>
        
      </ul>
    </div>
  );
};

export default Slidebar;