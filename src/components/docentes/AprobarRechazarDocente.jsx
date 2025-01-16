import React, { useState } from 'react';
import { Modal } from '../util/modale'; 
import "../../styles/postulantes.css";

export const AprobarRechazarDocente = ({ postulanteId, documentoUrl, telefono }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState("");

  const handleAction = (actionType) => {
    setAction(actionType);
    setIsModalOpen(true); 
  };

  const handleConfirm = async () => {
    try {
      // Actualizar el estado del docente (aprobado o rechazado)
      const response = await fetch("/api/docentes/updateEstadoDocente", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDocente: postulanteId,
          estado: action.toLowerCase(),
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(`El docente ha sido ${action === "rechazado" ? "rechazado" : "aprobado"} exitosamente.`);

        // Si la acción es "aprobado", enviar mensaje de WhatsApp y correo
        if (action === "aprobado") {
          // 1. Enviar mensaje de WhatsApp
          const mensajeWhatsApp = `Es para ESAM una satisfacción su integración al plantel docente, usted ha sido ${action === "aprobado" ? "aprobado" : "rechazado"}. Para completar su proceso de incorporación, remita los documentos requeridos del siguiente enlace : ${documentoUrl}`;
          const linkWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensajeWhatsApp)}`;
          window.open(linkWhatsApp, "_blank");

          // 2. Enviar correo con enlace de descarga del documento
          await fetch("http://localhost:3001/send-email-docente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action, 
              documentoUrl,
              postulanteId, 
            }),
          });
        }
      } else {
        alert(`Hubo un problema al actualizar el estado del docente: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar el estado del docente:", error);
      alert("No se pudo procesar la solicitud. Intenta nuevamente.");
    } finally {
      setIsModalOpen(false); 
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="buttonsCont">
      <button
        className="approve-button custom-button"
        onClick={() => handleAction("aprobado")}
      >
        <div className="icon-circle">
          <img src="/images/iconos/check.png" alt="Aprobar" className="icon-button" />
        </div>
        <span className="button-text">Aprobar</span>
      </button>

      <button
        className="reject-button custom-button"
        onClick={() => handleAction("rechazado")}
      >
        <div className="icon-circle">
          <img src="/images/iconos/rechazar.png" alt="Rechazar" className="icon-button" />
        </div>
        <span className="button-text">Rechazar</span>
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCancel} title="Confirmación de acción">
        <p>¿Estás seguro de {action === "aprobado" ? "aprobar" : "rechazar"} este docente?</p>
        <div className="modal-buttons">
          <button onClick={handleConfirm} className="v-btn">Aceptar</button>
          <button onClick={handleCancel} className="v-btn cancel-btn">Cancelar</button>
        </div>
      </Modal>
    </div>
  );
};
