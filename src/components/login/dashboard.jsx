import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";  // Asegúrate de tener esta dependencia instalada

export const Dashboard = () => {
  const [docenteNombre, setDocenteNombre] = useState(null);
  const [docenteApellidoPaterno, setDocenteApellidoPaterno] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirigir al login si no hay token
      window.location.href = "/login";
      return;
    }

    try {
      // Decodificar el token para obtener los datos del usuario
      const decodedToken = jwt_decode(token);
      const nombre = decodedToken.nombre;
      const apellidoPaterno = decodedToken.apellidoPaterno;

      // Almacenar los datos en el localStorage para otros componentes
      localStorage.setItem("docenteNombre", nombre);
      localStorage.setItem("docenteApellidoPaterno", apellidoPaterno);

      setDocenteNombre(nombre);
      setDocenteApellidoPaterno(apellidoPaterno);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("docenteNombre");
    localStorage.removeItem("docenteApellidoPaterno");
    window.location.href = "/login";
  };

  return (
    <div>
      
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};
