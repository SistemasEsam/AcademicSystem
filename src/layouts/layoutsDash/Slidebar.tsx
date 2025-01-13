import React, { useState, useEffect } from "react";
import "./slidebar.css";

const Slidebar: React.FC = () => {
    const [docenteNombre, setDocenteNombre] = useState<string | null>(null);
    const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState<string | null>(null);
    const [visibleSection, setVisibleSection] = useState<string>("main");
  
    const handleNavigation = (section: string) => {
      setVisibleSection(section);
    };
  
    useEffect(() => {
      // Recuperar datos del localStorage
      const nombre = localStorage.getItem("docenteNombre");
      const apellidoPaterno = localStorage.getItem("docenteApellidoPaterno");
  
      if (nombre && apellidoPaterno) {
        setDocenteNombre(nombre);
        setDocenteApellidoPaterno(apellidoPaterno);
      }
    }, []); // Este efecto se ejecuta solo al montar el componente
  
    return (
      <>
        <div>
          <input type="checkbox" className="menu__checkbox" id="sideview-crawl" />
          <div className="side-view">
            <nav className="admin-view__menu">
              <div className="admin-view__header">
                <h3 className="company-name">
                  <span>Dashboard Docente</span>
                </h3>
                <div className="menu-icon">
                  <label htmlFor="sideview-crawl" className="menu-bar">
                    <svg>
                      <use xlinkHref="./icons.svg#icon-menu"></use>
                    </svg>
                  </label>
                </div>
              </div>
              <div className="user-profile">
                <h3 className="admin-name">
                  <span id="docenteNombre">
                    {docenteNombre && docenteApellidoPaterno
                      ? `${docenteNombre} ${docenteApellidoPaterno}`
                      : "Cargando..."}
                  </span>
                </h3>
              </div>
              <ul className="side-nav">
                <li
                  className={
                    visibleSection === "main" ? "side-nav__active" : ""
                  }
                  onClick={() => handleNavigation("main")}
                >
                  <a href="/dashboard">
                    <span>Perfil</span>
                  </a>
                </li>
                <li
                  className={
                    visibleSection === "products" ? "side-nav__active" : ""
                  }
                  onClick={() => handleNavigation("products")}
                >
                  <a href="#">
                    <span>Postulaciones Disponibles</span>
                  </a>
                </li>
                <li
                  className={
                    visibleSection === "users" ? "side-nav__active" : ""
                  }
                  onClick={() => handleNavigation("users")}
                >
                  <a href="#">
                    <span>Mis postulaciones</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  };
  
  export default Slidebar;