import React, { useState } from "react";
import { gql, request } from "graphql-request";
import { GET_PROGRAM_BY_ID } from "../../api/graphqlqueries";
import { ModuleForm } from "../../components/ui-react-components/ModuloInfoComponent";
import { AcademicFilter } from "../../components/filters/AcademicFilter";

// Definir la estructura del programa
interface Program {
  nombre_compuesto: string;
  fecha_inicio: string;
  fecha_fin: string;
  sede: { nombre: string };
  postgrado: {
    area: { nombre: string };
    categoria: { nombre: string };
  };
}

// Definir la estructura de la respuesta GraphQL
interface GetProgramResponse {
  programa: Program;
}

export const ProgramForm = () => {
  const [programId, setProgramId] = useState<number | null>(null);
  const [programData, setProgramData] = useState<Program | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modulesEnabled, setModulesEnabled] = useState(false);

  const fetchProgramData = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await request<GetProgramResponse>(
        "https://webapitest.esam.edu.bo/graphql",
        GET_PROGRAM_BY_ID,
        { id }
      );
      setProgramData(data.programa);
      setModulesEnabled(true); // Habilitar selector de módulos al obtener los datos
    } catch (err: any) {
      setError("Error al obtener el programa: " + err.message);
      setModulesEnabled(false); // Deshabilitar selector en caso de error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (programId !== null) {
      fetchProgramData(programId);
    }
  };

  return (
    <div>
      <h3>Información del Programa</h3>
      <h4>Buscar Programa por ID</h4>
      <form onSubmit={handleSubmit}>
        <label>ID del Programa:</label>
        <input
          type="number"
          id="programId"
          value={programId !== null ? programId : ""}
          onChange={(e) => setProgramId(parseInt(e.target.value))}
          placeholder="Ejemplo: 3745"
          required
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}

      {programData && (
        <div>
          <h3>Datos del Programa:</h3>
          <p>
            <strong>Nombre:</strong> {programData.nombre_compuesto}
          </p>
          <p>
            <strong>Fecha de Inicio:</strong> {programData.fecha_inicio}
          </p>
          <p>
            <strong>Fecha de Fin:</strong> {programData.fecha_fin}
          </p>
          <p>
            <strong>Sede:</strong> {programData.sede.nombre}
          </p>
          <p>
            <strong>Área de Postgrado:</strong>{" "}
            {programData.postgrado.area.nombre}
          </p>
          <p>
            <strong>Categoria de Postgrado:</strong>{" "}
            {programData.postgrado.categoria.nombre}
          </p>
        </div>
      )}

      <AcademicFilter />

      {/* Pasar el ID del programa y habilitar/deshabilitar ModuleForm */}
      <ModuleForm id_programa={programId !== null ? programId : 0} enabled={modulesEnabled} />
      <button type="submit">Guardar</button>
    </div>
  );
};
