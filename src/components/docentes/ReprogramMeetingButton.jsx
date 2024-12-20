import React, { useState } from "react";
import { ScheduleMeeting } from "./agendarReu/ScheduleMeeting";

export function ReprogramMeetingButton({ telefono, email, fecha, link, idDocente }) {
  const [showScheduler, setShowScheduler] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Agregado para manejar errores

  const handleCloseScheduler = () => {
    setShowScheduler(false); // Cierra el modal
  };

  const handleReprogramarClick = () => {
    setShowScheduler(true); // Abre el modal al hacer clic
  };

  return (
    <div className="schedule-meeting">
      {/* Verifica si hay error o está en carga */}
      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Botón de "Reprogramar Reunión" */}
      <button
        className="v-btn v-btn--slim v-theme--light"
        onClick={handleReprogramarClick}
        disabled={isLoading} // Deshabilitar si está en carga
      >
        Reprogramar Reunión
      </button>

      {/* Mostrar modal de ScheduleMeeting cuando sea necesario */}
      {showScheduler && (
        <ScheduleMeeting
          telefono={telefono}
          email={email}
          fechaInicial={fecha} // Prellenado
          linkInicial={link} // Prellenado
          setShowScheduler={handleCloseScheduler}
          idDocente={idDocente}
          isUpdate={true} // Indica que es una reprogramación
        />
      )}
    </div>
  );
}
