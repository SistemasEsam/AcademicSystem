import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa'; // Paquete para íconos (react-icons)

export const ImageUpload = ({ buttonClass = '', iconClass = '' }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="v-container v-locale--is-ltr">
      <div className="v-col d-flex justify-center align-center">
        <div className="v-avatar v-theme--light v-avatar--density-default v-avatar--variant-flat">
          <img
            className="mx-auto"
            src={image || "/images/perfil.png"}
            width="150"
            height="150"
            alt="Avatar"
          />
          <span className="v-avatar__underlay"></span>
        </div>
      </div>

      {/* Botón para seleccionar imagen */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <label htmlFor="image-upload" className={`v-label v-field-label`}>
          SELECCIONA UNA IMAGEN FORMAL
        </label>

        {/* Input oculto */}
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }} // Ocultar el input
        />

        {/* Botón personalizado */}
        <button
          type="button"
          className={`upload-button ${buttonClass}`}
          onClick={() => document.getElementById('image-upload').click()} // Simula clic en el input
        >
          <FaUpload className={`upload-icon ${iconClass}`} /> Subir Imagen
        </button>
      </div>
    </div>
  );
};
