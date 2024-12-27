import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function PUT({ request }: APIContext) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const body = await request.json();
    const { idDocente, estado } = body;

    // Validar que se reciban los campos necesarios
    if (!idDocente || !estado || !["aprobado", "rechazado", "postulante"].includes(estado)) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios o el estado es inválido" }),
        { status: 400 }
      );
    }

    // Conectar a la base de datos
    const db = await connectToDatabase();

    // Actualizar el estado del docente
    const query = `
      UPDATE docentes
      SET estado = ?
      WHERE idDocente = ?
    `;
    const values = [estado, idDocente];

    // Ejecutar la consulta
    const [result]: any = await db.execute(query, values);

    db.end();

    // Verificar si la actualización fue exitosa
    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({
          error: "No se encontró el docente o no se actualizó el estado",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: `Estado del docente actualizado a ${estado}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al actualizar el estado del docente:", error);
    return new Response(
      JSON.stringify({
        error: "Error al actualizar el estado del docente",
      }),
      { status: 500 }
    );
  }
}
