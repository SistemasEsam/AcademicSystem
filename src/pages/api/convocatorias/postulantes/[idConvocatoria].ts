import { connectToDatabase } from "../../../../utils/dbConect";
import type { APIContext } from "astro";

export async function GET({ params, url }: APIContext) {
  const { idConvocatoria } = params;
  const idDocente = url.searchParams.get("idDocente");

  if (!idConvocatoria) {
    return new Response(JSON.stringify({ error: "Falta el parámetro idConvocatoria" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const db = await connectToDatabase();

    // Consulta para obtener la convocatoria y verificar si el docente ya aplicó
    const query = `
      SELECT 
        c.idConvocatoria, 
        c.titulo, 
        c.perfil, 
        c.link,
        c.requisitos, 
        c.fechaInicio, 
        c.fechaFinal, 
        c.estado,
        COALESCE(
          CASE
            WHEN COUNT(d.idDocente) > 0 THEN
              CONCAT(
                '[', 
                GROUP_CONCAT(
                  DISTINCT CONCAT(
                    '{',
                      '"idDocente":"', IFNULL(d.idDocente, ''), '", ',
                      '"nombre":"', IFNULL(d.nombres, ''), '", ',
                      '"apellidoPaterno":"', IFNULL(d.apellidoPaterno, ''), '", ',
                      '"apellidoMaterno":"', IFNULL(d.apellidoMaterno, ''), '", ',
                      '"fechaPostulacion":"', IFNULL(DATE_FORMAT(pc.fechaPostulacion, '%Y-%m-%d %H:%i:%s'), ''), '"',
                    '}'
                  ) SEPARATOR ','
                ), 
                ']'
              )
            ELSE '[]'
          END,
          '[]'
        ) AS postulantes,
        COUNT(d.idDocente) AS totalPostulantes
      FROM convocatorias c
      LEFT JOIN postulantes_convocatoria pc ON c.idConvocatoria = pc.idConvocatoria
      LEFT JOIN docentes d ON pc.idDocente = d.idDocente
      WHERE c.idConvocatoria = ?
      GROUP BY c.idConvocatoria;
    `;
    
    const [rows]: any[] = await db.query(query, [idConvocatoria]);

    if (!Array.isArray(rows) || rows.length === 0) {
      db.end();
      return new Response(
        JSON.stringify({ error: "No se encontró la convocatoria especificada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    let postulantes = [];
    try {
      postulantes = JSON.parse(rows[0].postulantes);
    } catch (error) {
      console.error("Error al parsear postulantes:", error);
    }

    let docentePostulado = false;
    if (idDocente) {
      docentePostulado = postulantes.some((docente: any) => docente.idDocente === idDocente);
    }

    db.end();

    return new Response(
      JSON.stringify({ ...rows[0], postulantes, docentePostulado }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al obtener la convocatoria:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener la convocatoria" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}