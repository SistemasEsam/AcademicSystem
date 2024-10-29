// src/components/EducationForm.tsx
import React, { useState } from 'react';
import DegreeForm from './DegreeForm';

interface EducationFormProps {
  title: string; // Nuevo prop para el título
}

const EducationForm: React.FC<EducationFormProps> = ({ title }) => {
  const [degreeForms, setDegreeForms] = useState<number[]>([0]);

  const addDegreeForm = () => {
    setDegreeForms([...degreeForms, degreeForms.length]);
  };

  const deleteDegreeForm = (index: number) => {
    setDegreeForms(degreeForms.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>{title}</h1> {/* Usar el título pasado como prop */}
      {degreeForms.map((_, index) => (
        <DegreeForm
          key={index}
          index={index}
          onDelete={() => deleteDegreeForm(index)}
        />
      ))}
      <button onClick={addDegreeForm}>Agregar Formación</button>
    </div>
  );
};

export default EducationForm;
