import React, { useState, useEffect } from "react";
import CountrySelect from "./CountrySelect";
import ModalidadesSelect from "./ModalidadesSelect";
import GradosSelect from "./GradosSelect";
import "../perfil-doc/syles/EditDocente.css";
import AddProfileSection from "./AddProfileSection";
import { ImageUpload } from "../upload/Uploadimages";

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

interface UpdateFormProps {
  idDocente: number;
}

const EditDocente: React.FC<UpdateFormProps> = ({ idDocente }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [docenteData, setDocenteData] = useState<Docente | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<
    "pregrado" | "postgrado" | ""
  >("");

  const [estudioSuperiorData, setEstudioSuperiorData] =
    useState<EstudioSuperior | null>(null);

  const handleAddSectionClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveInfo = (newInfo: Docente) => {
    if (!selectedType) {
      alert("Tipo de educación no seleccionado");
      return;
    }
    // Guardar la información
    console.log("Información guardada:", newInfo);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchDocenteData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4321/api/docentes/${idDocente}`
        );
        if (!response.ok)
          throw new Error("No se pudo obtener los datos del docente");
        const data = await response.json();
        setDocenteData(data);
        if (data.estudiossuperiores && data.estudiossuperiores.length > 0) {
          setEstudioSuperiorData(data.estudiossuperiores[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocenteData();
  }, [idDocente]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docenteData || !estudioSuperiorData) return;

    setLoading(true);
    try {
      const response = await fetch("/api/update_postulante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idDocente: docenteData.idDocente,
          apellidoMaterno: docenteData.apellidoMaterno,
          apellidoPaterno: docenteData.apellidoPaterno,
          nombres: docenteData.nombres,
          numeroReferencia: docenteData.numeroReferencia,
          correo: docenteData.correo,
          estudiossuperiores: [
            {
              idEstudio: estudioSuperiorData.idEstudio,
              universidad: estudioSuperiorData.universidad,
              carrera: estudioSuperiorData.carrera,
              fecha: estudioSuperiorData.fecha,
              nombre: estudioSuperiorData.nombre,
              idPais: estudioSuperiorData.idPais,
              idGrado: estudioSuperiorData.idGrado,
              idModalidad: estudioSuperiorData.idModalidad,
              idTipoEstudios: estudioSuperiorData.idTipoEstudios,
            },
          ],
        }),
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocenteData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleEstudioSuperiorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEstudioSuperiorData((prev) =>
      prev ? { ...prev, [name]: value } : null
    );
  };

  return (
    
    <div className="profile-container">
       
      {loading ? (
        <p className="loading-text">Cargando...</p>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          
          <div className="profile-photo">
                    <ImageUpload
                      containerClass="profile-image-container"
                      labelClass="profile-image-label"
                      avatarClass="profile-avatar"
                      buttonClass="custom-upload-button"
                      iconClass="custom-upload-icon"
                      onImageSelect={(file) =>
                        console.log(file ? `Imagen seleccionada: ${file.name}` : "No se seleccionó ninguna imagen.")
                      }
                    />
                  </div>
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

          <h2 className="form-title">Actualizar Estudio Superior</h2>
          {estudioSuperiorData && (
            <>
              <div className="form-group">
                <label className="form-label">Tipo de estudio:</label>
                <div className="form-input">
                  {estudioSuperiorData.tipoEstudios}
                </div>
              </div>
              <input
                type="hidden"
                name="idEstudio"
                value={estudioSuperiorData.idEstudio}
              />
              <div className="form-group">
                <label className="form-label">Universidad:</label>
                <input
                  className="form-input"
                  type="text"
                  name="universidad"
                  value={estudioSuperiorData.universidad}
                  onChange={handleEstudioSuperiorChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Carrera:</label>
                <input
                  className="form-input"
                  type="text"
                  name="carrera"
                  value={estudioSuperiorData.carrera}
                  onChange={handleEstudioSuperiorChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Fecha:</label>
                <input
                  className="form-input"
                  type="date"
                  name="fecha"
                  value={estudioSuperiorData.fecha}
                  onChange={handleEstudioSuperiorChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Nombre del Estudio:</label>
                <input
                  className="form-input"
                  type="text"
                  name="nombre"
                  value={estudioSuperiorData.nombre}
                  onChange={handleEstudioSuperiorChange}
                />
              </div>
              <div className="form-group">
                <CountrySelect
                  valueAndId="idPais"
                  selectedId={estudioSuperiorData.idPais}
                  selected={estudioSuperiorData?.pais}
                  selectedCountry={{
                    id: estudioSuperiorData?.idPais || 0,
                    name: "",
                  }}
                  onCountryChange={(selectedCountry) => {
                    setEstudioSuperiorData((prev) =>
                      prev ? { ...prev, idPais: selectedCountry.id } : null
                    );
                  }}
                />
              </div>
              <div className="form-group">
                <GradosSelect
                  valueAndId="idGrado"
                  selectedId={estudioSuperiorData.idGrado}
                  selected={estudioSuperiorData?.gradoTipo}
                  selectedGrado={{
                    id: estudioSuperiorData?.idGrado || 0,
                    name: "",
                  }}
                  onGradoChange={(selectedGrado) => {
                    setEstudioSuperiorData((prev) =>
                      prev ? { ...prev, idGrado: selectedGrado.id } : null
                    );
                  }}
                />
              </div>
              <div className="form-group">
                <ModalidadesSelect
                  valueAndId="idModalidad"
                  selectedId={estudioSuperiorData.idModalidad}
                  selected={estudioSuperiorData?.modalidad}
                  selectedModalidad={{
                    id: estudioSuperiorData?.idModalidad || 0,
                    name: "",
                  }}
                  onModalidadChange={(selectedModalidad) => {
                    setEstudioSuperiorData((prev) =>
                      prev
                        ? { ...prev, idModalidad: selectedModalidad.id }
                        : null
                    );
                  }}
                />
              </div>
            </>
          )}
          <button className="submit-button" type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </button>

          <button type="button" className="add-section-button" onClick={handleAddSectionClick}>
            Agregar Sección
          </button>

          {isModalOpen && (
            <AddProfileSection
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              selectedType={selectedType}
              onSaveInfo={handleSaveInfo}
            />
          )}
        </form>
      )}
    </div>
  );
};

export default EditDocente;
