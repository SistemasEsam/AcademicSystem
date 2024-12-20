import React, { useState, useEffect } from "react";
import { Modal } from "../util/Modale";
import "../perfil-doc/syles/AddProfileSection.css";
import EducationForm from "../formdoc/EducationForm";
import { PostDegreeForm } from "../formdoc/PostDegreeForm";
import { DegreeForm } from "../formdoc/DegreeForm";
import {Step1Form}  from "../formdoc/steps/Step1Form";
import { Step2Form } from "../formdoc/steps/Step2Form";
import IntellectualProductionFormList from "../formdoc/steps/Step5Form";
import WorkExperienceFormList from "../formdoc/steps/Step6Form";
import WorkExperience from "../formdoc/steps/Step7Form";
import { Step8Form } from "../formdoc/steps/Step8Form";

const AddProfileSection = ({
  isOpen,
  onClose,
  selectedType, // Recibimos el tipo seleccionado
  onSaveInfo, // Recibimos la función para guardar la información
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedType: "pregrado" | "postgrado" | ""; // Tipo seleccionado
  onSaveInfo: (newInfo: any) => void; // Función para guardar la nueva información
}) => {
  const [activeStep, setActiveStep] = useState<string>("options");

  useEffect(() => {
    if (selectedType) {
      // Si el tipo seleccionado es pregrado o postgrado, cambiamos el paso activo
      setActiveStep(selectedType);
    }
  }, [selectedType]);

  const formOptions: { [key: string]: React.ReactNode } = {
    informacion: <Step1Form />,
    diplomado: <Step2Form />,
    postgrado: (
      <EducationForm title="Formación de Postgrado" FormComponent={PostDegreeForm} />
    ),
    pregrado: (
      <EducationForm title="Formación de Pregrado" FormComponent={DegreeForm} />
    ),
    publi: <IntellectualProductionFormList />,
    work: <WorkExperienceFormList />,
    workd: <WorkExperience />,
    skills: <Step8Form />,
  };

  const handleOptionClick = (option: string) => setActiveStep(option);
  const goBack = () => setActiveStep("options");
  const handleSave = () => {
    alert("Formulario guardado con éxito.");
    onSaveInfo({}); // Aquí deberías pasar la información que se ha guardado
    goBack();
  };

  

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Perfil">
      {activeStep === "options" ? (
        <div>
          <h3>¿Qué quieres agregar?</h3>
          <ul>
            {Object.keys(formOptions).map((option) => (
              <li key={option} onClick={() => handleOptionClick(option)}>
                {option === "informacion" && "Agregar más Información"}
                {option === "diplomado" && "Agregar diplomado"}
                {option === "postgrado" && "Agregar Postgrado"}
                {option === "pregrado" && "Agregar Pregrado"}
                {option === "publi" && "Agregar publicación"}
                {option === "work" && "Agregar Información laboral"}
                {option === "skills" && "Agregar Habilidades"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {formOptions[activeStep] || <p>No hay un formulario seleccionado.</p>}
          <button className="back-button" onClick={goBack}>
            Atrás
          </button>
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>
        </div>
      )}
    </Modal>
  );
};

export default AddProfileSection;
