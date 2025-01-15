import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

// Función para manejar valores nulos y undefined
const sanitizeValue = (value: any) => (value === undefined ? null : value);

export async function POST({ request }: APIContext) {
  try {
    const data = await request.json();
    console.log("Datos recibidos en el servidor:", data);

    const { idDocente, habilidadesBlandas } = data;

    if (!idDocente || !habilidadesBlandas || habilidadesBlandas.length === 0) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios o habilidades blandas" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    // Verificar si el docente existe
    const [docenteResult]: any = await db.execute(
      `SELECT COUNT(*) AS count FROM docentes WHERE idDocente = ?`,
      [idDocente]
    );
    if (docenteResult[0].count === 0) {
      return new Response(JSON.stringify({ error: "Docente no encontrado" }), { status: 404 });
    }

    for (const habilidad of habilidadesBlandas) {
      // Insertar habilidad blanda
      const habilidadQuery = `
        INSERT INTO habilidadesblandas (idDocentes, habilidad)
        VALUES (?, ?)
      `;
      const habilidadValues = [
        sanitizeValue(Number(idDocente)),
        sanitizeValue(habilidad.trim()),
      ];

      console.log("Ejecutando inserción con valores:", habilidadValues);
      await db.execute(habilidadQuery, habilidadValues);
    }

    db.end();

    return new Response(
      JSON.stringify({ message: "Habilidades blandas insertadas correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al insertar habilidades blandas" }),
      { status: 500 }
    );
  }
}
