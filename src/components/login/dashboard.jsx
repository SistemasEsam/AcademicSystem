import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const [docenteNombre, setDocenteNombre] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Redirigir al login si no hay token
      window.location.href = "/login";
      return;
    }

    try {
      // Decodificar el token y obtener el nombre
      const decodedToken = jwt_decode(token);
      console.log("Token decodificado:", decodedToken); // Verifica el contenido del token
      setDocenteNombre(decodedToken.nombre);
       // Usa el campo 'nombre'
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      setError("Hubo un error al procesar la autenticación.");
      window.location.href = "/login";
    }
    
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {docenteNombre ? (
        <div>Hola, {docenteNombre}!</div> // Mostrar el nombre del docente
      ) : (
        <div>Cargando...</div>
      )}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;
