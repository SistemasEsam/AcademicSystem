import React, { useState } from 'react';
import InputRegistroList from "../docentes/Formulario1";
import Form2 from "./form2";
import EducationForm from "../../components/formdoc/EducationForm";
import CourseFormList from "../../components/formdoc/CourseForm";
import IntellectualProductionFormList from "../../components/formdoc/IntellectualForm";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <InputRegistroList />,
    <Form2 />,
    <EducationForm title="FORMACIÓN DE PREGRADO" />,
    <EducationForm title="FORMACIÓN DE POSTGRADO" />,
    <CourseFormList />,
    <IntellectualProductionFormList />,
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
          <button onClick={() => alert('Formulario enviado!')}>Enviar</button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
