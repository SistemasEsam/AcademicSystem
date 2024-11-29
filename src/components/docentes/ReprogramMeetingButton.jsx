import React, { useState } from "react";
import { ScheduleMeeting } from "./agendarReu/ScheduleMeeting";
import { ScheduleMeetingButton } from "./agendarReu/ScheduleMeetingButton";

export function ReprogramMeetingButton({ telefono, email, fecha, link }) {
  const [showScheduler, setShowScheduler] = useState(false);

  const handleCloseScheduler = () => {
    setShowScheduler(false); // Cierra el modal cuando se llama esta función
  };

  return (
    <div className="schedule-meeting">
      <button
        className="v-btn v-btn--slim v-theme--light"
        onClick={() => setShowScheduler(true)} // Abre el modal al hacer clic
      >
        Reprogramar Reunión
      </button>
      {showScheduler && (
        <ScheduleMeeting
          telefono={telefono}
          email={email}
          fechaInicial={fecha} // Prellenado
          linkInicial={link} // Prellenado
          setShowScheduler={handleCloseScheduler} // Función para cerrar el modal
        />
      )}
    </div>
  );
}
