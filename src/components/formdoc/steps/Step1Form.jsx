import { InputRegistro } from "../../ui/InputRegistro";
import { inputFieldsFirstSection } from "../../../api/campos";
import { CountriesFormSelect } from "../../ui/CountriesFormSelect";
import { ImageUpload } from "../../upload/Uploadimages";
import { infoDocumentos, extencion } from "../../../api/infoDocumento";
import { DecisionComponent } from "../../switches/Switch";

// Función para dividir el array en chunks
const chunkArray = (array, chunkSize) => {
  return Array.from(
    { length: Math.ceil(array.length / chunkSize) },
    (_, index) => array.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
};

// Agrupar los campos de entrada en grupos de 3
const groupedFields = chunkArray(inputFieldsFirstSection, 3);

export const Step1Form = () => {
  return (
    <>
      {/* Componente para subir imágenes */}
      <ImageUpload />

      {/* Contenedor principal */}
      <div className="v-container v-locale--is-ltr">
        {/* Iteramos sobre los grupos de campos */}
        {groupedFields.map((group, index) => (
          <div className="v-row" key={index}>
            {/* Iteramos sobre cada campo del grupo */}
            {group.map((input) => (
              <InputRegistro
                info={input.input}
                key={input.id}
                name={input.nombre}
                id={input.id}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Sección de país, ciudad y dirección */}
      <div className="v-row">
        <div className="v-col">
          <CountriesFormSelect valueAndId="pais" />
        </div>
      </div>

      {/* Sección de fecha de nacimiento */}
      <div className="v-row">
        <div className="v-col">
          <div className="dp__main dp__theme_light">
            <div>
              <div className="dp__input_wrap">
                <input
                  name="fechaNacimiento"
                  type="date"
                  className="dp__pointer dp__input_readonly dp__input dp__input_icon_pad dp__input_reg"
                  placeholder="Fecha de Nacimiento"
                  autoComplete="off"
                  aria-label="Datepicker input"
                  id="fechaNacimiento"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de tipo de documento y extensión */}
      <div className="v-row">
        <div className="v-col">
          <select name="tipoDocumento" id="tipoDocumento">
            <option value="">Tipo de Documento</option>
            {infoDocumentos.map((tipo, index) => (
              <option key={index} value={tipo.tipo}>
                {tipo.tipo}
              </option>
            ))}
          </select>
        </div>
        <InputRegistro
          info="Numero de Documento"
          name="numeroDocumento"
          id="numeroDocumento"
        />
        <div className="v-col">
          <select name="extension" id="extension">
            <option value="">Extension</option>
            {extencion.map((ext, index) => (
              <option key={index} value={ext.ext}>
                {ext.ext}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DecisionComponent />
    </>
  );
};
