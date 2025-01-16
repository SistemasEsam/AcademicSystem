import { useState, useEffect } from "react";
import "../../../styles/docenteSearch.css";
import { ResultadosDocentes } from "../ResultadosDocentes";

export const BuscarDocente = () => {
  const [approvedDocentes, setApprovedDocentes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApprovedDocentes = async (searchTerm = "") => {
      try {
        const response = await fetch(
         `http://localhost:4321/api/docentes/postulantes?search=${searchTerm}`
        );
        if (!response.ok) throw new Error("Error al obtener los datos");
        const data = await response.json();

        // Filtrar docentes con estado "aprobado"
        const filteredData = data.filter(
          (docente) => docente.estado.toLowerCase() === "aprobado"
        );
        setApprovedDocentes(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error al conectar con la API:", error);
        setLoading(false);
      }
    };

    fetchApprovedDocentes();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="docente-search-container">
      <div className="results-container">
        {approvedDocentes.length > 0 ? (
          approvedDocentes.map((docente) => (
           <ResultadosDocentes
                         key={docente.idDocente}
                         nombres={docente.nombres}
                         correo={docente.correo}
                         numeroDocumento={docente.numeroDocumento}
                         telefono={docente.telefono}
                         idDocente={docente.idDocente}
                         
                       />
          ))
        ) : (
          <p className="no-results">No se encontraron docentes aprobados.</p>
        )}
      </div>
    </div>
  );
};
