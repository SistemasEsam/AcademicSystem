import { connectToDatabase } from "../../utils/dbConect";
import type { APIContext } from "astro";

// Función para manejar valores nulos y undefined
const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function POST({ request }: APIContext) {
  try {
    const data = await request.json();
    console.log("Datos recibidos en el servidor:", data);

    const {
      idDocente,
      apellidoMaterno,
      apellidoPaterno,
      nombres,
      numeroReferencia,
      correo,
      telefono,
      numeroDocumento,
      fechaNacimiento,
      ciudadRadicacion,
      genero,
      direccion,
      estado,
    } = data;

    // Verificar campos obligatorios
    if (!idDocente || !nombres || !apellidoPaterno || !correo) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Conexión a la base de datos
    const db = await connectToDatabase();

    // Consulta para actualizar datos del docente
    const docenteQuery = `
      UPDATE docentes 
      SET 
        apellidoMaterno = ?, 
        apellidoPaterno = ?, 
        nombres = ?, 
        numeroReferencia = ?, 
        correo = ?, 
        telefono = ?, 
        numeroDocumento = ?, 
        fechaNacimiento = ?, 
        ciudadRadicacion = ?, 
        genero = ?, 
        direccion = ?, 
        estado = ?
      WHERE idDocente = ?;
    `;

    // Valores a actualizar
    const docenteValues = [
      sanitizeValue(apellidoMaterno?.trim()),
      sanitizeValue(apellidoPaterno.trim()),
      sanitizeValue(nombres.trim()),
      sanitizeValue(numeroReferencia?.trim()),
      sanitizeValue(correo.trim().toLowerCase()),
      sanitizeValue(telefono?.trim()),
      sanitizeValue(numeroDocumento?.trim()),
      sanitizeValue(
        fechaNacimiento ? new Date(fechaNacimiento).toISOString().split("T")[0] : null
      ),
      sanitizeValue(ciudadRadicacion?.trim()),
      sanitizeValue(genero?.trim()),
      sanitizeValue(direccion?.trim()),
      sanitizeValue(estado?.trim()),
      sanitizeValue(idDocente),
    ];

    console.log("Actualizando docente con:", docenteValues);

    // Ejecución del query
    const [docenteResult]: any = await db.execute(docenteQuery, docenteValues);
    console.log("Resultado de actualización del docente:", docenteResult);

    // Cerrar conexión a la base de datos
    db.end();

    // Respuesta de éxito
    return new Response(
      JSON.stringify({ message: "Datos actualizados correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar datos" }),
      { status: 500 }
    );
  }
}
