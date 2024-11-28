import { useState } from "react";
import { DocenteFilter } from "../filters/DocenteFilter";
import { ResultadosDocentes } from "./ResultadosDocentes";
import { infoDocentes } from "../../api/infoDocentes";

export const DocenteSearch = () => {
  const [filteredDocentes, setFilteredDocentes] = useState(infoDocentes);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredDocentes(infoDocentes);
    } else {
      const filtered = infoDocentes.filter(
        (docente) =>
          docente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          docente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          docente.documento.toString().includes(searchTerm)
      );
      setFilteredDocentes(filtered);
    }
  };

  return (
    <div>
      <DocenteFilter onSearch={handleSearch} />
      <div>
        {filteredDocentes.length > 0 ? (
          filteredDocentes.map((docente) => (
            <ResultadosDocentes
              key={docente.id}
              nombre={docente.nombre}
              email={docente.email}
              documento={docente.documento}
              telefono={docente.telefono}
            />
          ))
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};
