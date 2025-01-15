import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function PUT({ request }: APIContext) {
  try {
    const data = await request.json();
    console.log("Datos recibidos en el servidor:", data);

    const { idDocente, habilidadesBlandas } = data;

    if (!idDocente || !habilidadesBlandas || habilidadesBlandas.length === 0) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios o habilidades blandas" }),
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

    // Actualizar cada habilidad blanda
    for (const habilidad of habilidadesBlandas) {
      const { idHabilidadBlanda, habilidad: nuevaHabilidad } = habilidad;

      if (!idHabilidadBlanda || !nuevaHabilidad) {
        return new Response(
          JSON.stringify({ error: "Faltan campos obligatorios en habilidades blandas" }),
          { status: 400 }
        );
      }

      // Actualizar la habilidad blanda en la base de datos
      const updateQuery = `
        UPDATE habilidadesblandas
        SET habilidad = ?
        WHERE idHabilidadBlanda = ? AND idDocentes = ?
      `;
      await db.execute(updateQuery, [nuevaHabilidad.trim(), idHabilidadBlanda, idDocente]);
    }

    db.end();

    return new Response(
      JSON.stringify({ message: "Habilidades blandas actualizadas correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar habilidades blandas" }),
      { status: 500 }
    );
  }
}
