<<<<<<< HEAD:src/pages/docentes/form2.jsx
// Form2.jsx
import React from 'react';
import InputRegistro from "../../components/ui/InputRegistro";
import { infoGrado, infoModalidad } from "../../api/infoModalidad";
import { PdfUpload } from "../../components/upload/uploadpdf";
import  "../../components/formdoc/style/Form2.css";
=======
import { InputRegistro } from "../../ui/InputRegistro";
import { infoGrado, infoModalidad } from "../../../api/infoModalidad";
import { PdfUpload } from "../../upload/Uploadpdf";
>>>>>>> 1233bd94c5c23636be033e5bdda017ab837100c1:src/components/formdoc/steps/Step2Form.jsx

export const Step2Form = () => {
  return (
<<<<<<< HEAD:src/pages/docentes/form2.jsx
    <div className="v-container form-container">
=======
    <div className="v-container">
>>>>>>> 1233bd94c5c23636be033e5bdda017ab837100c1:src/components/formdoc/steps/Step2Form.jsx
      <h2 className="header-form">Diplomado/Maestría en Educación Superior</h2>
      <div className="v-card card-style">
        <div className="v-container">
          <div className="v-row form-header">
            <b>
              <label>
                Llene el formulario con el grado del título más alto.
                <br />
                Escribe los nombres completos de las instituciones sin
                abreviaturas y verifica la ortografía.
              </label>
            </b>
          </div>
<<<<<<< HEAD:src/pages/docentes/form2.jsx

          <div className="v-row form-row">
            <InputRegistro info="Universidad o Institucion" />
            <InputRegistro info="Nombre de postgrado" />
            <div className="v-col form-col">
              <select name="grado" id="grado-select" className="form-select">
                <option value="">Grado</option>
                {infoGrado.map((grado) => (
                  <option value={grado.grado} key={grado.grado}>{grado.grado}</option>
=======
          <div className="v-row">
            <InputRegistro
              info="Universidad o Institucion"
              name="universidadES"
              id="universidadES"
            />
            <InputRegistro
              info="Nombre de postgrado"
              name="nombreES"
              id="nombreES"
            />
            <div className="v-col">
              <select name="gradoES" id="gradoES">
                <option value="">Grado</option>
                {infoGrado.map((grado) => (
                  <option value={grado.grado} key={grado.grado}>
                    {grado.grado}
                  </option>
>>>>>>> 1233bd94c5c23636be033e5bdda017ab837100c1:src/components/formdoc/steps/Step2Form.jsx
                ))}
              </select>
            </div>
          </div>

<<<<<<< HEAD:src/pages/docentes/form2.jsx
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
=======
          <div className="v-row">
            <InputRegistro info="Pais" name="paisES" id="paisES" />
            <div className="v-col">
              <select name="modalidadES" id="modalidadES">
                <option value="">Modalidad de graduación</option>
                {infoModalidad.map((modalidad) => (
                  <option value={modalidad.mod} key={modalidad.mod}>
                    {modalidad.mod}
                  </option>
                ))}
              </select>
            </div>
            <div className="v-col">
              <div className="dp__main dp__theme_light">
                <div>
                  <div className="dp__input_wrap">
                    <input
                      name="fechaES"
                      id="fechaES"
                      type="date"
                      className="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
                      placeholder="Fecha de Nacimiento"
                      autoComplete="off"
                      aria-label="Datepicker input"
                    />
                    <div>
                      {/* Aquí puedes agregar un SVG o algún ícono si es necesario */}
                    </div>
                  </div>
                </div>
              </div>
>>>>>>> 1233bd94c5c23636be033e5bdda017ab837100c1:src/components/formdoc/steps/Step2Form.jsx
            </div>
          </div>

          <div className="v-row form-row">
            <div className="v-col form-col">
              <b>
<<<<<<< HEAD:src/pages/docentes/form2.jsx
                <p className="upload-instruction">
                  Adjunte el documento escaneado correspondiente, compruebe la calidad, legibilidad y nombre de manera apropiada el mismo.
                </p>
              </b>
=======
                <p style={{ textAlign: "left" }}>
                  Adjunte el documento escaneado correspondiente, compruebe la
                  calidad, legibilidad y nombre de manera apropiada el mismo.
                </p>
              </b>
              <br />
>>>>>>> 1233bd94c5c23636be033e5bdda017ab837100c1:src/components/formdoc/steps/Step2Form.jsx
              <PdfUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
