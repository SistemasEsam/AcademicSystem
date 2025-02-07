import { connectToDatabase } from "../../../../utils/dbConect";
import type { APIContext } from "astro";
import { authenticateToken } from "../../auth"; // Importar la función de autenticación

export async function POST({ request }: APIContext) {
  let db: any;

  try {
    // Verificar si el usuario está autenticado
    const authResult = authenticateToken(request);
    if (!authResult.success) {
      return authResult.response; // Retornar mensaje de error si el token es inválido o no existe
    }

    const user = authResult.user as { idDocente: number };
    const { idConvocatoria } = await request.json();

    if (!idConvocatoria) {
      return new Response(
        JSON.stringify({ error: "Faltan datos obligatorios" }),
        { status: 400 }
      );
    }

    // Conectar a la base de datos
    db = await connectToDatabase();

    // Insertar en la tabla de postulantes_convocatoria
    const query = `
      INSERT INTO postulantes_convocatoria (idDocente, idConvocatoria)
      VALUES (?, ?)
    `;
    const values = [user.idDocente, idConvocatoria];

    await db.execute(query, values);

    return new Response(
      JSON.stringify({ message: "Postulación registrada correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al registrar la postulación:", error);
    return new Response(
      JSON.stringify({ error: "Error al registrar la postulación" }),
      { status: 500 }
    );
  } finally {
    if (db) db.end();
  }
}
