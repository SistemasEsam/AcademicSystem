// src/components/DegreeForm.tsx
import React, { useState } from 'react';

interface DegreeFormProps {
  index: number;
  onDelete: () => void;
}

const DegreeForm: React.FC<DegreeFormProps> = ({ index, onDelete }) => {
  return (
    <div className="degree-form">
      <h3>FORMACIÓN DE PREGRADO</h3>
      <p>
        Llene el formulario con los títulos más relevantes para el cargo.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y verifica la ortografía.
      </p>
      <input type="text" placeholder="Universidad o Institución" required />
      <input type="text" placeholder="Carrera" required />
      <select required>
        <option value="">Nivel de Estudio</option>
        <option value="licenciatura">Licenciatura</option>
        <option value="tecnico">Técnico</option>
      </select>
      <select required>
        <option value="">País</option>
        <option value="bolivia">Bolivia</option>
        <option value="chile">Chile</option>
        <option value="peru">Perú</option>
        {/* Agrega más países según sea necesario */}
      </select>
      <input type="date" placeholder="Año de Titulación" required />
      <select required>
        <option value="">Modalidad de Graduación</option>
        <option value="tesis">Tesis</option>
        <option value="monografia">Monografía</option>
        <option value="proyecto">Proyecto de Grado</option>
      </select>
      <button type="button" onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default DegreeForm;
