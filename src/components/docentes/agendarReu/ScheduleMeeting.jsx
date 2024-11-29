import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "../../util/modale";

export function ScheduleMeeting({
  telefono,
  email,
  fechaInicial = null,
  linkInicial = "",
  setShowScheduler, // Función pasada desde el padre
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [zoomLink, setZoomLink] = useState("");

  useEffect(() => {
    // Solo inicializa si se proveen valores
    if (fechaInicial) {
      setSelectedDate(new Date(fechaInicial));
    }
    if (linkInicial) {
      setZoomLink(linkInicial);
    }
  }, [fechaInicial, linkInicial]);

  const handleScheduleMeeting = async () => {
    if (selectedDate && zoomLink) {
      const fecha = selectedDate.toLocaleDateString();
      const hora = selectedDate.toLocaleTimeString();

      const mensajeWhatsApp = `Estimado/a docente, después de apreciar su desarrollo formativo y su experiencia profesional, usted ha sido seleccionado a una entrevista para completar la evaluación de selección, dicha entrevista se realizará por Zoom de 20 a 25 minutos. Queda ${fechaInicial ? "reprogramada" : "agendada"} para la fecha ${fecha} a las ${hora}. Enlace de Zoom: ${zoomLink}`;
      const linkWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;
      window.open(linkWhatsApp, "_blank");

      try {
        const response = await fetch("http://localhost:3001/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fecha, hora, zoomLink }),
        });

        if (response.ok) {
          alert("Correo enviado correctamente");
        } else {
          const errorData = await response.json();
          alert(errorData.message || "No se pudo enviar el correo electrónico");
        }
      } catch (error) {
        console.error("Error al enviar correo:", error);
        alert("No se pudo enviar el correo electrónico");
      }

      setShowScheduler(false); // Cerrar modal después de agendar
    } else {
      alert("Por favor selecciona una fecha y hora e ingresa el enlace de Zoom.");
    }
  };
  const handleClose = () => {
    setShowScheduler(false); // Asegura que el modal se cierre correctamente
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title={fechaInicial ? "Reprogramar Reunión" : "Agendar Reunión"}
    >
      <div className="schedule-meeting-container">
      <div className="modal-body">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="Pp"
          placeholderText="Selecciona fecha y hora"
        />
        <input
          type="text"
          value={zoomLink}
          onChange={(e) => setZoomLink(e.target.value)}
          placeholder="Ingresa el enlace de Zoom"
          className="zoom-input"
        />
        <div className="modal-buttons">
          <button onClick={handleScheduleMeeting} className="v-btn">
            {fechaInicial ? "Reprogramar Reunión" : "Agendar Reunión"}
          </button>
          <button
            onClick={handleClose}
            className="v-btn cancel-btn"
          >
            Cancelar
          </button>
        </div>
      </div>
      </div>
     
    </Modal>
  );
}
