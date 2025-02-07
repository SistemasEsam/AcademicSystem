import { connectToDatabase } from "../../../../utils/dbConect";
import type { APIContext } from "astro";

const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function PUT({ request, params }: APIContext) {
  try {
    // Obtener el ID de la convocatoria desde los parámetros de la ruta
    const { idConvocatoria } = params;

    if (!idConvocatoria) {
      return new Response(
        JSON.stringify({ error: "Falta el ID de la convocatoria" }),
        { status: 400 }
      );
    }

    // Obtener los datos del cuerpo de la solicitud como FormData
    const formData = await request.formData();

    // Extraer los valores del FormData
    const titulo = formData.get("titulo") as string;
    const perfil = formData.get("perfil") as string;
    const fechaInicio = formData.get("fechaInicio") as string;
    const fechaFinal = formData.get("fechaFinal") as string;
    const requisitos = formData.get("requisitos") as string;

    // Validar campos obligatorios
    if (!titulo || !perfil || !fechaInicio || !fechaFinal || !requisitos) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Validar formato de las fechas
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinalDate = new Date(fechaFinal);
    if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinalDate.getTime())) {
      return new Response(
        JSON.stringify({ error: "Formato de fecha inválido" }),
        { status: 400 }
      );
    }

    // Generar el link basado en el título
    const link = `http://localhost:4321/convocatorias/${encodeURIComponent(titulo.trim())}`;

    // Conectar a la base de datos
    const db = await connectToDatabase();

    // Query para actualizar la convocatoria
    const convocatoriaQuery = `
      UPDATE convocatorias
      SET titulo = ?, perfil = ?, fechaInicio = ?, fechaFinal = ?, requisitos = ?, link = ?
      WHERE idConvocatoria = ?;
    `;

    // Valores para la query
    const convocatoriaValues = [
      sanitizeValue(titulo.trim()),
      sanitizeValue(perfil.trim()),
      sanitizeValue(fechaInicioDate.toISOString().split("T")[0]),
      sanitizeValue(fechaFinalDate.toISOString().split("T")[0]),
      sanitizeValue(requisitos.trim()),
      link, // Actualizar el campo link
      sanitizeValue(idConvocatoria), // El id de la convocatoria
    ];

    // Ejecutar la query
    const [convocatoriaResult]: any = await db.execute(convocatoriaQuery, convocatoriaValues);
    console.log("Resultado de actualización de la convocatoria:", convocatoriaResult);

    // Cerrar la conexión a la base de datos
    db.end();

    // Retornar una respuesta exitosa
    return new Response(
      JSON.stringify({ message: "Convocatoria actualizada correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar convocatoria" }),
      { status: 500 }
    );
  }
}