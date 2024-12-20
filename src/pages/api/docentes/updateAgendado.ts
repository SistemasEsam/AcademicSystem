import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function PUT({ request }: APIContext) {
  try {
    const body = await request.json();
    const { idDocente, agendado } = body;

    // Validar los datos requeridos
    if (!idDocente || typeof agendado !== "number") {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios o son inválidos" }),
        { status: 400 }
      );
    }

    // Conectar a la base de datos
    const db = await connectToDatabase();

    const query = `
      UPDATE docentes
      SET agendado = ?
      WHERE idDocente = ? AND estado = 'postulante'
    `;
    const values = [agendado, idDocente];

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
        message: "Estado de agendado actualizado correctamente",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el campo agendado:", error);
    return new Response(
      JSON.stringify({
        error: "Error al actualizar el campo agendado",
      }),
      { status: 500 }
    );
  }
}
