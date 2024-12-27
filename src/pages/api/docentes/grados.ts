import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function GET(_: APIContext) {
  try {
    const db = await connectToDatabase();

    // Consulta para obtener los grados de la tabla "grados"
    const query = `
      SELECT idGrado, tipo
      FROM grados
    `;

    const [results] = await db.query(query);

    db.end();

    // Retornar los resultados en formato JSON
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error al obtener los grados académicos:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los grados académicos" }),
      { status: 500 }
    );
  }
}
