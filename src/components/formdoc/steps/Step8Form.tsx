<<<<<<< HEAD:src/pages/docentes/HabilidadIdioma.tsx
import React, { useState } from 'react';
import { languageOptions } from "../../api/infoModalidad";
import "../../components/formdoc/style/SkillSoft.css";
=======
import { useState } from "react";
import { languageOptions } from "../../../api/infoModalidad";
>>>>>>> 1233bd94c5c23636be033e5bdda017ab837100c1:src/components/formdoc/steps/Step8Form.tsx

export const Step8Form = () => {
  // Estados para Habilidades Blandas
  const [skills, setSkills] = useState<string[]>([""]);

  // Estados para Idiomas
  const [languages, setLanguages] = useState([
    {
      language: "",
      writing: "",
      speaking: "",
      reading: "",
      listening: "",
    },
  ]);

  // Manejo de habilidades
  const handleAddSkill = () => setSkills([...skills, ""]);
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };
  const handleRemoveSkill = (index: number) =>
    setSkills(skills.filter((_, i) => i !== index));

  // Manejo de idiomas
  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      { language: "", writing: "", speaking: "", reading: "", listening: "" },
    ]);
  };
  const handleLanguageChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newLanguages = [...languages];
    (newLanguages[index] as any)[field] = value;
    setLanguages(newLanguages);
  };

  return (
    <div className="softskills-languages-container">
      {/* Sección de Habilidades Blandas */}
<<<<<<< HEAD:src/pages/docentes/HabilidadIdioma.tsx
      <h2 className="skills-title">Habilidades Blandas</h2>
      <p className="skills-description">
        En este apartado usa palabras clave para definir tus cualidades de manera concisa.
      </p>
      <div className="skills-section">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <input
              className="skill-input"
              type="text"
              placeholder={`Habilidad ${index + 1}`}
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              required
            />
            {skills.length > 1 && (
              <button
                className="remove-skill-btn"
                onClick={() => handleRemoveSkill(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <button className="add-skill-btn" onClick={handleAddSkill}>
          Agregar nueva habilidad
        </button>
      </div>

      {/* Sección de Idiomas */}
      <h2 className="languages-title">Idiomas</h2>
      <p className="languages-description">
        Selecciona los idiomas más relevantes que dominas.
      </p>
      <div className="languages-section">
        {languages.map((language, index) => (
          <div key={index} className="language-item">
            <label className="language-label">
              Idioma:
              <select
                className="language-select"
                value={language.language}
                onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                required
              >
                <option value="">Seleccione un idioma</option>
                {languageOptions.map((option) => (
                  <option key={option.id} value={option.mod}>
                    {option.mod}
                  </option>
                ))}
              </select>
            </label>
            {['writing', 'speaking', 'reading', 'listening'].map((skill) => (
              <div key={skill} className={`language-${skill}`}>
                <label >{`Nivel de ${skill}:`}</label>
                {['Básico', 'Medio', 'Avanzado'].map((level, levelIndex) => (
                  <div key={levelIndex} className="checkbox-wrapper-19">
                    <input
                      id={`${skill}-${level}-${index}`}
                      type="radio"
                      name={`${skill}-${index}`}
                      value={level}
                      checked={(language as any)[skill] === level}
                      onChange={(e) => handleLanguageChange(index, skill, e.target.value)}
                    />
                    <label className="check-box" htmlFor={`${skill}-${level}-${index}`}></label>
                    <span>{level}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
        <button className="add-skill-btn" onClick={handleAddLanguage}>
          Agregar idioma
        </button>
      </div>
=======
      <h2>HABILIDADES BLANDAS</h2>
      <p>
        En este apartado usa palabras clave para definir tus cualidades de
        manera concisa.
      </p>
      {skills.map((skill, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            name="habilidad"
            id="habilidad"
            type="text"
            placeholder={`Habilidad ${index + 1}`}
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            required
          />
          {skills.length > 1 && (
            <button onClick={() => handleRemoveSkill(index)}>Eliminar</button>
          )}
        </div>
      ))}
      <button onClick={handleAddSkill}>Agregar nueva habilidad</button>

      {/* Sección de Idiomas */}
      <h2>IDIOMAS</h2>
      <p>Selecciona los idiomas más relevantes que dominas.</p>
      {languages.map((language, index) => (
        <div
          key={index}
          style={{
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <label htmlFor="lenguaje">Idioma:</label>
          <select
            name="lenguaje"
            id="lenguaje"
            value={language.language}
            onChange={(e) =>
              handleLanguageChange(index, "language", e.target.value)
            }
            required
          >
            <option value="">Seleccione un idioma</option>
            {languageOptions.map((option) => (
              <option key={option.id} value={option.mod}>
                {option.mod}
              </option>
            ))}
          </select>

          {/* Niveles de habilidad */}
          <div>
            <label htmlFor="escritura">Nivel de escritura:</label>
            {["Básico", "Medio", "Avanzado"].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`writing-${index}`}
                  value={level}
                  checked={language.writing === level}
                  onChange={(e) =>
                    handleLanguageChange(index, "writing", e.target.value)
                  }
                />
                {level}
              </label>
            ))}
          </div>

          <div>
            <label>Nivel oral:</label>
            {["Básico", "Medio", "Avanzado"].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`speaking-${index}`}
                  value={level}
                  checked={language.speaking === level}
                  onChange={(e) =>
                    handleLanguageChange(index, "speaking", e.target.value)
                  }
                />
                {level}
              </label>
            ))}
          </div>

          <div>
            <label>Nivel de lectura:</label>
            {["Básico", "Medio", "Avanzado"].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`reading-${index}`}
                  value={level}
                  checked={language.reading === level}
                  onChange={(e) =>
                    handleLanguageChange(index, "reading", e.target.value)
                  }
                />
                {level}
              </label>
            ))}
          </div>

          <div>
            <label>Nivel de escucha:</label>
            {["Básico", "Medio", "Avanzado"].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`listening-${index}`}
                  value={level}
                  checked={language.listening === level}
                  onChange={(e) =>
                    handleLanguageChange(index, "listening", e.target.value)
                  }
                />
                {level}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleAddLanguage}>Agregar idioma</button>
>>>>>>> 1233bd94c5c23636be033e5bdda017ab837100c1:src/components/formdoc/steps/Step8Form.tsx
    </div>
  );
};
