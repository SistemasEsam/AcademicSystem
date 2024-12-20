import React from "react";
import { infoGrado, infoModalidad } from "../../api/infoModalidad";


interface PostDegreeFormProps {
  index: number;
  onDelete: () => void;
}

export const PostDegreeForm: React.FC<PostDegreeFormProps> = ({
  index,
  onDelete,
}) => {
  return (
    <div className="degree-form">
      <p>
        Llene el formulario con los títulos más relevantes para el cargo.
        <br />
        Escribe los nombres completos de las instituciones sin abreviaturas y
        verifica la ortografía.
      </p>

      {/* Universidad o Institución */}
      <input
        name="universidadpostgrado"
        id="universidadpostgrado"
        type="text"
        placeholder="Universidad o Institución"
        required
      />

      {/* Nombre del Postgrado */}
      <input
        name="nombrePostgrado"
        id="nombrePostgrado"
        type="text"
        placeholder="Nombre del Postgrado"
        required
      />

      {/* Grado */}
      <div className="v-col">
        <select name="gradoPostgrado" id="gradoPostgrado" required>
          <option value="">Grado</option>
          {infoGrado.map((grado) => (
            <option value={grado.grado} key={grado.grado}>
              {grado.grado}
            </option>
          ))}
        </select>
      </div>

      {/* Año de Titulación */}
      <input
        name="titulacionPostgrado"
        id="titulacionPostgrado"
        type="date"
        placeholder="Año de Titulación"
        required
        pattern="\d{4}"
      />

      {/* Modalidad de Graduación */}
      <select name="modalidadPostgrado" id="modalidadPostgrado" required>
        <option value="">Modalidad de Graduación</option>
        {infoModalidad.map((modalidad) => (
          <option value={modalidad.mod} key={modalidad.mod}>
            {modalidad.mod}
          </option>
        ))}
      </select>

      {/* Botón de Eliminar */}
      <button type="button" onClick={onDelete}>
        Eliminar
      </button>
    </div>
  );
};
