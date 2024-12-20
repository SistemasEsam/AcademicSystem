import { connectToDatabase } from "../../../../utils/dbConect";
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {
  try {
    const { idDocente, fecha, linkZoom } = await request.json(); // Obtenemos los datos en formato JSON

    // Verificar si todos los campos obligatorios están presentes
    if (!idDocente || !fecha || !linkZoom) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Intentar convertir la fecha al formato Date
    const fechaValida = new Date(fecha);
    if (isNaN(fechaValida.getTime())) {
      return new Response(
        JSON.stringify({ error: "La fecha proporcionada no es válida" }),
        { status: 400 }
      );
    }

  // Cambiar la línea donde se formatea la fecha
const fechaFormateada = `${fechaValida.getFullYear()}-${String(
  fechaValida.getMonth() + 1
).padStart(2, "0")}-${String(fechaValida.getDate()).padStart(2, "0")} ${String(
  fechaValida.getHours()
).padStart(2, "0")}:${String(fechaValida.getMinutes()).padStart(
  2,
  "0"
)}:${String(fechaValida.getSeconds()).padStart(2, "0")}`;


    // Conexión a la base de datos
    const db = await connectToDatabase();

    // Inserción de datos en la tabla `agendas`
    const query = `
      INSERT INTO agendas (idDocente, fecha, linkZoom)
      VALUES (?, ?, ?)
    `;
    const values = [idDocente, fechaFormateada, linkZoom];

    await db.execute(query, values);
    db.end();

    return new Response(
      JSON.stringify({ message: "Agenda insertada correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al insertar la agenda:", error);
    return new Response(
      JSON.stringify({ error: "Error al insertar la agenda" }),
      { status: 500 }
    );
  }
}
