import React, { useState } from 'react';

export const ImageUpload = () => {
  // Estado para almacenar la imagen seleccionada
  const [image, setImage] = useState(null);

  // Manejar el cambio de archivo
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Capturar el archivo seleccionado
    if (file) {
      const reader = new FileReader(); // Crear un nuevo FileReader
      reader.onloadend = () => {
        setImage(reader.result);  // Guardar la imagen en base64
      };
      reader.readAsDataURL(file);  // Leer el archivo como una URL base64
    }
  };

  return (
    <div className="v-container v-locale--is-ltr">
      <div className="v-col d-flex justify-center align-center">
        <div
          className="v-avatar v-theme--light v-avatar--density-default v-avatar--variant-flat"
          style={{
            backgroundColor: 'rgb(178, 166, 18)',
            color: 'rgb(255, 255, 255)',
            caretColor: 'rgb(255, 255, 255)',
            width: '150px',
            height: '150px',
          }}
        >
          {/* Mostrar la imagen seleccionada o la imagen predeterminada */}
          <img
            className="mx-auto"
            src={image || "/images/img1.jpeg"} // Cambiar la imagen automáticamente
            width="150"
            height="150"
            alt="Avatar"
          />
          <span className="v-avatar__underlay"></span>
        </div>
      </div>

      {/* Input para seleccionar la imagen */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <label htmlFor="image-upload" className="v-label v-field-label">
          SELECCIONA UNA IMAGEN FORMAL
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'block', margin: '10px auto' }}
        />
      </div>
    </div>
  );
};
