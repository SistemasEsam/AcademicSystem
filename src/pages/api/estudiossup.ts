import { connectToDatabase } from "../../utils/dbConect";
import type { APIContext } from "astro";

// Función para manejar valores nulos y undefined
const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function ALL({ request }: APIContext) {
  try {
    if (request.method === "PUT") {
      return await handlePut(request);
    } else {
      return new Response(
        JSON.stringify({ error: "Método HTTP no permitido" }),
        { status: 405 }
      );
    }
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
}

// Manejar PUT: Actualizar estudios superiores
async function handlePut(request: Request) {
  const data = await request.json();
  console.log("Datos recibidos para PUT:", data);

  const { idDocente, idEstudioSuperior, updateFields } = data;

  if (!idDocente || !idEstudioSuperior || !updateFields || Object.keys(updateFields).length === 0) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios para la actualización" }),
      { status: 400 }
    );
  }

  const db = await connectToDatabase();

  // Verificar si el docente existe
  const docenteQuery = `SELECT COUNT(*) AS count FROM docentes WHERE idDocente = ?`;
  const [docenteResult]: any = await db.execute(docenteQuery, [idDocente]);
  if (docenteResult[0].count === 0) {
    return new Response(
      JSON.stringify({ error: "Docente no encontrado" }),
      { status: 400 }
    );
  }

  // Verificar si el estudio está asociado al docente
  const estudioQuery = `
    SELECT COUNT(*) AS count 
    FROM docentes_estudios 
    WHERE idDocente = ? AND idEstudioSuperior = ?`;
  const [estudioResult]: any = await db.execute(estudioQuery, [idDocente, idEstudioSuperior]);
  if (estudioResult[0].count === 0) {
    return new Response(
      JSON.stringify({ error: "Estudio superior no encontrado o no está asociado al docente" }),
      { status: 400 }
    );
  }

  // Construir la consulta de actualización
  const updateFieldsKeys = Object.keys(updateFields).map((key) => `${key} = ?`).join(", ");
  const updateFieldsValues = Object.values(updateFields).map(sanitizeValue);

  const updateQuery = `
    UPDATE estudiossuperiores
    SET ${updateFieldsKeys}
    WHERE idEstudioSuperior = ?;
  `;
  const updateValues = [...updateFieldsValues, idEstudioSuperior];

  // Ejecutar la consulta de actualización
  const [updateResult]: any = await db.execute(updateQuery, updateValues);

  db.end();

  return new Response(
    JSON.stringify({ message: "Estudio superior actualizado correctamente" }),
    { status: 200 }
  );
}
