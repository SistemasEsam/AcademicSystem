import React, { useEffect, useState } from "react";
import { infoDocentes } from "../../api/infoDocentes";
import "./Profile.css";
import { ImageUpload } from "../../components/upload/Uploadimages";
import PersonalInfo from "./PersonalInfo";
import EducationSection from "./EducationSection";
import AddProfileSection from "./AddProfileSection";


const Profile = () => {
  const [docente, setDocente] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar la visibilidad del modal
  const [selectedType, setSelectedType] = useState(""); // Tipo seleccionado, ya sea pregrado o postgrado

  useEffect(() => {
    const foundDocente = infoDocentes.find((doc) => doc.id === 5);
    setDocente(foundDocente);
  }, []);

  const handleAddSectionClick = () => {
    setIsModalOpen(true); // Abrir el modal cuando el botón es presionado
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  const handleAddInfo = (type) => {
    setSelectedType(type);
    setIsModalOpen(true); // Abre el modal con la opción de agregar información
  };

  const handleSaveInfo = (newInfo) => {
    setDocente((prevDocente) => ({
      ...prevDocente,
      [selectedType]: [...prevDocente[selectedType], newInfo], // Actualiza los datos de pregrado o postgrado
    }));
    setIsModalOpen(false); // Cierra el modal después de guardar la información
  };

  if (!docente) {
    return <p>El perfil no está disponible.</p>;
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
  />
</div>
    <div className="profile-info">
      <h1>{docente.nombre}</h1>
      <p>{docente.email}</p>
    </div>
  </div>

      {/* Información Personal */}
      <PersonalInfo docente={docente} />
      {/* Sección de Educación: Pregrado y Postgrado */}
      <EducationSection title="Pregrado" data={docente.pregrado} type="pregrado" />
      <EducationSection title="Postgrado" data={docente.postgrado} type="postgrado" />
      {/* Botón para agregar una nueva sección */}  
        <button className="add-button" onClick={handleAddSectionClick}>
          Agregar Sección
        </button>
      {/* Modal para agregar nueva sección (Pregrado o Postgrado) */}
      <AddProfileSection
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddInfo={handleAddInfo}
        onSaveInfo={handleSaveInfo}
      />
    </div>
  );
};

export default Profile;
