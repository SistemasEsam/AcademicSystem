import React, { useState, useEffect } from "react";
import EstudiosSuperioresList from "../formdoc/PostDegreeForm";
import "../formdoc/style/step1.css";

interface Docente {
  idDocente: number;
  apellidoMaterno: string;
  apellidoPaterno: string;
  nombres: string;
  numeroReferencia: string;
  correo: string;
  telefono: string;
  numeroDocumento: string;
  fechaNacimiento: string;
  ciudadRadicacion: string;
  genero: string;
  direccion: string;
  estado: string;
  fotografia: string;
  
}

export const Dashboard: React.FC = () => {
  const [idDocente, setIdDocente] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [docenteData, setDocenteData] = useState<Docente | null>(null);

  // Función para convertir la fecha al formato 'yyyy-mm-dd'
  const formatDate = (date: string) => {
    const [day, month, year] = date.split("/"); // Asumiendo que el formato es dd/mm/yyyy
    return `${year}-${month}-${day}`; // Formato yyyy-mm-dd
  };

  const handleSaveInfo = async (newInfo: Docente) => {
    setLoading(true);
    try {
      const response = await fetch("/api/update_postulante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInfo),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Datos actualizados:", updatedData);
        alert("Datos actualizados con éxito");
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        alert("Hubo un error al actualizar los datos");
      }
    } catch (error) {
      console.error("Error en el cliente:", error);
      alert("Hubo un error al actualizar los datos");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchDocenteData = async () => {
      const docenteId = localStorage.getItem("idDocente");
      if (!docenteId) {
        alert("No se encontró el ID del docente en localStorage");
        return;
      }

      setIdDocente(docenteId);
      setLoading(true);

      try {
        const response = await fetch(
          `http://localhost:4321/api/docentes/${docenteId}`
        );
        if (!response.ok) throw new Error("Error al obtener datos del docente");
        const data = await response.json();
        setDocenteData(data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocenteData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocenteData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (docenteData) {
      handleSaveInfo(docenteData);
    }
  };

  return (
    <div>
      <div className="profile-container">
        {loading ? (
          <p className="loading-text">Cargando...</p>
        ) : (
          <>
            {/* Formulario principal para actualizar docente */}
              <div className="form-header-title">
              <h2 className="form-title">Informacion docente</h2>
              </div>
            <form className="profile-form" onSubmit={handleSubmit}>
              {docenteData && (
                <>
                  {/* Campos ocultos */}
                  <input
                    type="hidden"
                    name="idDocente"
                    value={docenteData.idDocente}
                  />
  
                  {/* Campos del formulario dinámicos */}
                  {[
                    { label: "Nombres", name: "nombres" },
                    { label: "Apellido Paterno", name: "apellidoPaterno" },
                    { label: "Apellido Materno", name: "apellidoMaterno" },
                    { label: "Número de Referencia", name: "numeroReferencia" },
                    { label: "Correo", name: "correo", type: "email" },
                    { label: "Teléfono", name: "telefono" },
                    { label: "Número de Documento", name: "numeroDocumento" },
                    { label: "Ciudad de Radicación", name: "ciudadRadicacion" },
                    { label: "Género", name: "genero" },
                    { label: "Dirección", name: "direccion" },
                    { label: "Estado", name: "estado" },
                  ].map((field) => (
                    <div className="form-group" key={field.name}>
                      <label className="form-label">{field.label}:</label>
                      <input
                        className="form-input"
                        type={field.type || "text"}
                        name={field.name}
                        value={(docenteData as any)[field.name] || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
  
                  {/* Campo específico de fecha */}
                  <div className="form-group">
                    <label className="form-label">Fecha de Nacimiento:</label>
                    <input
                      className="form-input"
                      type="date"
                      name="fechaNacimiento"
                      value={docenteData.fechaNacimiento
                        ? formatDate(docenteData.fechaNacimiento)
                        : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
  
              {/* Botón de enviar formulario */}
              <div className="button-guardar">
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
                >
                {loading ? "Guardando..." : "Guardar"}
              </button>
                </div>
            </form>
  
            {/* Separación del componente EstudiosSuperioresList */}
            <div className="estudios-container">
              <EstudiosSuperioresList />
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};
