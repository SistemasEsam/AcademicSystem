import { useState } from "react";

export const DocenteFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm); // Ejecuta la búsqueda usando el término de búsqueda
  };

  return (
    <div className="v-row">
      <div className="v-col">
        <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-input--dirty v-text-field">
          <div className="v-input__control">
            <div className="v-field v-field--active v-field--center-affix v-field--dirty v-field--variant-filled v-theme--light v-locale--is-ltr">
              <div className="v-field__overlay"></div>
              <div className="v-field__loader">
                <div
                  className="v-progress-linear v-theme--light v-locale--is-ltr"
                  role="progressbar"
                  aria-hidden="true"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    top: "0px",
                    height: "0px",
                    height: "2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    className="v-progress-linear__background"
                    style={{ width: "100%" }}
                  ></div>
                  <div className="v-progress-linear__indeterminate">
                    <div className="v-progress-linear__indeterminate long"></div>
                    <div className="v-progress-linear__indeterminate short"></div>
                  </div>
                </div>
              </div>
              <div className="v-field__field" data-no-activator="">
               
                <label className="v-label v-field-label" htmlFor="input-1">
                  Ingrese datos a buscar
                </label>{" "}
                <input
                  type="text"
                  id="input-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                  className="v-field__input"
                />
              </div>
              <div className="v-field__outline"></div>
            </div>
          </div>
          <div className="v-input__details">
            <div
              className="v-messages"
              role="alert"
              aria-live="polite"
              id="input-1-messages"
            ></div>
          </div>
        </div>
        <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-radio-group">
          <div className="v-input__control">
            <label className="v-label" id="radio-group-3">
              Nivel de Educacion
            </label>
            <div
              className="v-selection-control-group"
              role="radiogroup"
              label="Nivel de Educacion"
              aria-describedby="radio-group-3-messages"
              aria-labelledby="radio-group-3"
            >
              <div className="v-selection-control v-selection-control--density-default v-radio">
                <div className="v-selection-control__wrapper">
                  <div className="v-selection-control__input">
                    <i
                      className="mdi-radiobox-blank mdi v-icon notranslate v-theme--light v-icon--size-default"
                      aria-hidden="true"
                    ></i>
                    <input
                      id="degree"
                      aria-disabled="false"
                      type="radio"
                      name="radio-group-3"
                      value="degrees"
                    />
                  </div>
                </div>
                <label className="v-label v-label--clickable" htmlFor="degree">
                  Pregrado
                </label>
              </div>
              <div className="v-selection-control v-selection-control--density-default v-radio">
                <div className="v-selection-control__wrapper">
                  <div className="v-selection-control__input">
                    <i
                      className="mdi-radiobox-blank mdi v-icon notranslate v-theme--light v-icon--size-default"
                      aria-hidden="true"
                    ></i>
                    <input
                      id="postDegree"
                      aria-disabled="false"
                      type="radio"
                      name="radio-group-3"
                      value="postDegrees"
                    />
                  </div>
                </div>
                <label
                  className="v-label v-label--clickable"
                  htmlFor="postDegree"
                >
                  Postgrado
                </label>
              </div>
              <div className="v-selection-control v-selection-control--density-default v-radio">
                <div className="v-selection-control__wrapper">
                  <div className="v-selection-control__input">
                    <i
                      className="mdi-radiobox-blank mdi v-icon notranslate v-theme--light v-icon--size-default"
                      aria-hidden="true"
                    ></i>
                    <input
                      id="courses"
                      aria-disabled="false"
                      type="radio"
                      name="radio-group-3"
                      value="courses"
                    />
                  </div>
                </div>
                <label className="v-label v-label--clickable" htmlFor="courses">
                  Cursos
                </label>
              </div>
            </div>
          </div>
          <div className="v-input__details">
            <div
              className="v-messages"
              role="alert"
              aria-live="polite"
              id="radio-group-3-messages"
            ></div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleSearch} // Ejecuta la búsqueda
          className="v-btn"
        >
          Buscar
        </button>
      </div>
      <div className="v-col">
        <div className="v-input v-input--horizontal v-input--center-affix v-input--density-default v-locale--is-ltr v-input--disabled v-text-field v-select v-select--single v-select--selected">
          <div className="v-input__control">
            <div
              className="v-field v-field--active v-field--appended v-field--center-affix v-field--disabled v-field--dirty v-field--variant-filled v-theme--light v-locale--is-ltr"
              role="combobox"
              aria-haspopup="listbox"
              aria-expanded="false"
              aria-owns="v-menu-12"
            >
              <div className="v-field__overlay"></div>
              <div className="v-field__loader">
                <div
                  className="v-progress-linear v-theme--light v-locale--is-ltr"
                  role="progressbar"
                  aria-hidden="true"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{
                    top: "0px",
                    height: "0px",
                    height: "2px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    className="v-progress-linear__background"
                    style={{ width: "100%" }}
                  ></div>
                  <div className="v-progress-linear__indeterminate">
                    <div className="v-progress-linear__indeterminate long"></div>
                    <div className="v-progress-linear__indeterminate short"></div>
                  </div>
                </div>
              </div>
              <div className="v-field__field" data-no-activator="">
              
                <label className="v-label v-field-label" htmlFor="input-10">
                  Nivel Postgrado
                </label>
                <div className="v-field__input" data-no-activator="">
                  <div className="v-select__selection">
                    <span className="v-select__selection-text"></span>
                  </div>
                  <input
                    disabled=""
                    size="1"
                    type="text"
                    id="input-10"
                    aria-describedby="input-10-messages"
                    inputMode="none"
                    aria-label="Open"
                    title="Open"
                  />
                </div>
              </div>
              <div className="v-field__append-inner">
                <i
                  className="mdi-menu-down mdi v-icon notranslate v-theme--light v-icon--size-default v-select__menu-icon"
                  aria-hidden="true"
                ></i>
              </div>
              <div className="v-field__outline"></div>
            </div>
          </div>
          <div className="v-input__details">
            <div
              className="v-messages"
              role="alert"
              aria-live="polite"
              id="input-10-messages"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
