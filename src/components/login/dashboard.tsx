import React, { useState, useEffect } from "react";
interface DecodedToken {
  idDocente: string;
}

interface Docente {
  idDocente: number;
  apellidoMaterno: string;
  apellidoPaterno: string;
  nombres: string;
  numeroReferencia: string;
  correo: string;
}
interface EstudioSuperior {
  idEstudio: number;
  universidad: string;
  carrera: string;
  fecha: string;
  nombre: string;
  idPais: number;
  pais: string;
  idGrado: number;
  gradoTipo: string;
  idModalidad: number;
  modalidad: string;
  idTipoEstudios: number;
  tipoEstudios: string;
}
interface ExperienciaDocente {
  idExperiencia: string;
  materia: string;
  calidad: string;
  universidad: string;
  concluidoEl: string;
}
export const Dashboard: React.FC = () => {
  const [idDocente, setIdDocente] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [docenteData, setDocenteData] = useState<Docente | null>(null);
  const [experienciasDocentes, setExperienciasDocentes] = useState<
    ExperienciaDocente[] | null
  >(null);

  // Almacenará datos de estudios superiores
  const [estudioSuperiorData, setEstudioSuperiorData] = useState<
    EstudioSuperior | null
  >(null);



  useEffect(() => {
    const fetchDocenteData = async () => {
      setLoading(true); // Activa el indicador de carga
      const idDocente = localStorage.getItem("idDocente"); // Obtén el idDocente

      if (!idDocente) {
        console.error("No se encontró el ID del docente");
        setLoading(false); // Desactiva el indicador de carga si no hay ID
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:4321/api/docentes/${idDocente}`
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener los datos del docente");
        }
        const data = await response.json();
        setDocenteData(data); // Guardar datos del docente en el estado

        // Guardar el primer elemento de estudios superiores
        if (data.estudiossuperiores && data.estudiossuperiores.length > 0) {
          setEstudioSuperiorData(data.estudiossuperiores[0]);
        }

        // Guardar experiencias docentes
        if (data.experienciasdocentes && data.experienciasdocentes.length > 0) {
          setExperienciasDocentes(data.experienciasdocentes);
        }
      } catch (error) {
        console.error("Error al obtener los datos del docente:", error);
      } finally {
        setLoading(false); // Desactiva el indicador de carga
      }
    };

    fetchDocenteData(); // Llamar la función
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!docenteData) return;

    const { name, value } = event.target;
    setDocenteData({
      ...docenteData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Formulario enviado:", docenteData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return (
    <div>
      <h1>ID del Docente: {idDocente}</h1>
      <div className="profile-container">
        {loading ? (
          <p className="loading-text">Cargando...</p>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Actualizar Docente</h2>
            {docenteData && (
              <>
                <input
                  type="hidden"
                  name="idDocente"
                  value={docenteData.idDocente}
                />
                <div className="form-group">
                  <label className="form-label">Apellido Materno:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="apellidoMaterno"
                    value={docenteData.apellidoMaterno}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Apellido Paterno:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="apellidoPaterno"
                    value={docenteData.apellidoPaterno}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Nombres:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="nombres"
                    value={docenteData.nombres}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Número de Referencia:</label>
                  <input
                    className="form-input"
                    type="text"
                    name="numeroReferencia"
                    value={docenteData.numeroReferencia}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Correo:</label>
                  <input
                    className="form-input"
                    type="email"
                    name="correo"
                    value={docenteData.correo}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};
