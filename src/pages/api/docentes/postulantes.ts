import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";

export async function GET({ request }: APIContext) {
  try {
    const db = await connectToDatabase();
    const url = new URL(request.url);
    
    const searchTerm = url.searchParams.get("search");
    const estado = url.searchParams.get("estado");

    if (searchTerm) {
      // Lógica de búsqueda avanzada
      const query = `
        SELECT * 
        FROM docentes 
        WHERE 
          estado IN ('postulante') AND
          (
            LOWER(nombres) LIKE ? OR 
            LOWER(correo) LIKE ? OR 
            numeroDocumento LIKE ? OR 
            LOWER(estudiossuperiores) LIKE ? OR 
            LOWER(cursos) LIKE ?
          )
      `;
      const likeSearch = `%${searchTerm.toLowerCase()}%`;
      const results = await db.query(query, [likeSearch, likeSearch, likeSearch, likeSearch, likeSearch]);
      db.end();

      return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Lógica existente para el filtro por estado
    let estadoCondition = "estado IN ('postulante', 'aprobado', 'rechazado')";
    if (estado && ["postulante", "aprobado", "rechazado"].includes(estado)) {
      estadoCondition = `estado = '${estado}'`;
    }

    const query = `
SELECT 
    d.idDocente,
    d.apellidoMaterno,
    d.apellidoPaterno,
    d.nombres,
    d.numeroReferencia,
    d.correo,
    d.telefono,
    d.numeroDocumento,
    d.fechaNacimiento,
    d.ciudadRadicacion,
    d.genero,
    d.direccion,
    d.estado,
    d.fotografia,
    d.agendado,

    -- Sector
    JSON_OBJECT('nombre', s.nombre) AS sector,

    -- País del docente
    JSON_OBJECT('nombre', p.nombre) AS pais_docente,

    -- Tipo de documento
    JSON_OBJECT('tipo', doc.tipo) AS tipo_documento,

    -- Estudios superiores
    JSON_ARRAYAGG(
        JSON_OBJECT(
        
            'tipo', IFNULL(te.tipo, ''),
            'carrera', IFNULL(es.carrera, ''),
            'nombre', IFNULL(es.nombre, ''),
            'universidad', IFNULL(es.universidad, ''),
            'pais', IFNULL(ep.nombre, ''),
            'fecha', IFNULL(es.fecha, ''),
            'modalidad', IFNULL(m.tipo, ''),
            'gradoTipo', IFNULL(g.tipo, '')
        )
    ) AS estudiossuperiores,

    -- Experiencias docentes
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idExperiencia', ed.idExperienciaDocente,
            'materia', ed.materia,
            'calidad', ed.calidad,
            'universidad', ed.universidad,
            'concluidoEl', ed.concluidoEl
        )
    ) AS experienciasdocentes,

    -- Idiomas
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idIdiomaDocente', id.idIdiomaDocente,
            'idioma', i.idioma,
            'escritura', id.escritura,
            'oral', id.oral,
            'lectura', id.lectura,
            'escucha', id.escucha
        )
    ) AS idiomas,

    -- Habilidades blandas
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idHabilidadBlanda', hb.idHabilidadBlanda,
            'habilidad', hb.habilidad
        )
    ) AS habilidades_blandas,

    -- Experiencias laborales
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idExperienciaLaboral', el.idExperienciaLaboral,
            'nombreEmpresa', el.nombreEmpresa,
            'cargo', el.cargo,
            'ciudad', el.ciudad,
            'fechaInicio', el.fechaInicio,
            'fechaFinal', el.fechaFinal,
            'pais', epais.nombre,
            'descripcion', el.descripcion,
            'referencia', JSON_OBJECT(
                'idReferencia', r.idReferencia,
                'nombreCompleto', r.nombreCompleto,
                'cargo', r.cargo,
                'numeroContacto', r.numeroContacto
            )
        )
    ) AS experienciaslaborales,

    -- Publicaciones intelectuales
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idProduccionIntelectual', pi.idProduccionIntelectual,
            'nombre', pi.nombre,
            'enlaceEditorial', pi.enlaceEditorial,
            'pais', pp.nombre,
            'fecha', pi.fecha,
            'tipoPublicacion', tp.tipo
        )
    ) AS publicacionesintelectuales,

    -- Nueva relación con 'agendas'
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'fecha', DATE_FORMAT(ag.fecha, '%Y-%m-%d %H:%i:%s'),
            'link', ag.linkZoom
        )
    ) AS detalles,

    -- Nueva relación con 'áreas'
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'idArea', ar.idArea
        )
    ) AS areas,
    
    -- Cursos
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'nombre', c.nombre,
            'universidad', c.lugar,
            'pais', p.nombre,
            'anio', c.fechaInicio
        )
    ) AS cursos

FROM 
    docentes d
    -- Relación con sectores
    LEFT JOIN sectores s ON d.idSector = s.idSector
    -- Relación con países (para el docente)
    LEFT JOIN paises p ON d.idPais = p.idPais
    -- Relación con documentos
    LEFT JOIN documentos doc ON d.idDocumento = doc.idDocumentos
    -- Relación con estudios superiores
    LEFT JOIN docentes_estudios de ON (d.idDocente = de.idDocente)
    LEFT JOIN estudiossuperiores es ON (de.idEstudioSuperior = es.idEstudioSuperior)
    LEFT JOIN tiposestudios te ON (te.idTipo = es.idTipo)
    LEFT JOIN modalidades m ON m.idModalidad = es.idModalidad
    LEFT JOIN grados g ON g.idGrado = es.idGrado
    LEFT JOIN paises ep ON ep.idPais = es.idPais  
    -- Relación con experiencias docentes
    LEFT JOIN docente_experienciadocente ded ON d.idDocente = ded.idDocente
    LEFT JOIN experienciadocente ed ON ded.idExperienciaDocente = ed.idExperienciaDocente
    -- Relación con idiomas
    LEFT JOIN idiomas_docente id ON d.idDocente = id.idDocente
    LEFT JOIN idiomas i ON id.idIdioma = i.idIdioma
    -- Relación con habilidades blandas
    LEFT JOIN habilidadesblandas hb ON d.idDocente = hb.idDocentes
    -- Relación con experiencias laborales
    LEFT JOIN docente_experiencias dexp ON d.idDocente = dexp.idDocente
    LEFT JOIN experiencialaboral el ON dexp.idExperienciaLaboral = el.idExperienciaLaboral
    LEFT JOIN paises epais ON el.idPais = epais.idPais
    LEFT JOIN referencias r ON el.idReferencia = r.idReferencia
    -- Relación con publicaciones intelectuales
    LEFT JOIN docentes_publicacionesintelectuales dpi ON d.idDocente = dpi.idDocente
    LEFT JOIN produccionesintelectuales pi ON dpi.idProduccionIntelectual = pi.idProduccionIntelectual
    LEFT JOIN paises pp ON pi.idPais = pp.idPais
    LEFT JOIN tipospublicaciones tp ON pi.idTipoPublicacion = tp.idTipoPublicacion
    -- Relación con agendas
    LEFT JOIN agendas ag ON ag.idDocente = d.idDocente
    -- Relación con áreas
    LEFT JOIN areas ar ON d.idAreaInteres = ar.idArea
    -- Relación con cursos
    LEFT JOIN docente_curso dc ON (d.idDocente = dc.idDocente)
    LEFT JOIN cursos c ON (c.idCurso = dc.idCurso)
    WHERE ${estadoCondition} 
    GROUP BY 
    d.idDocente;
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
