import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function GET(_: APIContext) {
  try {
    const db = await connectToDatabase();

    const query = `
      SELECT id_ta, tipo 
      FROM tipo_archivo
    `;

    const [results] = await db.execute(query);
    db.end();

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error al obtener los tipos de archivo:", error);
    return new Response(JSON.stringify({ error: "Error al obtener datos" }), {
      status: 500,
    });
  }
}
