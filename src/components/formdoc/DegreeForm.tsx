// src/components/DegreeForm.tsx
import React from 'react';
import { infoPaises } from '../../api/infoPaises';
import { infoGrado, infoModalidad } from "../../api/infoModalidad";
import './style/DegreeForm.css';
interface DegreeFormProps {
  index: number;
  onDelete: () => void;
}

const DegreeForm: React.FC<DegreeFormProps> = ({ index, onDelete }) => {
  return (
    <div className="degree-form">
      <p>
        Llene el formulario con los títulos más relevantes para el cargo.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y verifica la ortografía.
      </p>

      <input type="text" placeholder="Universidad o Institución" required />
      <input type="text" placeholder="Carrera" required />

      <div className="v-col">
              <select name="nombre_coordinador" id="input-16">
                <option value="">Grado</option>
                {
                  infoGrado.map((grado) => (
                    <option value={grado.grado} key={grado.grado}>{grado.grado}</option>
                  ))
                }
              </select>
            </div>
      <div className="v-col">
        <select name="nombre_coordinador" id="input-16" required>
          <option value="">País</option>
          {infoPaises.map((pais, paisIndex) => (
            <option key={paisIndex} value={pais.pais}>
              {pais.pais}
            </option>
          ))}
        </select>
      </div>

      <input type="date" placeholder="Año de Titulación" required />

      <select name="nombre_coordinador" id="input-16">
         <option value="">Modalidad de graduación</option>
           {
             infoModalidad.map((modalidad) => (
             <option value={modalidad.mod} key={modalidad.mod}>{modalidad.mod}</option>))
               }
       </select>
      <button type="button" onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default DegreeForm;
