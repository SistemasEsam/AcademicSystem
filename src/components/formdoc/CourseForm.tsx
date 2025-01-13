import React, { useState, useEffect } from "react";

interface ExperienciaDocente {
  idExperienciaDocente?: number; // Campo necesario para el PUT
  materia: string;
  calidad: string;
  universidad: string;
  concluidoEl: string; // Fecha en formato string
}

const ExperienciaDocenteManager: React.FC = () => {
  const [idDocente, setIdDocente] = useState<string | null>(null);
  const [experienciasDocente, setExperienciasDocente] = useState<ExperienciaDocente[]>([]);
  const [loading, setLoading] = useState(false);
  const [newExperiencia, setNewExperiencia] = useState<ExperienciaDocente>({
    materia: "",
    calidad: "",
    universidad: "",
    concluidoEl: "",
  });
  const [editingExperiencia, setEditingExperiencia] = useState<ExperienciaDocente | null>(null); // Para manejar la edición

  // Fetch registros existentes (GET)
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
        console.log("Datos recibidos de la API:", data);

        if (data.experienciasdocentes && Array.isArray(data.experienciasdocentes)) {
          setExperienciasDocente(data.experienciasdocentes);
        } else {
          console.error("Formato de datos incorrecto:", data);
          alert("No se encontraron experiencias docentes o el formato es incorrecto.");
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocenteData();
  }, []);

  // Agregar nueva experiencia (POST)
  const handleSaveInfo = async () => {
    if (!idDocente) {
      alert("ID del docente no encontrado");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/expdoc/expdocpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDocente: Number(idDocente),
          experienciasDocente: [newExperiencia],
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setExperienciasDocente(updatedData.experienciasDocente);
        alert("Nueva experiencia docente agregada con éxito");
        setNewExperiencia({
          materia: "",
          calidad: "",
          universidad: "",
          concluidoEl: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        alert("Hubo un error al agregar la experiencia docente");
      }
    } catch (error) {
      console.error("Error en el cliente:", error);
      alert("Hubo un error al agregar la experiencia docente");
    } finally {
      setLoading(false);
    }
  };

  // Modificar experiencia existente (PUT)
  const handleUpdateInfo = async () => {
    if (!idDocente || !editingExperiencia?.idExperienciaDocente) {
      alert("No se puede actualizar la experiencia docente");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/expdoc/expdocput", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDocente,
          experienciasDocente: [
            {
              idExperienciaDocente: editingExperiencia.idExperienciaDocente,
              materia: editingExperiencia.materia,
              calidad: editingExperiencia.calidad,
              universidad: editingExperiencia.universidad,
              concluidoEl: editingExperiencia.concluidoEl,
            }
          ],
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setExperienciasDocente(updatedData.experienciasDocente);
        alert("Experiencia docente actualizada con éxito");
        setEditingExperiencia(null);
      } else {
        const errorData = await response.json();
        console.error("Error del servidor:", errorData);
        alert("Hubo un error al actualizar la experiencia docente");
      }
    } catch (error) {
      console.error("Error en el cliente:", error);
      alert("Hubo un error al actualizar la experiencia docente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Gestión de Experiencia Docente</h1>

      {loading && <p>Cargando...</p>}

      <h2>Experiencias actuales</h2>
      {experienciasDocente.length > 0 ? (
        <ul>
          {experienciasDocente.map((exp) => (
            <li key={exp.idExperienciaDocente}>
              <strong>Materia:</strong> {exp.materia}, <strong>Calidad:</strong> {exp.calidad},{" "}
              <strong>Universidad:</strong> {exp.universidad}, <strong>Concluido el:</strong>{" "}
              {new Date(exp.concluidoEl).toLocaleDateString()}{" "}
              <button
                onClick={() => setEditingExperiencia(exp)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay experiencias docentes registradas.</p>
      )}

      <h2>{editingExperiencia ? "Editar experiencia" : "Agregar nueva experiencia"}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingExperiencia ? handleUpdateInfo() : handleSaveInfo();
        }}
      >
        <div>
          <label>Materia:</label>
          <input
            type="text"
            value={editingExperiencia ? editingExperiencia.materia : newExperiencia.materia}
            onChange={(e) => {
              const value = e.target.value;
              editingExperiencia
                ? setEditingExperiencia((prev) => prev && { ...prev, materia: value })
                : setNewExperiencia((prev) => ({ ...prev, materia: value }));
            }}
            required
          />
        </div>
        <div>
          <label>Calidad:</label>
          <input
            type="text"
            value={editingExperiencia ? editingExperiencia.calidad : newExperiencia.calidad}
            onChange={(e) => {
              const value = e.target.value;
              editingExperiencia
                ? setEditingExperiencia((prev) => prev && { ...prev, calidad: value })
                : setNewExperiencia((prev) => ({ ...prev, calidad: value }));
            }}
            required
          />
        </div>
        <div>
          <label>Universidad:</label>
          <input
            type="text"
            value={editingExperiencia ? editingExperiencia.universidad : newExperiencia.universidad}
            onChange={(e) => {
              const value = e.target.value;
              editingExperiencia
                ? setEditingExperiencia((prev) => prev && { ...prev, universidad: value })
                : setNewExperiencia((prev) => ({ ...prev, universidad: value }));
            }}
            required
          />
        </div>
        <div>
          <label>Fecha de conclusión:</label>
          <input
            type="date"
            value={editingExperiencia ? editingExperiencia.concluidoEl : newExperiencia.concluidoEl}
            onChange={(e) => {
              const value = e.target.value;
              editingExperiencia
                ? setEditingExperiencia((prev) => prev && { ...prev, concluidoEl: value })
                : setNewExperiencia((prev) => ({ ...prev, concluidoEl: value }));
            }}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading
            ? "Guardando..."
            : editingExperiencia
            ? "Actualizar experiencia"
            : "Guardar experiencia"}
        </button>
        {editingExperiencia && (
          <button
            type="button"
            onClick={() => setEditingExperiencia(null)}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
};

export default ExperienciaDocenteManager;
