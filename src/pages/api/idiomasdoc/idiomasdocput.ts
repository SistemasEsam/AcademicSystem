import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

// Función para manejar valores nulos y undefined
const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function PUT({ request }: APIContext) {
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
      const { idIdiomaDocente, idIdioma, escritura, oral, lectura, escucha } = idioma;

      // Verificar si el idioma ya está asociado con el docente
      const [idiomaExistente]: any = await db.execute(
        `SELECT COUNT(*) AS count FROM idiomas_docente WHERE idDocente = ? AND idIdioma = ?`,
        [idDocente, idIdioma]
      );
      
      if (idiomaExistente[0].count > 0) {
        // Si ya existe, se actualiza el registro
        const updateQuery = `
          UPDATE idiomas_docente
          SET escritura = ?, oral = ?, lectura = ?, escucha = ?
          WHERE idDocente = ? AND idIdioma = ?
        `;
        await db.execute(updateQuery, [
          sanitizeValue(escritura),
          sanitizeValue(oral),
          sanitizeValue(lectura),
          sanitizeValue(escucha),
          sanitizeValue(idDocente),
          sanitizeValue(idIdioma)
        ]);
      } else {
        // Si no existe, se podría decidir insertar un nuevo registro
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
    }

    db.end();

    return new Response(
      JSON.stringify({ message: "Idiomas y habilidades actualizados correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar idiomas y habilidades" }),
      { status: 500 }
    );
  }
}
