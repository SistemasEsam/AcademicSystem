import React, { useState } from 'react';
import {languageOptions } from "../../api/infoModalidad";

const SoftSkillsAndLanguages = () => {
  // Estados para Habilidades Blandas
  const [skills, setSkills] = useState<string[]>(['']);
  
  // Estados para Idiomas
  const [languages, setLanguages] = useState([
    {
      language: '',
      writing: '',
      speaking: '',
      reading: '',
      listening: ''
    }
  ]);

 

  // Manejo de habilidades
  const handleAddSkill = () => setSkills([...skills, '']);
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };
  const handleRemoveSkill = (index: number) => setSkills(skills.filter((_, i) => i !== index));

  // Manejo de idiomas
  const handleAddLanguage = () => {
    setLanguages([
      ...languages,
      { language: '', writing: '', speaking: '', reading: '', listening: '' }
    ]);
  };
  const handleLanguageChange = (index: number, field: string, value: string) => {
    const newLanguages = [...languages];
    (newLanguages[index] as any)[field] = value;
    setLanguages(newLanguages);
  };

  return (
    <div>
      {/* Sección de Habilidades Blandas */}
      <h2>HABILIDADES BLANDAS</h2>
      <p>En este apartado usa palabras clave para definir tus cualidades de manera concisa.</p>
      {skills.map((skill, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <input
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
        <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
       <label>
  Idioma:
  <select
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






          

          {/* Niveles de habilidad */}
          <div>
            <label>Nivel de escritura:</label>
            {['Básico', 'Medio', 'Avanzado'].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`writing-${index}`}
                  value={level}
                  checked={language.writing === level}
                  onChange={(e) => handleLanguageChange(index, 'writing', e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>

          <div>
            <label>Nivel oral:</label>
            {['Básico', 'Medio', 'Avanzado'].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`speaking-${index}`}
                  value={level}
                  checked={language.speaking === level}
                  onChange={(e) => handleLanguageChange(index, 'speaking', e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>

          <div>
            <label>Nivel de lectura:</label>
            {['Básico', 'Medio', 'Avanzado'].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`reading-${index}`}
                  value={level}
                  checked={language.reading === level}
                  onChange={(e) => handleLanguageChange(index, 'reading', e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>

          <div>
            <label>Nivel de escucha:</label>
            {['Básico', 'Medio', 'Avanzado'].map((level) => (
              <label key={level}>
                <input
                  type="radio"
                  name={`listening-${index}`}
                  value={level}
                  checked={language.listening === level}
                  onChange={(e) => handleLanguageChange(index, 'listening', e.target.value)}
                />
                {level}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleAddLanguage}>Agregar idioma</button>
    </div>
  );
};

export default SoftSkillsAndLanguages;
