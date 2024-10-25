import React from "react";
import '../../styles/postulantesCV.css'

export const PostulanteInfo = ({ postulante }) => {
  return (
    <div className="container">
      <div className="left-column">
        <div className="profile-pic">
          <img src="/images/Amed.jpg" />
        </div>
        <h2>{postulante.nombre}</h2>
        <p> {postulante.email}</p>
        <p> {postulante.documento}</p>
        <p> {postulante.telefono}</p>
      </div>

      <div className="right-column">
      <h2>Estudios Pregrado</h2>
        {postulante.pregrado && postulante.pregrado.length > 0 && (
          <ul>
            {postulante.pregrado.map((pregrado, index) => (
              <li key={index}>
                <p><strong>Carrera:</strong> {pregrado.carrera}</p>
                <p><strong>Universidad:</strong> {pregrado.universidad}</p>
                <p><strong>País:</strong> {pregrado.pais}</p>
                <p><strong>Año:</strong> {pregrado.anio}</p>
                <p><strong>Modalidad:</strong> {pregrado.modalidad}</p>
              </li>
            ))}
          </ul>
        )}
        
        <h2>Estudios Postgrado</h2>
        {postulante.postgrado && postulante.postgrado.length > 0 && (
          <ul>
            {postulante.postgrado.map((postgrado, index) => (
              <li key={index}>
                <p><strong>Nombre:</strong> {postgrado.nombre}</p>
                <p><strong>Universidad:</strong> {postgrado.universidad}</p>
                <p><strong>País:</strong> {postgrado.pais}</p>
                <p><strong>Año:</strong> {postgrado.anio}</p>
                <p><strong>Modalidad:</strong> {postgrado.modalidad}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
