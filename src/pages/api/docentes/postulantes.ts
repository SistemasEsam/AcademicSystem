import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function GET(_: APIContext) {
  try {
    const db = await connectToDatabase();

    const query = `
      SELECT idDocente, nombres, apellidoPaterno, apellidoMaterno, correo, ciudadRadicacion, telefono
      FROM docentes
      WHERE estado = 'postulante'
    `;

    const [results] = await db.query(query);

    db.end();

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error al obtener los docentes postulantes:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los docentes postulantes" }),
      { status: 500 }
    );
  }
}
