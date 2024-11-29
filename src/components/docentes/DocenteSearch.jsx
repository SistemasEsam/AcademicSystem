import React, { useState } from "react";
import { DocenteFilter } from "../filters/DocenteFilter";
import { DocenteFilterByGrade } from "../filters/DocenteFilterByGrade";
import { ResultadosDocentes } from "./ResultadosDocentes";
import { infoDocentes } from "../../api/infoDocentes";
import "../../styles/docenteSearch.css";

export const DocenteSearch = () => {
  const [filteredDocentes, setFilteredDocentes] = useState(infoDocentes);

  const handleSearch = (searchTerm, postgradeTerm,courseTerm) => {
    let filtered = infoDocentes;

    // Filtrar por nombre, email o documento
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((docente) =>
        docente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        docente.documento.toString().includes(searchTerm)
      );
    }

    // Filtrar por nombre de postgrado
    if (postgradeTerm.trim() !== "") {
      filtered = filtered.filter((docente) =>
        docente.postgrado &&
        docente.postgrado.some((post) =>
          post.nombre.toLowerCase().includes(postgradeTerm.toLowerCase())
        )
      );
    }
    if (courseTerm.trim() !== "") {
      filtered = filtered.filter((docente) =>
        docente.cursos &&
        docente.cursos.some((post) =>
          post.nombre.toLowerCase().includes(courseTerm.toLowerCase())
        )
      );
    }

    setFilteredDocentes(filtered);
  };
  const handleGradeChange = (selectedGrado) => {
    if (selectedGrado === "") {
      setFilteredDocentes(infoDocentes);
    } else {
      const filtered = infoDocentes.filter((docente) =>
        docente.postgrado && docente.postgrado.some((post) => post.tipo === selectedGrado)
      );
      setFilteredDocentes(filtered);
    }
  };
  const showAllDocentes = () => {
    setFilteredDocentes(infoDocentes);
  };

  const showAgendados = () => {
    const agendados = infoDocentes.filter((docente) =>
      docente.agendado === true && docente.detalles.length > 0
    );
    setFilteredDocentes(agendados);
  };

  return (
    <div className="docente-search-container">
      <div className="filters-container">
        <DocenteFilter onSearch={handleSearch} />
        <DocenteFilterByGrade onGradeChange={handleGradeChange} />
        <button className="btn" onClick={showAllDocentes}>Todos</button>
        <button className="btn" onClick={showAgendados}>Agendados</button>
      </div>

      <div className="results-container">
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
          <p className="no-results">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
};
