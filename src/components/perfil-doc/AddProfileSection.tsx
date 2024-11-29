import React, { useState } from "react";
import { Modal } from "../util/Modale";
import "./AddProfileSection.css";
import EducationForm from "../formdoc/EducationForm";
import { DegreeForm } from "../formdoc/DegreeForm";
import { PostDegreeForm } from "../formdoc/PostDegreeForm";

const AddProfileSection = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeStep, setActiveStep] = useState<string>("options");

  const formOptions: { [key: string]: React.ReactNode } = {
    postgrado: (
      <EducationForm
        title="Formación de Postgrado"
        FormComponent={PostDegreeForm}
      />
    ),
    pregrado: (
      <EducationForm title="Formación de Pregrado" FormComponent={DegreeForm} />
    ),
  };

  const handleOptionClick = (option: string) => setActiveStep(option);
  const goBack = () => setActiveStep("options");
  const handleSave = () => {
    alert("Formulario guardado con éxito.");
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
                {option === "postgrado" && "Agregar Postgrado"}
                {option === "pregrado" && "Agregar Pregrado"}
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
