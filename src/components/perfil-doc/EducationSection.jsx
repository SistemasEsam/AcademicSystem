import React from "react";

const EducationSection = ({
  title,
  data,
  isEditing,
  handleNestedInputChange,
  type,
}) => {
  
  const order = {
    Doctorado: 1,
    Maestria: 2,
    Especialidad: 3,
    Diplomado: 4,
  };

  // Ordenar los datos si el tipo es "Postgrado"
  const sortedData =
    title === "Postgrado"
      ? [...data].sort((a, b) => order[a.tipo] - order[b.tipo])
      : data;

  return (
    <section className="education-section">
      <h2>{title}</h2>
      {sortedData.map((item, index) => (
        <div className="education-item" key={index}>
          {isEditing ? (
            <>
              <input
                type="text"
                value={item.carrera || item.nombre}
                onChange={(e) =>
                  handleNestedInputChange(e, index, "carrera", type)
                }
                className="editable-input"
              />
              <input
                type="text"
                value={item.universidad}
                onChange={(e) =>
                  handleNestedInputChange(e, index, "universidad", type)
                }
                className="editable-input"
              />
            </>
          ) : (
            <>
              <p>
                <strong>{title === "Pregrado" ? "Carrera" : "Nombre"}:</strong>{" "}
                {item.carrera || item.nombre}
              </p>
              <p>
                <strong>Universidad:</strong> {item.universidad}
              </p>
             
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationSection;
