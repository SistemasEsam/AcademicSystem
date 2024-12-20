import React, { useState } from "react";
import { ScheduleMeeting } from "./ScheduleMeeting";


export function ScheduleMeetingButton({ telefono, email,idDocente }) {
  const [showScheduler, setShowScheduler] = useState(false);

  const handleOpenModal = () => {
    setShowScheduler(true); // Abre explícitamente el modal
  };

  const handleCloseModal = () => {
    setShowScheduler(false); // Asegura que el modal pueda cerrarse correctamente
  };

  return (
    <div className="schedule-meeting">
      <button
        className="v-btn v-btn--slim v-theme--light"
        onClick={handleOpenModal} // Abre el modal manualmente
      >
        Agendar Reunión
      </button>
      {showScheduler && (
        <ScheduleMeeting
          telefono={telefono}
          email={email}
          idDocente={idDocente} 
          setShowScheduler={handleCloseModal}
        />
      )}
    </div>
  );
}

