import React, { useState, useEffect } from "react";
import EstudiosSuperioresList from "../formdoc/PostDegreeForm";
import "../formdoc/style/step1.css";
import ExperienciaDocenteManager from "../formdoc/CourseForm";
import HabilidadesBlandasManager from "../formdoc/SkillForm";
import IdiomasManager from "../formdoc/IdiomasManager";

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

export const DashboardDoc: React.FC = () => {
  const [idDocente, setIdDocente] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [docenteData, setDocenteData] = useState<Docente | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // Función para convertir la fecha al formato 'yyyy-mm-dd'
  const formatDate = (date: string) => {
    // Si la fecha está en formato ISO (yyyy-mm-ddTHH:mm:ss.sssZ), convertimos a yyyy-mm-dd
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0"); // +1 porque los meses comienzan desde 0
    const day = String(formattedDate.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
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
          {/* Información principal del docente */}
          <div className="form-header-title">
            <h2 className="form-title">Información del docente</h2>
          </div>
          {docenteData && (
            <div className="profile-info">
              {isEditing ? (
                <form className="profile-form" onSubmit={handleSubmit}>
                  {[ // Campos editables
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

<div className="form-group">
  <label className="form-label">Fecha de Nacimiento:</label>
  <input
    className="form-input"
    type="date"
    name="fechaNacimiento"
    value={docenteData.fechaNacimiento ? formatDate(docenteData.fechaNacimiento) : ""}
    onChange={handleInputChange}
  />
</div>

                  <div className="button-guardar">
                    <button type="submit" className="submit-button" disabled={loading}>
                      {loading ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                      type="button"
                      className="cancel-button1"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  {[ // Campos no editables
                    { label: "Nombres", name: "nombres" },
                    { label: "Apellido Paterno", name: "apellidoPaterno" },
                    { label: "Apellido Materno", name: "apellidoMaterno" },
                    { label: "Número de Referencia", name: "numeroReferencia" },
                    { label: "Correo", name: "correo" },
                    { label: "Teléfono", name: "telefono" },
                    { label: "Número de Documento", name: "numeroDocumento" },
                    { label: "Ciudad de Radicación", name: "ciudadRadicacion" },
                    { label: "Género", name: "genero" },
                    { label: "Dirección", name: "direccion" },
                    { label: "Estado", name: "estado" },
                  ].map((field) => (
                    <p key={field.name}>
                      <strong>{field.label}: </strong>
                      {(docenteData as any)[field.name] || ""}
                    </p>
                  ))}
                  <p>
                    <strong>Fecha de Nacimiento: </strong>
                    {docenteData.fechaNacimiento
                      ? formatDate(docenteData.fechaNacimiento)
                      : ""}
                  </p>
                  <button
                    className="edit-button1"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          )}
  
            {/* Separación del componente EstudiosSuperioresList */}
            <div className="estudios-container">
              <EstudiosSuperioresList />
            </div>
            <div className="estudios-container2">
              <ExperienciaDocenteManager />
            </div>
            
            <div className="estudios-container3">
              <HabilidadesBlandasManager />
            </div>
            
            <div className="estudios-container3">
              <IdiomasManager />
            </div>
            
          </>
        )}
      </div>
    </div>
  );
  
};