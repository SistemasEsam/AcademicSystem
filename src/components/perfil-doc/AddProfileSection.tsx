import React, { useState } from "react";
import {Modal} from "../util/Modale";
import "./AddProfileSection.css";
import EducationForm from "../formdoc/EducationForm";
import {Step8Form  } from "../formdoc/steps/Step8Form";
import { DegreeForm} from "../formdoc/DegreeForm";
import {PostDegreeForm} from "../formdoc/PostDegreeForm";
import { Step1Form } from "../formdoc/steps/Step1Form";
import { Step2Form } from "../formdoc/steps/Step2Form";
import IntellectualProductionFormList from '../formdoc/steps/Step5Form'
import  WorkExperienceFormList  from "../formdoc/steps/Step6Form";
import WorkExperience from "../formdoc/steps/Step7Form";


const AddProfileSection = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeStep, setActiveStep] = useState<string>("options");

  const formOptions: { [key: string]: React.ReactNode } = {

    informacion: <Step1Form/>,
    diplomado: <Step2Form/>,
    postgrado: (
      <EducationForm title="Formación de Postgrado" FormComponent={PostDegreeForm} />
    ),
    pregrado: (
      <EducationForm title="Formación de Pregrado" FormComponent={DegreeForm} />
    ),
    publi:<IntellectualProductionFormList/>,
    work:<WorkExperienceFormList/>,
    workd:<WorkExperience/>,
    skills: <Step8Form />,

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
                {option === "informacion" && "Agregar mas Informacion"}
                {option === "diplomado" && "Agregar diplomado"}
                {option === "postgrado" && "Agregar Postgrado"}
                {option === "pregrado" && "Agregar Pregrado"}
                {option === "publi" && "Agregar publicacion"} 
                {option === "work" && "Agrega Informacion laboral"}
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
