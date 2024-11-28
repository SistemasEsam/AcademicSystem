import React from "react";

const PersonalInfo = ({ docente, isEditing, handleInputChange }) => {
  return (
    <div className="profile-details">
      <h2>Información Personal</h2>
      {isEditing ? (
        <>
          <input
            type="text"
            name="documento"
            value={docente.documento}
            onChange={handleInputChange}
            className="editable-input"
          />
          <input
            type="text"
            name="telefono"
            value={docente.telefono}
            onChange={handleInputChange}
            className="editable-input"
          />
        </>
      ) : (
        <>
          <p>
            <strong>Documento:</strong> {docente.documento}
          </p>
          <p>
            <strong>Teléfono:</strong> {docente.telefono}
          </p>
        </>
      )}
    </div>
  );
};

export default PersonalInfo;
