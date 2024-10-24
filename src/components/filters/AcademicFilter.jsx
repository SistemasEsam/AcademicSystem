import React, { useState } from "react";
import { infoAcademicos } from "../../api/infoAcademicos";

export const AcademicFilter = () => {
  const [selectAcademico, setSelectAcademico] = useState(null);
  const handleChange = (event) => {
    const selectedName = event.target.value;
    const academicoEcontrado = infoAcademicos.find(
      (academic) => academic.nombres === selectedName
    );

    setSelectAcademico(academicoEcontrado);
  };
  return (
    <div className="v-row">
      <h3>Coordinador</h3>
      <div className="v-container v-locale--is-ltr">
        <label className="v-label">
          Nota: Ingrese el nombre del coordinador/a
        </label>
        <div className="v-field__field" data-no-activator="">
          <label className="v-label v-field-label" for="input-16">
            Nombre
          </label>
          <select
            onChange={handleChange}
            name="nombre_coordinador"
            id="input-16"
          >
            <option value="">Seleccionar</option>
            {infoAcademicos.map((academico) => (
              <option key={academico.id} value={academico.nombres}>
                {academico.nombres}
              </option>
            ))}
          </select>
        </div>
        {selectAcademico && (
          <div>
            <h3>Datos del Programa:</h3>
            <p>
              <strong>Nombre:</strong> {selectAcademico.nombres}
            </p>
            <p>
              <strong>Apellidos:</strong>{" "}
              {selectAcademico.apellido_paterno +
                " " +
                selectAcademico.apellido_materno}
            </p>
            <p>
              <strong>Correo:</strong> {selectAcademico.correo}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
