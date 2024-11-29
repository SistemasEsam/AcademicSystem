import { InputRegistro } from "../../ui/InputRegistro";
import { infoGrado, infoModalidad } from "../../../api/infoModalidad";
import { PdfUpload } from "../../upload/Uploadpdf";

export const Step2Form = () => {
  return (
    <div className="v-container">
      <h2 className="header-form">Diplomado/Maestría en Educación Superior</h2>
      <div className="v-card card-style">
        <div className="v-container">
          <div className="v-row">
            <b>
              <label>
                Llene el formulario con el grado del título más alto.
                <br />
                Escribe los nombres completos de las instituciones sin
                abreviaturas y verifica la ortografía.
              </label>
            </b>
          </div>
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
                ))}
              </select>
            </div>
          </div>

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
            </div>
          </div>

          <div className="v-row">
            <div className="v-col">
              <b>
                <p style={{ textAlign: "left" }}>
                  Adjunte el documento escaneado correspondiente, compruebe la
                  calidad, legibilidad y nombre de manera apropiada el mismo.
                </p>
              </b>
              <br />
              <PdfUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
