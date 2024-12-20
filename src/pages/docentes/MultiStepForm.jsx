import { useState } from "react";
import InputRegistroList from "./Formulario1";
import Form2 from "./form2";
import EducationForm from "../../components/formdoc/EducationForm";
import CourseFormList from "../../components/formdoc/CourseForm";
import IntellectualProductionFormList from "../../components/formdoc/IntellectualForm";
import {PostDegreeForm} from "../../components/formdoc/PostDegreeForm";
import WorkExperienceFormList from "./WorkExperienceFormList";
import {DegreeForm} from "../../components/formdoc/DegreeForm";
import WorkDocentExper from "./WorkDocentExper";
import SoftSkillsAndLanguages from "./HabilidadIdioma";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <InputRegistroList />,
    <Form2 />,
    <EducationForm title="Formación Pregrado" FormComponent={DegreeForm} />,
    <EducationForm
      title="Formación de Postgrado"
      FormComponent={PostDegreeForm}
    />,
    <CourseFormList />,
    <IntellectualProductionFormList />,
    <WorkExperienceFormList />,
    <WorkDocentExper />,
    <SoftSkillsAndLanguages />,
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      {steps[currentStep]}
      <div>
        {currentStep > 0 && <button onClick={prevStep}>Atrás</button>}
        {currentStep < steps.length - 1 ? (
          <button onClick={nextStep}>Guardar</button>
        ) : (
          <button onClick={() => alert("Formulario enviado!")}>Enviar</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
