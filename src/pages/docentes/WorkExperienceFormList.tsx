// WorkExperienceFormList.tsx
import React, { useState } from 'react';

// Componente para un formulario individual de experiencia laboral
interface WorkExperienceFormProps {
  index: number;
  onDelete: () => void;
  isDisabled: boolean;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ index, onDelete, isDisabled }) => {
  const [isCurrentJob, setIsCurrentJob] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCurrentJobToggle = () => {
    setIsCurrentJob(!isCurrentJob);
    if (!isCurrentJob) {
      setEndDate(''); // Limpiar la fecha de fin si es trabajo actual
    }
  };

  return (
    <div className="work-experience-form">
      
      <h1 style={{ color: 'black' }}>Experiencia Laboral</h1>
      <h3>Experiencia Laboral últimos 3 años {index + 1}</h3>
      <p>
        Llene el formulario con los cargos más relevantes ocupados.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y verifica la ortografía.
      </p>
      
      <input type="text" placeholder="Nombre de Empresa o Institución" required disabled={isDisabled} />
      <input type="text" placeholder="Cargo" required disabled={isDisabled} />
      <input type="text" placeholder="País" required disabled={isDisabled} />
      
      <label>Fecha de inicio:</label>
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
        required 
        disabled={isDisabled} 
      />

      {!isCurrentJob && (
        <>
          <label>Fecha de fin:</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
            required 
            disabled={isDisabled} 
          />
        </>
      )}

      <button 
        type="button" 
        onClick={handleCurrentJobToggle} 
        disabled={isDisabled}
      >
        {isCurrentJob ? "Trabajo Actual (Desmarcar)" : "Trabajo Actual"}
      </button>

      <input type="text" placeholder="Descripcion de funciones realizadas" required disabled={isDisabled} />
      <h1>Referencias</h1>
      <input type="text" placeholder="Nombre" required disabled={isDisabled} />
      <input type="text" placeholder="Apellidos" required disabled={isDisabled} />
      <input type="text" placeholder="Cargo de Inmediato Superior" required disabled={isDisabled} />
      <input type="number" placeholder="Número de contacto" required disabled={isDisabled} /> 
      <button 
        type="button" 
        onClick={onDelete} 
        disabled={isDisabled}
      >
        Eliminar
      </button>
    </div>
  );
};

// Componente que maneja la lista de formularios de experiencias laborales
const WorkExperienceFormList: React.FC = () => {
  const [courseForms, setCourseForms] = useState<number[]>([0]);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const addCourseForm = () => {
    setCourseForms([...courseForms, courseForms.length]);
  };

  const deleteCourseForm = (index: number) => {
    setCourseForms(courseForms.filter((_, i) => i !== index));
  };

  const handleNoCourses = () => {
    setIsFormDisabled(!isFormDisabled); // Alterna entre bloquear y desbloquear
  };

  return (
    <div>
      <button type="button" onClick={handleNoCourses}>
        {isFormDisabled ? 'Tengo experiencia' : 'No cuento con experiencia'}
      </button>
      {courseForms.map((_, index) => (
        <WorkExperienceForm
          key={index}
          index={index}
          onDelete={() => deleteCourseForm(index)}
          isDisabled={isFormDisabled}
        />
      ))}
      <button type="button" onClick={addCourseForm} disabled={isFormDisabled}>
        Agregar nueva experiencia Laboral
      </button>
    </div>
  );
};

export default WorkExperienceFormList;
