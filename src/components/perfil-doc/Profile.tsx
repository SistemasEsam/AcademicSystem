import React, { useEffect, useState } from "react";
import "./Profile.css";
import { ImageUpload } from "../upload/Uploadimages";
import AddProfileSection from "./AddProfileSection";

// Tipos basados en la estructura proporcionada
interface Education {
  carrera?: string;
  nombre?: string;
  universidad: string;
  pais: string;
  anio?: string;
  modalidad?: string;
  tipo?: string;
}

interface Docente {
  idDocente: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  ciudadRadicacion: string;
  telefono: string;
  pregrado: Array<Education>;
  postgrado: Array<Education>;
}

interface DocenteInfoProps {
  idDocente: number;
}

export const DocenteInfo: React.FC<DocenteInfoProps> = ({ idDocente }) => {
  const [docente, setDocente] = useState<Docente | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"pregrado" | "postgrado" | "">("");

  const handleAddSectionClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSaveInfo = (newInfo: Education) => {
    if (!selectedType) {
      alert("Tipo de educación no seleccionado");
      return;
    }

    setDocente((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [selectedType]: [...prev[selectedType], newInfo] };
      return updated;
    });
    setIsModalOpen(false);
  };

  const mapDocenteData = (data: any): Docente => {
    return {
      idDocente: data.idDocente,
      nombres: data.nombres.trim(),
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      correo: data.correo,
      ciudadRadicacion: data.ciudadRadicacion,
      telefono: data.telefono,
      
      pregrado: [
        {
          carrera: data.carrera,
          universidad: data.universidad,
          pais: data.nombre, // suponiendo que "nombre" representa el país
          anio: data.fecha?.split("-")[0], // Obtener el año de la fecha
          modalidad: "Presencial", // Ajustar según tus datos reales
        },
      ],
      postgrado: [
        {
          carrera: data.carrera,
          universidad: data.universidad,
          pais: data.nombre,
          anio: data.fecha?.split("-")[0],
          modalidad: "Virtual", // Ajustar según tus datos reales
          tipo: data.tipo,
        },
      ],
    };
  };

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const response = await fetch(`http://localhost:4321/api/docentes/${idDocente}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del docente");
        }
        const data = await response.json();
        setDocente(mapDocenteData(data));
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchDocente();
  }, [idDocente]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!docente) {
    return <p>Cargando información del docente...</p>;
  }

  return (
    <div className="profile-container">
      <div className="background-polygon">
      </div>
      <div className="profile-content">
        <div className="profile-photo">
          <ImageUpload
            containerClass="profile-image-container"
            labelClass="profile-image-label"
            avatarClass="profile-avatar"
            buttonClass="custom-upload-button"
            iconClass="custom-upload-icon"
            onImageSelect={(file) =>
              console.log(file ? `Imagen seleccionada: ${file.name}` : "No se seleccionó ninguna imagen.")
            }
          />
        </div>
        <div className="profile-info">
          <h1 className="h1-pro">
            {docente.nombres} {docente.apellidoPaterno} {docente.apellidoMaterno}
          </h1>
          <p>
            <strong>Correo:</strong> {docente.correo}
          </p>
          <p>
            <strong>Ciudad:</strong> {docente.ciudadRadicacion}
          </p>
          <p>
            <strong>Teléfono:</strong> {docente.telefono}
          </p>
        
        </div>

        <div className="education-section">
          <h2>Pregrado</h2>
          {docente.pregrado.length > 0 ? (
            docente.pregrado.map((edu, index) => (
              <div key={index} className="education-item">
                <p>
                  <strong>Carrera:</strong> {edu.carrera}
                </p>
                <p>
                  <strong>Universidad:</strong> {edu.universidad}
                </p>
                <p>
                  <strong>País:</strong> {edu.pais}
                </p>
                <p>
                  <strong>Año:</strong> {edu.anio}
                </p>
              </div>
            ))
          ) : (
            <p>No hay información de pregrado disponible.</p>
          )}

          <h2>Postgrado</h2>
          {docente.postgrado.length > 0 ? (
            docente.postgrado.map((edu, index) => (
              <div key={index} className="education-item">
                <p>
                  <strong>Carrera:</strong> {edu.carrera}
                </p>
                <p>
                  <strong>Universidad:</strong> {edu.universidad}
                </p>
                <p>
                  <strong>País:</strong> {edu.pais}
                </p>
                <p>
                  <strong>Año:</strong> {edu.anio}
                </p>
                <p>
                  <strong>Tipo:</strong> {edu.tipo}
                </p>
              </div>
            ))
          ) : (
            <p>No hay información de postgrado disponible.</p>
          )}
        </div>
      </div>

      <button className="add-button" onClick={handleAddSectionClick}>
        Agregar Sección
      </button>

      <AddProfileSection
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedType={selectedType}
        onSaveInfo={handleSaveInfo}
      />
    </div>
  );
};
