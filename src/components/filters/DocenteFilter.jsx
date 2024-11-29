import { useState } from "react";
import { BuscadorDocentes } from "./BuscadorDocente";
export const DocenteFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [postgradeTerm, setPostgradeTerm] = useState("");
  const [courseTerm, setCourseTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm,postgradeTerm,courseTerm); // Ejecuta la búsqueda usando el término de búsqueda
  };

  return (
    <div className="v-row">
      <div className="v-col">

      <BuscadorDocentes
          label="Ingrese datos a buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="input-1"
        />
        <BuscadorDocentes
          label="Buscar por nombre de postgrado"
          value={postgradeTerm}
          onChange={(e) => setPostgradeTerm(e.target.value)}
          id="postgrade-input"
        />
        <BuscadorDocentes
          label="Buscar por nombre de curso"
          value={courseTerm}
          onChange={(e) => setCourseTerm(e.target.value)}
          id="cursos-input"
        />

        <button
          type="button"
          onClick={handleSearch} // Ejecuta la búsqueda general
          className="v-btn"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
