import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";  


export const AcademicoDashboard = () => {
  const [idDocente, setidDocente] = useState(null);
  const [idRol, setidRol] = useState(null);
  const [docenteNombre, setDocenteNombre] = useState(null);
  const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idRol = localStorage.getItem("idRol");
    if (!token || idRol==4 ) {
      // Redirigir al login si no hay token
      window.location.href = "/login";
      return;
    }

    try {
      // Decodificar el token para obtener los datos del usuario
      const decodedToken = jwt_decode(token);
      const idDocente = decodedToken.idDocente;
      const nombre = decodedToken.nombre;
      const apellidoPaterno = decodedToken.apellidoPaterno;
      const idRol=decodedToken.idRol;

      // Almacenar los datos en el localStorage para otros componentes
      localStorage.setItem("idDocente", idDocente);
      localStorage.setItem("docenteNombre", nombre);
      localStorage.setItem("docenteApellidoPaterno", apellidoPaterno);
      localStorage.setItem("idRol", idRol);
      setidDocente(idDocente);
      setDocenteNombre(nombre);
      setDocenteApellidoPaterno(apellidoPaterno);
      setidRol(idRol);
      
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      window.location.href = "/login";
    }
  }, []);

};
