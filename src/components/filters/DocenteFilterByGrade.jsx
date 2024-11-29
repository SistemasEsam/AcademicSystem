import React, { useState } from "react";
import { infoGrado } from "../../api/infoModalidad";

export const DocenteFilterByGrade = ({ onGradeChange }) => {
  const [selectedGrado, setSelectedGrado] = useState("");

  const handleGradeChange = (event) => {
    const grado = event.target.value;
    setSelectedGrado(grado);
    onGradeChange(grado); // Pasa el grado seleccionado al componente padre
  };

  return (
    <div>
      <label htmlFor="grado-select">Nivel Académico</label>
      <select id="grado-select" value={selectedGrado} onChange={handleGradeChange}>
        <option value="">Seleccionar Grado</option>
        {infoGrado.map((grado) => (
          <option key={grado.id} value={grado.grado}>
            {grado.grado}
          </option>
        ))}
      </select>
    </div>
  );
};
