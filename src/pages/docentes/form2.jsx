// Form2.jsx
import React from 'react';
import InputRegistro from "../../components/ui/InputRegistro";
import { infoGrado, infoModalidad } from "../../api/infoModalidad";
import { PdfUpload } from "../../components/upload/uploadpdf";
import  "../../components/formdoc/style/Form2.css";

const Form2 = () => {
  return (
    <div className="v-container form-container">
      <h2 className="header-form">Diplomado/Maestría en Educación Superior</h2>
      <div className="v-card card-style">
        <div className="v-container">
          <div className="v-row form-header">
            <b>
              <label>
                Llene el formulario con el grado del título más alto.
                <br />Escribe los nombres completos de las instituciones sin abreviaturas y verifica la ortografía.
              </label>
            </b>
          </div>

          <div className="v-row form-row">
            <InputRegistro info="Universidad o Institucion" />
            <InputRegistro info="Nombre de postgrado" />
            <div className="v-col form-col">
              <select name="grado" id="grado-select" className="form-select">
                <option value="">Grado</option>
                {infoGrado.map((grado) => (
                  <option value={grado.grado} key={grado.grado}>{grado.grado}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="v-row form-row">
            <InputRegistro info="Pais" />
            <div className="v-col form-col">
              <select name="modalidad" id="modalidad-select" className="form-select">
                <option value="">Modalidad de graduación</option>
                {infoModalidad.map((modalidad) => (
                  <option value={modalidad.mod} key={modalidad.mod}>{modalidad.mod}</option>
                ))}
              </select>
            </div>
            <div className="v-col form-col">
              <input
                type="date"
                className="date-input"
                placeholder="Fecha de Nacimiento"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="v-row form-row">
            <div className="v-col form-col">
              <b>
                <p className="upload-instruction">
                  Adjunte el documento escaneado correspondiente, compruebe la calidad, legibilidad y nombre de manera apropiada el mismo.
                </p>
              </b>
              <PdfUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form2;
