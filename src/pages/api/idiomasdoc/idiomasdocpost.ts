import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

// Función para manejar valores nulos y undefined
const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function POST({ request }: APIContext) {
  try {
    const data = await request.json();
    console.log("Datos recibidos en el servidor:", data);

    const { idDocente, idiomas } = data;

    if (!idDocente || !idiomas || idiomas.length === 0) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios o idiomas" }),
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

    for (const idioma of idiomas) {
      const { idIdioma, escritura, oral, lectura, escucha } = idioma;

      // Insertar en la tabla idiomas_docente
      const insertQuery = `
        INSERT INTO idiomas_docente (idDocente, idIdioma, escritura, oral, lectura, escucha)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await db.execute(insertQuery, [
        sanitizeValue(idDocente),
        sanitizeValue(idIdioma),
        sanitizeValue(escritura),
        sanitizeValue(oral),
        sanitizeValue(lectura),
        sanitizeValue(escucha)
      ]);
    }

    db.end();

    return new Response(
      JSON.stringify({ message: "Idiomas y habilidades insertados correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al insertar idiomas y habilidades" }),
      { status: 500 }
    );
  }
}
