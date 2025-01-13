import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

// Función para manejar valores nulos y undefined
const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function POST({ request }: APIContext) {
  try {
    const data = await request.json();
    console.log("Datos recibidos en el servidor:", data);

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
      // Insertar experiencia docente
      const experienciaQuery = `
        INSERT INTO experienciadocente (materia, calidad, universidad, concluidoEl)
        VALUES (?, ?, ?, ?)
      `;
      const experienciaValues = [
        sanitizeValue(experiencia.materia?.trim()),
        sanitizeValue(experiencia.calidad?.trim()),
        sanitizeValue(experiencia.universidad?.trim()),
        sanitizeValue(experiencia.concluidoEl?.trim()),
      ];

      console.log("Ejecutando inserción con valores:", experienciaValues);
      const [experienciaResult]: any = await db.execute(experienciaQuery, experienciaValues);

      // Insertar relación en docente_experienciadocente
      const docenteExperienciaQuery = `
        INSERT INTO docente_experienciadocente (idDocente, idExperienciaDocente)
        VALUES (?, ?)
      `;
      const docenteExperienciaValues = [
        sanitizeValue(Number(idDocente)),
        experienciaResult.insertId,
      ];
      await db.execute(docenteExperienciaQuery, docenteExperienciaValues);
    }

    db.end();

    return new Response(
      JSON.stringify({ message: "Experiencias docentes insertadas correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al insertar experiencias docentes" }),
      { status: 500 }
    );
  }
}
