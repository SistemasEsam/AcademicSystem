import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "../../util/modale";

export function ScheduleMeeting({
  telefono,
  email,
  idDocente,
  fechaInicial = null,
  linkInicial = "",
  setShowScheduler,
  isUpdate = false,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [zoomLink, setZoomLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fechaInicial) {
      setSelectedDate(new Date(fechaInicial));
    }
    if (linkInicial) {
      setZoomLink(linkInicial);
    }
  }, [fechaInicial, linkInicial]);
  const handleDateChange = (date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    setSelectedDate(localDate);
  };
  
    // Formatea la fecha al formato MySQL 'YYYY-MM-DD HH:MM:SS' en la zona horaria local
    const formatDateForMySQL = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedDate || !zoomLink) {
      alert("Por favor selecciona una fecha y hora e ingresa el enlace de Zoom.");
      return;
    }
    const fechaFormateada = formatDateForMySQL(selectedDate);
    
  
    // Mantener el formato de fecha y hora para WhatsApp y correo (sin modificar la variable fecha y hora)
    const fecha = selectedDate.toLocaleDateString(); // 'YYYY-MM-DD' (o el formato que prefieras)
    const hora = selectedDate.toLocaleTimeString();
  
    try {
      setLoading(true); // Inicia el estado de carga
     // **1. Realizar la solicitud al backend para actualizar/agendar**
     const requestData = {
      idDocente,
      fecha: fechaFormateada,
      linkZoom: zoomLink,
    };

    const endpoint = isUpdate
      ? "/api/docentes/agendas/updateReunion"
      : "/api/docentes/agendas/insert_agendas";

    const response = await fetch(endpoint, {
      method: isUpdate ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json", // Usamos JSON en lugar de FormData
      },
      body: JSON.stringify(requestData), // Convertimos el objeto a JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Detalles del error:", errorData);
      throw new Error("No se pudo completar la solicitud. Intenta nuevamente.");
    }
      
  
      // **2. Enviar mensaje por WhatsApp**
      const mensajeWhatsApp = `Estimado/a docente,después de apreciar su desarrollo formativo y su experiencia profesional, usted ha sido seleccionado a una entrevista para completar la evaluación de selección, dicha entrevista se realizará por Zoom de 20 a 25 minutos. ${
        isUpdate ? "Queda reprogramada" : "Queda agendada"
      } para el ${fecha} a las ${hora}. Enlace de Zoom: ${zoomLink}`;
      const linkWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;
      window.open(linkWhatsApp, "_blank");
  
      // **3. Enviar correo electrónico**
      const emailResponse = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fecha, hora, zoomLink }),
      });
  
      if (!emailResponse.ok) {
        const errorData = await emailResponse.json();
        throw new Error(errorData.message || "No se pudo enviar el correo electrónico");
      }
  
      // **4. Actualizar el estado "agendado" en la base de datos**
      if (!isUpdate) {
        const updateResponse = await fetch(
          "http://localhost:4321/api/docentes/updateAgendado",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idDocente,
              agendado: 1,
            }),
          }
        );
  
        if (!updateResponse.ok) {
          const errorData = await updateResponse.json();
          throw new Error(errorData.error || "No se pudo actualizar el estado de agendado.");
        }
      }
  
      alert("Reunión procesada correctamente.");
      setShowScheduler(false); // Cierra el modal después de procesar
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };
  

  const handleClose = () => {
    setShowScheduler(false); // Cerrar el modal
  };

  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      title={fechaInicial ? "Reprogramar Reunión" : "Agendar Reunión"}
    >
      <div className="schedule-meeting-container">
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="v-btn"
                disabled={loading}
              >
                {loading
                  ? "Procesando..."
                  : fechaInicial
                  ? "Reprogramar Reunión"
                  : "Agendar Reunión"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="v-btn cancel-btn"
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
