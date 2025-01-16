import React, { useState } from "react";
import { Modal } from "../util/modale";
import { UploadFile } from "./UploadFile";

export const ProfileUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("");

  const handleOpenModal = (section) => {
    setCurrentSection(section);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSection("");
  };

  // Estilos generales
  const styles = {
    container: { 
      marginTop: "20px", 
      width: "95%", 
      marginLeft: "10px",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxHeight: "600px", 
    overflowY: "auto", 
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#002f6c",
      textAlign: "center",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontSize: "23px",
      fontWeight: "bold",
      color: "#444",
      marginBottom: "10px",
    },
    paragraph: {
      margin: "5px 0",
      color: "#555",
      fontWeight: "bold",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Archivos Docente</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={styles.sectionTitle}>Información Personal</h2>
        <p style={styles.paragraph}>Carnet:</p>
        <button style={styles.button} onClick={() => handleOpenModal("carnet")}>
          Subir Carnet
        </button>
        <p style={styles.paragraph}>Titulo en provisión nacional:</p>
        <button
          style={styles.button}
          onClick={() => handleOpenModal("tituloProvisionN")}
        >
          Subir Titulo Provisión Nacional
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={styles.sectionTitle}>Certificados</h2>
        <button
          style={styles.button}
          onClick={() => handleOpenModal("certificados")}
        >
          Subir Certificado
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={styles.sectionTitle}>Diplomados</h2>
        <button
          style={styles.button}
          onClick={() => handleOpenModal("diplomados")}
        >
          Subir Diplomado
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={styles.sectionTitle}>Maestrías</h2>
        <button
          style={styles.button}
          onClick={() => handleOpenModal("maestrias")}
        >
          Subir Maestría
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={styles.sectionTitle}>Doctorados</h2>
        <button
          style={styles.button}
          onClick={() => handleOpenModal("doctorados")}
        >
          Subir Doctorado
        </button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={`Subir ${currentSection}`}>
          <UploadFile tipoArchivo={currentSection} />
        </Modal>
      )}
    </div>
  );
};
