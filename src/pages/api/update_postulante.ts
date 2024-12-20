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
      estudiossuperiores,
    } = data;

    if (!idDocente || !nombres || !apellidoPaterno || !correo) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Actualizar datos del docente
    const docenteQuery = `
      UPDATE docentes 
      SET apellidoMaterno = ?, apellidoPaterno = ?, nombres = ?, numeroReferencia = ?, correo = ?
      WHERE idDocente = ?;
    `;
    const docenteValues = [
      sanitizeValue(apellidoMaterno?.trim()),
      sanitizeValue(apellidoPaterno.trim()),
      sanitizeValue(nombres.trim()),
      sanitizeValue(numeroReferencia?.trim()),
      sanitizeValue(correo.trim().toLowerCase()),
      sanitizeValue(idDocente),
    ];

    console.log("Actualizando docente con:", docenteValues);
    const [docenteResult]: any = await db.execute(docenteQuery, docenteValues);
    console.log("Resultado de actualización del docente:", docenteResult);

    // Actualizar datos de estudios superiores si existen
    if (estudiossuperiores && estudiossuperiores.length > 0) {
      for (const estudio of estudiossuperiores) {
        const estudioQuery = `
          UPDATE estudiossuperiores
          SET universidad = ?, carrera = ?, fecha = ?, nombre = ?, idPais = ?, idGrado = ?, idModalidad = ?
          WHERE idEstudioSuperior = ?;
        `;
        const estudioValues = [
          sanitizeValue(estudio.universidad?.trim()),
          sanitizeValue(estudio.carrera?.trim()),
          sanitizeValue(estudio.fecha?.trim()),
          sanitizeValue(estudio.nombre?.trim()),
          sanitizeValue(Number(estudio.idPais)),
          sanitizeValue(Number(estudio.idGrado)),
          sanitizeValue(Number(estudio.idModalidad)),
          sanitizeValue(estudio.idEstudio),
        ];

        console.log("Actualizando estudio superior con:", estudioValues);
        const [estudioResult]: any = await db.execute(
          estudioQuery,
          estudioValues
        );
        console.log(
          "Resultado de actualización del estudio superior:",
          estudioResult
        );
      }
    }

    db.end();

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
