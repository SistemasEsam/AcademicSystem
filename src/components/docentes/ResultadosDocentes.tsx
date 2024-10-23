import React from "react";

interface ResultProps {
  nombre: string;
  email: string;
  documento: string;
  telefono: string;
}

export const ResultadosDocentes: React.FC<ResultProps> = ({
  nombre,
  email,
  documento,
  telefono,
}) => {
  return (
    <div className="v-card v-theme--light v-card--density-default v-card--variant-elevated mb-4">
      <div className="v-card__loader">
        <div
          className="v-progress-linear v-theme--light v-locale--is-ltr"
          role="progressbar"
          aria-hidden="true"
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            top: "0px",
            height: "0px",
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
      {/* Aquí mostramos los datos del docente */}
      <div className="v-card-title sub-title">{nombre}</div>
      <div className="v-card-subtitle">
        {email} <br /> {documento} <br /> {telefono}
      </div>
      <div className="v-card-actions">
        <button
          type="button"
          className="v-btn v-btn--slim v-theme--light v-btn--density-default v-btn--size-default v-btn--variant-text button-card"
        >
          <span className="v-btn__overlay"></span>
          <span className="v-btn__underlay"></span>
          <a href={`/postulantes/info/${nombre}`}>Abrir</a>
        </button>
      </div>
      <span className="v-card__underlay"></span>
    </div>
  );
};
