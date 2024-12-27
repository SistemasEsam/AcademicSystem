import { connectToDatabase } from "../../../../utils/dbConect";
import type { APIContext } from "astro";

export async function PUT({ request }: APIContext) {
  try {
    const body = await request.json();
    const { idDocente, fecha, linkZoom } = body;

    // Validar los datos recibidos
    if (!idDocente || !fecha || !linkZoom) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Conectar a la base de datos
    const db = await connectToDatabase();

    const query = `
      UPDATE agendas
      SET fecha = ?, linkZoom = ?
      WHERE idDocente = ? 
    `;
    const values = [fecha, linkZoom, idDocente];

    // Ejecutar la consulta
    const [result]: any = await db.execute(query, values);

    db.end();

    // Verificar si se afectó alguna fila
    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          error: "No se encontró el postulante o no se actualizó",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Reunión actualizada correctamente",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar la reunión:", error);
    return new Response(
      JSON.stringify({
        error: "Error al actualizar la reunión",
      }),
      { status: 500 }
    );
  }
}
