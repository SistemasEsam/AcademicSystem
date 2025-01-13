import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

// Función para manejar valores nulos y undefined
const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function PUT({ request }: APIContext) {
  try {
    const data = await request.json();
    console.log("Datos recibidos para modificación:", data);

    const { idDocente, experienciasDocente } = data;

    if (!idDocente || !experienciasDocente || experienciasDocente.length === 0) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios o experiencias docentes" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Verificar si el docente existe
    const [docenteResult]: any = await db.execute(
      `SELECT COUNT(*) AS count FROM docentes WHERE idDocente = ?`,
      [idDocente]
    );
    if (docenteResult[0].count === 0) {
      return new Response(JSON.stringify({ error: "Docente no encontrado" }), { status: 404 });
    }

    for (const experiencia of experienciasDocente) {
      const { idExperienciaDocente, materia, calidad, universidad, concluidoEl } = experiencia;

      if (!idExperienciaDocente) {
        return new Response(
          JSON.stringify({ error: "Falta el ID de la experiencia docente para actualizar" }),
          { status: 400 }
        );
      }

      // Verificar si la experiencia docente existe
      const [experienciaResult]: any = await db.execute(
        `SELECT COUNT(*) AS count FROM experienciadocente WHERE idExperienciaDocente = ?`,
        [idExperienciaDocente]
      );
      if (experienciaResult[0].count === 0) {
        return new Response(
          JSON.stringify({ error: `La experiencia con ID ${idExperienciaDocente} no existe` }),
          { status: 404 }
        );
      }

      // Actualizar la experiencia docente
      const updateQuery = `
        UPDATE experienciadocente
        SET materia = ?, calidad = ?, universidad = ?, concluidoEl = ?
        WHERE idExperienciaDocente = ?
      `;
      const updateValues = [
        sanitizeValue(materia?.trim()),
        sanitizeValue(calidad?.trim()),
        sanitizeValue(universidad?.trim()),
        sanitizeValue(concluidoEl?.trim()),
        idExperienciaDocente,
      ];

      console.log("Ejecutando actualización con valores:", updateValues);
      await db.execute(updateQuery, updateValues);
    }

    db.end();

    return new Response(
      JSON.stringify({ message: "Experiencias docentes actualizadas correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar experiencias docentes" }),
      { status: 500 }
    );
  }
}
