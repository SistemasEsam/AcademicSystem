import React, { useEffect, useState } from "react";

interface Docente {
  idDocente: number;
  apellidoMaterno: string;
  apellidoPaterno: string;
  nombres: string;
  numeroReferencia: string;
  correo: string;
  telefono: string;
  idPais: number;
  idDocumento: number;
  numeroDocumento: string;
  fechaNacimiento: string;
  ciudadRadicacion: string;
  genero: string;
  direccion: string;
  estado: string;
  fotografia?: string;
  rutaCv?: string;
  universidad?: string;
  carrera?: string;
  habilidad?: string;
  idioma?: string;
  materia?: string;
  nombreEmpresa?: string;
  cargo?: string;
  descripcion?: string;
  enlaceEditorial?: string;
}

interface EditDocenteProps {
  idDocente: number;
}

const EditDocente: React.FC<EditDocenteProps> = ({ idDocente }) => {
  const [docente, setDocente] = useState<Docente | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4321/api/docentes/${idDocente}`);
        if (!response.ok) {
          throw new Error("Error al obtener datos del docente.");
        }
        const data: Docente = await response.json();
        setDocente(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocente();
  }, [idDocente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDocente((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docente) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/${idDocente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docente),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar datos del docente.");
      }
      alert("Datos del docente actualizados correctamente.");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!docente) return <p>No se encontraron datos del docente.</p>;

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Editar Docente</h2>
      <label>
        Nombres:
        <input
          name="nombres"
          value={docente.nombres}
          onChange={handleChange}
          placeholder="Ingrese el nombre"
        />
      </label>
      <label>
        Apellido Paterno:
        <input
          name="apellidoPaterno"
          value={docente.apellidoPaterno}
          onChange={handleChange}
          placeholder="Ingrese el apellido paterno"
        />
      </label>
      <label>
        Apellido Materno:
        <input
          name="apellidoMaterno"
          value={docente.apellidoMaterno}
          onChange={handleChange}
          placeholder="Ingrese el apellido materno"
        />
      </label>
      <label>
        Correo:
        <input
          name="correo"
          type="email"
          value={docente.correo}
          onChange={handleChange}
          placeholder="Ingrese el correo"
        />
      </label>
      <label>
        Teléfono:
        <input
          name="telefono"
          value={docente.telefono}
          onChange={handleChange}
          placeholder="Ingrese el teléfono"
        />
      </label>
      <label>
        Ciudad de Radicación:
        <input
          name="ciudadRadicacion"
          value={docente.ciudadRadicacion}
          onChange={handleChange}
          placeholder="Ingrese la ciudad"
        />
      </label>
      <label>
        Dirección:
        <textarea
          name="direccion"
          value={docente.direccion}
          onChange={handleChange}
          placeholder="Ingrese la dirección"
        />
      </label>
      <label>
        Fecha de Nacimiento:
        <input
          name="fechaNacimiento"
          type="date"
          value={docente.fechaNacimiento.slice(0, 10)}
          onChange={handleChange}
        />
      </label>
      <label>
        Género:
        <select name="genero" value={docente.genero} onChange={handleChange}>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
      </label>
      <label>
        Universidad:
        <input
          name="universidad"
          value={docente.universidad || ""}
          onChange={handleChange}
          placeholder="Ingrese la universidad"
        />
      </label>
      <label>
        Carrera:
        <input
          name="carrera"
          value={docente.carrera || ""}
          onChange={handleChange}
          placeholder="Ingrese la carrera"
        />
      </label>
      <button type="submit" disabled={loading} style={{ marginTop: "20px" }}>
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
};

export default EditDocente;
