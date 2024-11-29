import React from 'react';
import Swal from 'sweetalert2';
import { updateDocenteStatus } from '../../api/infoDocentes';
import "../../styles/postulantes.css";

export const AprobarRechazarDocente = ({ postulanteId }) => {
  const handleAction = (action) => {
    Swal.fire({
      title: `¿Estás seguro de ${action === "APROBADO" ? "aprobar" : "rechazar"} este docente?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // Llamar a la función para actualizar el estado en la API interna
        updateDocenteStatus(postulanteId, action);  // Aquí actualizamos el estado en la API

        Swal.fire(
          "Hecho",
          `El docente ha sido ${action === "APROBADO" ? "aprobado" : "rechazado"} exitosamente.`,
          "success"
        );
      }
    });
  };

  return (
    <div className="buttonsCont">
      <button
        className="approve-button custom-button"
        onClick={() => handleAction("APROBADO")}
      >
        <div className="icon-circle">
          <img src="/images/iconos/check.png" alt="Aprobar" className="icon-button" />
        </div>
        <span className="button-text">Aprobar</span>
      </button>

      <button
        className="reject-button custom-button"
        onClick={() => handleAction("RECHAZADO")}
      >
        <div className="icon-circle">
          <img src="/images/iconos/rechazar.png" alt="Rechazar" className="icon-button" />
        </div>
        <span className="button-text">Rechazar</span>
      </button>
    </div>
  );


};
