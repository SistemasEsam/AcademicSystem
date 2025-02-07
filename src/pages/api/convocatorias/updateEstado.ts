import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function PUT({ request }: APIContext) {
  try {
    // Leer el cuerpo del request como JSON
    const body = await request.json();
    const { idConvocatoria, estado } = body;

    // Validar los datos recibidos
    if (!idConvocatoria || !estado) {
      return new Response(
        JSON.stringify({ error: "Faltan datos obligatorios" }),
        { status: 400 }
      );
    }

    // Conectar a la base de datos
    const db = await connectToDatabase();

    // Consulta para actualizar el estado de la convocatoria
    const query = `UPDATE convocatorias SET estado = ? WHERE idConvocatoria = ?`;
    const values = [estado, idConvocatoria];

    // Ejecutar la consulta
    const [result]: any = await db.execute(query, values);

    db.end();

    // Verificar si se afectó alguna fila
    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          error: "No se encontró la convocatoria o no se actualizó",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Estado de la convocatoria actualizado correctamente",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el estado:", error);
    return new Response(
      JSON.stringify({
        error: "Error al actualizar el estado",
      }),
      { status: 500 }
    );
  }
}