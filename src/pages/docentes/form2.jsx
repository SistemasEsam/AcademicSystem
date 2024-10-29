// Form2.jsx
import React from 'react';
import InputRegistro from "../../components/ui/InputRegistro";
import { infoGrado, infoModalidad } from "../../api/infoModalidad";
import { PdfUpload } from "../../components/upload/uploadpdf";

const Form2 = () => {
  return (
    <div className="v-container" style={{ width: '1000px', margin: 'auto' }}>
      <h2 className="header-form">Diplomado/Maestría en Educación Superior</h2>
      <div className="v-card card-style">
        <div className="v-container">
          <div className="v-row">
            <b>
              <label>
                Llene el formulario con el grado del título más alto.
                <br />Escribe los nombres completos de las instituciones sin abreviaturas y verifica la ortografía.
              </label>
            </b>
          </div>
          <div className="v-row">
            <InputRegistro info="Universidad o Institucion" />
            <InputRegistro info="Nombre de postgrado" />
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
          </div>

          <div className="v-row">
            <InputRegistro info="Pais" />
            <div className="v-col">
              <select name="nombre_coordinador" id="input-16">
                <option value="">Modalidad de graduación</option>
                {
                  infoModalidad.map((modalidad) => (
                    <option value={modalidad.mod} key={modalidad.mod}>{modalidad.mod}</option>
                  ))
                }
              </select>
            </div>
            <div className="v-col">
              <div className="dp__main dp__theme_light">
                <div>
                  <div className="dp__input_wrap">
                    <input
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
            </div>
          </div>

          <div className="v-row">
            <div className="v-col">
              <b>
                <p style={{ textAlign: 'left' }}>
                  Adjunte el documento escaneado correspondiente, compruebe la calidad, legibilidad y nombre de manera apropiada el mismo.
                </p>
              </b>
              <br />
              <PdfUpload client:load />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form2;
