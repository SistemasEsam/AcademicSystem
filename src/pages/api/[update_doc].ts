import { connectToDatabase } from "../../utils/dbConect";
import type { APIContext } from "astro";

export async function PUT({ request }: APIContext) {
  try {
    const client = await connectToDatabase();
    const body = await request.json();
    console.log("Datos recibidos:", body); // Depuración

    const {
      idDocente,
      apellidoMaterno,
      apellidoPaterno,
      nombres,
      numeroReferencia,
      correo,
      idEstudioSuperior,  // Asegúrate de pasar estos valores desde el body
      universidad,
      carrera,
      fecha,
      nombre,
      idPais,
      idGrado,
      idModalidad,
      estudiossuperiores, // Asegúrate de que este campo esté presente
    } = body;

    // Si estudiossuperiores llega como una cadena JSON, lo parseamos
    let parsedEstudiosSuperiores = estudiossuperiores;
    if (typeof estudiossuperiores === 'string') {
      parsedEstudiosSuperiores = JSON.parse(estudiossuperiores); // Lo convertimos en array
    }

    const handleNull = (value: any) => (value === undefined || value === null ? null : value);
    const db = await connectToDatabase();
    await db.beginTransaction();

    // Actualizar la tabla `docentes` solo con los campos que mencionaste
    const docenteQuery = `
      UPDATE docentes 
      SET apellidoMaterno = ?, apellidoPaterno = ?, nombres = ?, numeroReferencia = ?, correo = ?
      WHERE idDocente = ?;
    `;
    const docenteValues = [
      handleNull(apellidoMaterno),
      handleNull(apellidoPaterno),
      handleNull(nombres),
      handleNull(numeroReferencia),
      handleNull(correo),
      idDocente,
    ];
    await db.execute(docenteQuery, docenteValues);

    // Si parsedEstudiosSuperiores está ahora como un array, actualizamos la tabla `estudiossuperiores`
    const estudiosQuery = `
      UPDATE estudiossuperiores
      SET universidad = ?, carrera = ?, fecha = ?, nombre = ?, idPais = ?, idGrado = ?, idModalidad = ?
      WHERE idEstudioSuperior = ?;
    `;
    const estudiosValues = [
      handleNull(universidad),
      handleNull(carrera),
      handleNull(fecha),
      handleNull(nombre),
      handleNull(idPais),
      handleNull(idGrado),
      handleNull(idModalidad),
      idEstudioSuperior,
    ];
    await db.execute(estudiosQuery, estudiosValues);

    await db.commit();
    return new Response(JSON.stringify({ message: "Datos actualizados con éxito" }), { status: 200 });
  } catch (error) {
    console.error("Error al actualizar los datos:", error);
    return new Response(JSON.stringify({ error: "Error al actualizar los datos." }), { status: 500 });
  }
}