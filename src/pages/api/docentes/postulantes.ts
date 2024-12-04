import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function GET(_: APIContext) {
  try {
    const db = await connectToDatabase();

    const query = `
      SELECT *
      FROM docentes d 
      LEFT JOIN docentes_estudios de ON (d.idDocente = de.idDocente)
      LEFT JOIN estudiossuperiores es ON (de.idEstudioSuperior = es.idEstudioSuperior)
      LEFT JOIN modalidades m ON (m.idModalidad = es.idModalidad)
      LEFT JOIN gados g ON (g.idGrado = es.idGrado)
      LEFT JOIN habilidadesblandas hb ON (d.idDocente = hb.idDocente)
      LEFT JOIN idiomasdocente id ON (d.idDocente = id.idDocente)
      LEFT JOIN idiomas i ON (id.idIdioma = i.idIdioma)
      LEFT JOIN docente_experenciadocente dx ON (dx.idDocente = d.idDocente)
      LEFT JOIN experienciadocente ed ON (dx.idExperienciaDocente = ed.idExperienciaDocente)
      LEFT JOIN docentes_experiencias dex ON (d.idDocente = dex.idDocente)
      LEFT JOIN experiencialaboral el ON (dex.idExperienciaLaboral = el.idExperienciaLaboral)
      LEFT JOIN docentes_publicacionesintelectuales dpi ON (d.idDocente = dpi.idDocente)
      LEFT JOIN produccionesintelectuales pi ON (dpi.idProduccionIntelectual = pi.idProduccionIntelectual)
      LEFT JOIN tipopublicaciones tp ON (pi.idTipoPublicacion = tp.idTipoPublicacion)
      LEFT JOIN paises p ON (p.idPais = pi.idPais)
      WHERE estado = 'postulante'
    `;

    const [results] = await db.query(query);

    db.end();

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    console.error("Error al obtener los docentes postulantes:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener los docentes postulantes" }),
      { status: 500 }
    );
  }
}
