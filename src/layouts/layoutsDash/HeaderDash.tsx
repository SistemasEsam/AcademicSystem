import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import "./HeaderDash.css"; 


interface DecodedToken {
  idDocente: string;
  nombre: string;
  apellidoPaterno: string;
}

export const HeaderDash: React.FC = () => {
  const [idDocente, setidDocente] = useState<string | null>(null);
  const [docenteNombre, setDocenteNombre] = useState<string | null>(null);
  const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirigir al login si no hay token
      window.location.href = "/login";
      return;
    }

    try {
      // Decodificar el token para obtener los datos del usuario
      const decodedToken = jwt_decode<DecodedToken>(token);
      const { idDocente, nombre, apellidoPaterno } = decodedToken;

      // Almacenar los datos en el localStorage para otros componentes
      localStorage.setItem("idDocente", idDocente);
      localStorage.setItem("docenteNombre", nombre);
      localStorage.setItem("docenteApellidoPaterno", apellidoPaterno);

      setidDocente(idDocente);
      setDocenteNombre(nombre);
      setDocenteApellidoPaterno(apellidoPaterno);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idDocente");
    localStorage.removeItem("docenteNombre");
    localStorage.removeItem("docenteApellidoPaterno");
    window.location.href = "/login";
  };

  return (
    <> 
    <header>
    <a id="logoEsam" href="/dashboard"> </a>
    <h1 id="titulo-head" >Docente Plataform</h1>
    
    <a id="logoEsamMobile" href="/dashboard">
      <h1 id="tituloMobile">Docente Plataform</h1>
    </a>

    <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
  </header>
  <div className="barraAmarilla"></div>
     </>
  
  )
}

export default HeaderDash