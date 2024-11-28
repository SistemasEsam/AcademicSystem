import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";
import type { RowDataPacket } from "mysql2";

interface Postulante extends RowDataPacket {
  idDocente: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  ciudadRadicacion: string;
  telefono: string;
  estado: string;
}

export async function GET({ params }: APIContext) {
  try {
    const { postulante } = params;

    if (!postulante || isNaN(Number(postulante))) {
      return new Response(
        JSON.stringify({ error: "ID del postulante inválido" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    const query = `
      SELECT idDocente, nombres, apellidoPaterno, apellidoMaterno, correo,
             ciudadRadicacion, telefono, estado
      FROM docentes
      WHERE idDocente = ? AND estado = 'postulante'
    `;

    // Desestructurar resultados
    const [results]: [Postulante[], any] = await db.query<Postulante[]>(query, [
      Number(postulante),
    ]);

    db.end();

    if (results.length === 0) {
      return new Response(
        JSON.stringify({ error: "Postulante no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(results[0]), { status: 200 });
  } catch (error) {
    console.error("Error al obtener el postulante:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener el postulante" }),
      { status: 500 }
    );
  }
}
