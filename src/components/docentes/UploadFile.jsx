import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

export const UploadFile = ({ tipoArchivo }) => {
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [message, setMessage] = useState("");
  const [idDocente, setIdDocente] = useState(null);
  const [docenteNombre, setDocenteNombre] = useState(null);
  const [tiposArchivo, setTiposArchivo] = useState([]);
  const [selectedTipoArchivoId, setSelectedTipoArchivoId] = useState(null);

  // Decodificar token al montar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setIdDocente(decoded.idDocente);
        setDocenteNombre(decoded.nombre);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    } else {
      console.error("Token no encontrado. Por favor, inicia sesión.");
    }
  }, []);

  // Obtener lista de tipos de archivo desde la API
  useEffect(() => {
    const fetchTiposArchivo = async () => {
      try {
        const response = await fetch("/api/dashboard/get_tipos_archivos");
        const data = await response.json();
        if (response.ok) {
          setTiposArchivo(data);

          // Encontrar el ID del tipo de archivo basado en la prop
          const tipoEncontrado = data.find(
            (tipo) => tipo.tipo.toLowerCase() === tipoArchivo.toLowerCase()
          );
          if (tipoEncontrado) {
            setSelectedTipoArchivoId(tipoEncontrado.id_ta);
          } else {
            setMessage(`No se encontró un tipo de archivo llamado '${tipoArchivo}'.`);
          }
        } else {
          console.error("Error al obtener tipos de archivo:", data.error);
        }
      } catch (error) {
        console.error("Error al llamar a la API:", error);
      }
    };

    fetchTiposArchivo();
  }, [tipoArchivo]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    validateFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    validateFiles(files);
  };

  const validateFiles = (files) => {
    const maxSize = 2 * 1024 * 1024; // 2 MB
    const validFiles = files.filter((file) => file.size <= maxSize);
    const invalidFiles = files.filter((file) => file.size > maxSize);

    if (invalidFiles.length > 0) {
      setMessage("Algunos archivos superan el tamaño máximo de 2 MB y no se agregarán.");
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      setMessage("Por favor, selecciona uno o más archivos válidos.");
      return;
    }

    if (!idDocente || !docenteNombre) {
      setMessage("No se pudo obtener la información del docente.");
      return;
    }

    if (!selectedTipoArchivoId) {
      setMessage("No se ha seleccionado un tipo de archivo válido.");
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("docente_id", idDocente);
      formData.append("docente_name", docenteNombre);
      formData.append("archivo", file);
      formData.append("idtipo_archivo", selectedTipoArchivoId);

      try {
        const response = await fetch("/api/insert_archivos", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        console.error("Error al subir archivo:", error);
        errorCount++;
      }
    }

    setMessage(
      `${successCount} archivo(s) subido(s) con éxito. ${errorCount} archivo(s) no pudieron ser subidos.`
    );
    setSelectedFiles([]);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Subir {tipoArchivo}</h3>

      {/* Zona para arrastrar y soltar archivos */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
        
          border: "2px dashed #ccc",
          padding: "100px",
          marginBottom: "20px",
          borderRadius: "8px",
          background: "#f9f9f9",
          cursor: "pointer",
        }}
      >
        {selectedFiles.length > 0 ? (
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        ) : (
          <p>Arrastra tus archivos aquí o haz clic para seleccionarlos</p>
        )}
        <input type="file" onChange={handleFileChange} multiple style={{ display: "none" }} id="file-input" />
        <label htmlFor="file-input" style={{ color: "#007BFF", cursor: "pointer", fontSize:"21px" }}>
          Seleccionar archivos
        </label>
      </div>

      {/* Botón para subir archivos */}
      <button onClick={handleUpload} disabled={!selectedFiles.length}>
        Subir {tipoArchivo}
      </button>

      {/* Mensaje de error o éxito */}
      {message && <p style={{ color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  );
};
