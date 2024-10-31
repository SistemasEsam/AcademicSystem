import React from 'react';
import InputRegistro from '../../components/ui/InputRegistro'; // Asegúrate de que la ruta sea correcta
import { inputFields } from "../../api/campos"; // Importa el array de datos
import { infoPaises } from '../../api/infoPaises';
import { ImageUpload } from "../../components/upload/uploadimages";
import { infoDocumentos, extencion } from "../../api/infoDocumento";
import { DecisionComponent } from "../../components/switches/Switch";

// Función para dividir el array en chunks
const chunkArray = (array, chunkSize) => {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, index) =>
    array.slice(index * chunkSize, index * chunkSize + chunkSize)
  );
};

// Agrupamos los campos de entrada en grupos de 3
const groupedFields = chunkArray(inputFields, 3);

const InputRegistroList = () => {
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
            {group.map((info, subIndex) => (
              <InputRegistro info={info} key={subIndex} />
            ))}
          </div>
        ))}
      </div>

      {/* Sección de país, ciudad y dirección */}
      <div className="v-row">
        <div className="v-col">
          <select name="nombre_coordinador" id="input-16">
            <option value="">Pais</option>
            {infoPaises.map((pais, index) => (
              <option key={index} value={pais.pais}>
                {pais.pais}
              </option>
            ))}
          </select>
        </div>
        <InputRegistro info="ciudad de Radicación" />
        <InputRegistro info="Direccion" />
      </div>

      {/* Sección de fecha de nacimiento */}
      <div className="v-row">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de tipo de documento y extensión */}
      <div className="v-row">
        <div className="v-col">
          <select name="nombre_coordinador" id="input-16">
            <option value="">Tipo de Documento</option>
            {infoDocumentos.map((tipo, index) => (
              <option key={index} value={tipo.tipo}>
                {tipo.tipo}
              </option>
            ))}
          </select>
        </div>
        <InputRegistro info="Numero de Documento" />
        <div className="v-col">
          <select name="nombre_coordinador" id="input-16">
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

export default InputRegistroList;
