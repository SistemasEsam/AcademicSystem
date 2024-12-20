import React, { useEffect, useState } from "react";

import { ImageUpload } from "../upload/Uploadimages";
import PersonalInfo from "./PersonalInfo";
import EducationSection from "./EducationSection";
import AddProfileSection from "./AddProfileSection";


// Tipos basados en la estructura proporcionada
interface Education {
    carrera?: string;
    nombre?: string;
    universidad: string;
    pais: string;
    anio: string;
    modalidad: string;
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
  estado: string;
  pregrado: Array<Education>;
  postgrado: Array<Education>;
}

interface DocenteInfoProps {
  idDocente: number;
}

export const DocenteInfo: React.FC<DocenteInfoProps> = ({ idDocente }) => {
  const [docente, setDocente] = useState<Docente | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal
  const [selectedType, setSelectedType] = useState<"pregrado" | "postgrado" | "">("");
  const handleAddSectionClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddInfo = (type: "pregrado" | "postgrado") => {
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const handleSaveInfo = (newInfo: Education) => {
    if (!selectedType) {
      alert("Tipo de educación no seleccionado");
      return;
    }
    // Aquí deberías manejar cómo se guarda la nueva sección de educación (pregrado/postgrado)
    setIsModalOpen(false);
  };

  const handleImageSelect = (file: File | null) => {
    console.log(file ? `Imagen seleccionada: ${file.name}` : "No se seleccionó ninguna imagen.");
  };

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const response = await fetch(`http://localhost:4321/api/docentes/${idDocente}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del docente");
        }
        const data: Docente = await response.json();
        setDocente(data);
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
      <div className="background-polygon"></div>
      <div className="profile-content">
        <div className="profile-photo">
          <ImageUpload
            containerClass="profile-image-container"
            labelClass="profile-image-label"
            avatarClass="profile-avatar"
            buttonClass="custom-upload-button"
            iconClass="custom-upload-icon"
            onImageSelect={handleImageSelect}
          />
        </div>
        <div className="profile-info">
      <h1>{docente.nombres} {docente.apellidoPaterno} {docente.apellidoMaterno}</h1>
      <p><strong>Correo:</strong> {docente.correo}</p>
      <p><strong>Ciudad:</strong> {docente.ciudadRadicacion}</p>
      <p><strong>Teléfono:</strong> {docente.telefono}</p>
      <p><strong>Estado:</strong> {docente.estado}</p>
    </div>
    </div>

   
<EducationSection
  title="Pregrado"
  data={docente.pregrado}
  type="pregrado"
  isEditing={false}
  handleNestedInputChange={() => {}}
/>
<EducationSection
  title="Postgrado"
  data={docente.postgrado}
  type="postgrado"
  isEditing={false}
  handleNestedInputChange={() => {}}
/>

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

