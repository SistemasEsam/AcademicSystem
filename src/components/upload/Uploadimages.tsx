import React, { useState } from "react";

interface Props {
  onImageSelect: (file: File | null) => void;
}

export const ImageUpload: React.FC<Props> = ({ onImageSelect }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Capturar el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Previsualizar la imagen
      };
      reader.readAsDataURL(file); // Leer el archivo como una URL base64
      onImageSelect(file); // Enviar el archivo al formulario principal
    } else {
      setImagePreview(null);
      onImageSelect(null);
    }
  };

  return (
    <div className="v-container v-locale--is-ltr">
      <div className="v-col d-flex justify-center align-center">
        <div
          style={{
            color: "rgb(255, 255, 255)",
            caretColor: "rgb(255, 255, 255)",
            width: "150px",
            height: "150px",
          }}
        >
          <img
            className="mx-auto"
            data-name="imagen"
            src={imagePreview || "/images/perfil-docente-pordefecto.png"}
            width="150"
            height="150"
            alt="Avatar"
          />
          <span className="v-avatar__underlay"></span>
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <label htmlFor="image-upload" className="v-label v-field-label">
          SELECCIONA UNA IMAGEN FORMAL
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "block", margin: "10px auto" }}
        />
      </div>
    </div>
  );
};
