import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";
import type { RowDataPacket } from "mysql2";

interface Postulante extends RowDataPacket {
  idDocente: number;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  ciudadRadicacion: string;
  telefono: string;
  estado: string;
}

export async function GET({ params }: APIContext) {
  try {
    const { postulante } = params;

    if (!postulante || isNaN(Number(postulante))) {
      return new Response(
        JSON.stringify({ error: "ID del postulante inválido" }),
        { status: 400 }
      );
    }

    const db = await connectToDatabase();

    const query = `
    SELECT *, d.idDocente
    FROM docentes d 
    LEFT JOIN docentes_estudios de ON (d.idDocente = de.idDocente)
    LEFT JOIN estudiossuperiores es ON (de.idEstudioSuperior = es.idEstudioSuperior)
    LEFT JOIN modalidades m ON (m.idModalidad = es.idModalidad)
    LEFT JOIN grados g ON (g.idGrado = es.idGrado)
    LEFT JOIN habilidadesblandas hb ON (d.idDocente = hb.idDocentes)
    LEFT JOIN idiomas_docente id ON (d.idDocente = id.idDocente)
    LEFT JOIN idiomas i ON (id.idIdioma = i.idIdioma)
    LEFT JOIN docente_experienciadocente dx ON (dx.idDocente = d.idDocente)
    LEFT JOIN experienciadocente ed ON (dx.idExperienciaDocente = ed.idExperienciaDocente)
    LEFT JOIN docente_experiencias dex ON (d.idDocente = dex.idDocente)
    LEFT JOIN experiencialaboral el ON (dex.idExperienciaLaboral = el.idExperienciaLaboral)
    LEFT JOIN docentes_publicacionesintelectuales dpi ON (d.idDocente = dpi.idDocente)
    LEFT JOIN produccionesintelectuales pi ON (dpi.idProduccionIntelectual = pi.idProduccionIntelectual)
    LEFT JOIN tipospublicaciones tp ON (pi.idTipoPublicacion = tp.idTipoPublicacion)
    LEFT JOIN paises p ON (p.idPais = pi.idPais)
      WHERE d.idDocente = ? AND d.estado = 'postulante'
    `;

    // Desestructurar resultados
    const [results]: [Postulante[], any] = await db.query<Postulante[]>(query, [
      Number(postulante),
    ]);

    db.end();

    if (results.length === 0) {
      return new Response(
        JSON.stringify({ error: "Postulante no encontrado" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(results[0]), { status: 200 });
  } catch (error) {
    console.error("Error al obtener el postulante:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener el postulante" }),
      { status: 500 }
    );
  }
}
