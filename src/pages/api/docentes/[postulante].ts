import { connectToDatabase } from "../../../utils/dbConect";
import type { APIContext } from "astro";
import type { RowDataPacket } from "mysql2";

interface EstudioSuperior {
    idEstudio: string;
    carrera: string;
    nombre: string;
    universidad: string;
    pais: string;
    fecha: string;
    modalidad: string;
    gradoTipo: string;
  }
  
  interface ExperienciaDocente {
    idExperiencia: string;
    materia: string;
    calidad: string;
    universidad: string;
    concluidoEl: string;
  }
  
  interface Idioma {
    idIdiomaDocente: string;
    idioma: string;
    escritura: string;
    oral: string;
    lectura: string;
    escucha: string;
  }
  
  interface HabilidadBlanda {
    idHabilidadBlanda: string;
    habilidad: string;
  }
  
  interface ExperienciaLaboral {
    idExperienciaLaboral: string;
    nombreEmpresa: string;
    cargo: string;
    ciudad: string;
    fechaInicio: string;
    fechaFinal: string;
    pais: string;
    descripcion: string;
    referencia: {
      idReferencia: string;
      nombreCompleto: string;
      cargo: string;
      numeroContacto: string;
    };
  }
  
  interface PublicacionIntelectual {
    idProduccionIntelectual: string;
    nombre: string;
    enlaceEditorial: string;
    pais: string;
    fecha: string;
    tipoPublicacion: string;
  }
  
  interface Agenda {
    idAgenda: string;
    fecha: string;
    linkZoom: string;
  }
  
  interface Area {
    idArea: string;
  }
  
  export interface Postulante extends RowDataPacket {
    idDocente: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    correo: string;
    ciudadRadicacion: string;
    telefono: string;
    estado: string;
    fotografia: string;
    fechaNacimiento: string;
    estudiosuperiores: EstudioSuperior[];
    experienciasdocentes: ExperienciaDocente[];
    idiomas: Idioma[];
    habilidades_blandas: HabilidadBlanda[];
    experienciaslaborales: ExperienciaLaboral[];
    publicacionesintelectuales: PublicacionIntelectual[];
    agendas: Agenda[];
    areas: Area[];
    numeroReferencia: string;
    numeroDocumento: string;
    genero: string;
    direccion: string;
    sector: string;
    pais_docente: string;
    tipo_documento: string;
  }

export async function GET({ params, request }: APIContext) {
  try {
    const { postulante } = params;
    const db = await connectToDatabase();
    const url = new URL(request.url);
    
    const estado = url.searchParams.get("estado");
    if (!postulante || isNaN(Number(postulante))) {
      return new Response(
        JSON.stringify({ error: "ID del postulante inválido" }),
        { status: 400 }
      );
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
CASE
    WHEN EXISTS (
        SELECT 1
        FROM docentes_estudios de
        WHERE de.idDocente = d.idDocente
    ) THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idEstudio', COALESCE(es.idEstudioSuperior, ''),
                    'idPais', COALESCE(es.idPais, ''),
                    'idGrado', COALESCE(es.idGrado, ''),
                    'idModalidad', COALESCE(es.idModalidad, ''),
                    'tipo', COALESCE(te.tipo, ''),
                    'carrera', COALESCE(es.carrera, ''),
                    'nombre', COALESCE(es.nombre, ''),
                    'universidad', COALESCE(es.universidad, ''),
                    'pais', COALESCE(ep.nombre, ''),
                    'fecha', COALESCE(es.fecha, ''),
                    'modalidad', COALESCE(m.tipo, ''),
                    'gradoTipo', COALESCE(g.tipo, ''),
                    'idTipo', COALESCE(te.idTipo, '')
                )
            ), JSON_ARRAY()
        )
        FROM docentes_estudios de
        LEFT JOIN estudiossuperiores es ON de.idEstudioSuperior = es.idEstudioSuperior
        LEFT JOIN tiposestudios te ON es.idTipo = te.idTipo
        LEFT JOIN modalidades m ON es.idModalidad = m.idModalidad
        LEFT JOIN grados g ON es.idGrado = g.idGrado
        LEFT JOIN paises ep ON es.idPais = ep.idPais
        WHERE de.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS estudiossuperiores,

-- Experiencias docentes
CASE
    WHEN COUNT(ed.idExperienciaDocente) > 0 THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idExperiencia', COALESCE(ed.idExperienciaDocente, ''),
                    'materia', COALESCE(ed.materia, ''),
                    'calidad', COALESCE(ed.calidad, ''),
                    'universidad', COALESCE(ed.universidad, ''),
                    'concluidoEl', COALESCE(ed.concluidoEl, '')
                )
            ), JSON_ARRAY()
        )
        FROM docente_experienciadocente ded
        JOIN experienciadocente ed ON ded.idExperienciaDocente = ed.idExperienciaDocente
        WHERE ded.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS experienciasdocentes,

-- Idiomas
CASE
    WHEN COUNT(id.idIdiomaDocente) > 0 THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idIdiomaDocente', COALESCE(id.idIdiomaDocente, ''),
                    'idIdioma', COALESCE(id.idIdioma, ''),
                    'idioma', COALESCE(i.idioma, ''),
                    'escritura', COALESCE(id.escritura, ''),
                    'oral', COALESCE(id.oral, ''),
                    'lectura', COALESCE(id.lectura, ''),
                    'escucha', COALESCE(id.escucha, '')
                )
            ), JSON_ARRAY()
        )
        FROM idiomas_docente id
        JOIN idiomas i ON id.idIdioma = i.idIdioma
        WHERE id.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS idiomas,

-- Habilidades blandas
CASE
    WHEN COUNT(hb.idHabilidadBlanda) > 0 THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idHabilidadBlanda', COALESCE(hb.idHabilidadBlanda, ''),
                    'habilidad', COALESCE(hb.habilidad, '')
                )
            ), JSON_ARRAY()
        )
        FROM habilidadesblandas hb
        WHERE hb.idDocentes = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS habilidades_blandas,

-- Experiencias laborales
CASE
    WHEN EXISTS (
        SELECT 1
        FROM docente_experiencias dexp
        WHERE dexp.idDocente = d.idDocente
    ) THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idExperienciaLaboral', COALESCE(el.idExperienciaLaboral, ''),
                    'nombreEmpresa', COALESCE(el.nombreEmpresa, ''),
                    'cargo', COALESCE(el.cargo, ''),
                    'ciudad', COALESCE(el.ciudad, ''),
                    'fechaInicio', COALESCE(el.fechaInicio, ''),
                    'fechaFinal', COALESCE(el.fechaFinal, ''),
                    'pais', COALESCE(epais.nombre, ''),
                    'descripcion', COALESCE(el.descripcion, ''),
                    'referencia', JSON_OBJECT(
                        'idReferencia', COALESCE(r.idReferencia, ''),
                        'nombreCompleto', COALESCE(r.nombreCompleto, ''),
                        'cargoR', COALESCE(r.cargo, ''),
                        'numeroContacto', COALESCE(r.numeroContacto, '')
                    )
                )
            ), JSON_ARRAY()
        )
        FROM docente_experiencias dexp
        LEFT JOIN experiencialaboral el ON dexp.idExperienciaLaboral = el.idExperienciaLaboral
        LEFT JOIN paises epais ON el.idPais = epais.idPais
        LEFT JOIN referencias r ON el.idReferencia = r.idReferencia
        WHERE dexp.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS experienciaslaborales,

-- Publicaciones intelectuales
CASE
    WHEN COUNT(pi.idProduccionIntelectual) > 0 THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idProduccionIntelectual', COALESCE(pi.idProduccionIntelectual, ''),
                    'nombre', COALESCE(pi.nombre, ''),
                    'enlaceEditorial', COALESCE(pi.enlaceEditorial, ''),
                    'pais', COALESCE(pp.nombre, ''),
                    'fecha', COALESCE(pi.fecha, ''),
                    'tipoPublicacion', COALESCE(tp.tipo, '')
                )
            ), JSON_ARRAY()
        )
        FROM docentes_publicacionesintelectuales dpi
        JOIN produccionesintelectuales pi ON dpi.idProduccionIntelectual = pi.idProduccionIntelectual
        LEFT JOIN paises pp ON pi.idPais = pp.idPais
        LEFT JOIN tipospublicaciones tp ON pi.idTipoPublicacion = tp.idTipoPublicacion
        WHERE dpi.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS publicacionesintelectuales,

-- Agendas
CASE
    WHEN COUNT(ag.idAgenda) > 0 THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'fecha', COALESCE(DATE_FORMAT(ag.fecha, '%Y-%m-%d %H:%i:%s'), ''),
                    'link', COALESCE(ag.linkZoom, '')
                )
            ), JSON_ARRAY()
        )
        FROM agendas ag
        WHERE ag.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS detalles,

-- Áreas
CASE
    WHEN COUNT(ar.idArea) > 0 THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idArea', COALESCE(ar.idArea, '')
                )
            ), JSON_ARRAY()
        )
        FROM areas ar
        WHERE ar.idArea = d.idAreaInteres
    )
    ELSE JSON_ARRAY()
END AS areas,

-- Cursos
CASE
    WHEN EXISTS (
        SELECT 1
        FROM docente_curso dc
        WHERE dc.idDocente = d.idDocente
    ) THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'nombre', COALESCE(c.nombre, ''),
                    'universidad', COALESCE(c.lugar, ''),
                    'pais', COALESCE(p.nombre, ''),
                    'anio', COALESCE(c.fechaInicio, '')
                )
            ), JSON_ARRAY()
        )
        FROM docente_curso dc
        LEFT JOIN cursos c ON dc.idCurso = c.idCurso
        LEFT JOIN paises p ON c.idPais = p.idPais
        WHERE dc.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS cursos,

-- Archivos del docente
CASE
    WHEN COUNT(ad.id_ad) > 0 THEN (
        SELECT COALESCE(
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idArchivo', COALESCE(ad.id_ad, ''),
                    'tipoArchivo', COALESCE(ta.tipo, ''),
                    'nombreArchivo', COALESCE(ad.nombre_archivo, ''),
                    'rutaArchivo', COALESCE(ad.ruta_archivo, ''),
                    'fechaSubida', COALESCE(DATE_FORMAT(ad.createdAt, '%Y-%m-%d %H:%i:%s'), '')
                )
            ), JSON_ARRAY()
        )
        FROM archivos_docentes ad
        LEFT JOIN tipo_archivo ta ON ad.idTipo_archivo = ta.id_ta
        WHERE ad.idDocente = d.idDocente
    )
    ELSE JSON_ARRAY()
END AS archivosDocente

FROM 
    docentes d
    -- Relación con sectores
    LEFT JOIN sectores s ON d.idSector = s.idSector
    -- Relación con países (para el docente)
    LEFT JOIN paises p ON d.idPais = p.idPais
    -- Relación con documentos
    LEFT JOIN documentos doc ON d.idDocumento = doc.idDocumentos
     -- Relación con archivos docentes
    LEFT JOIN archivos_docentes ad ON d.idDocente = ad.idDocente
    LEFT JOIN tipo_archivo ta ON ad.idTipo_archivo = ta.id_ta
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
WHERE 
    d.idDocente = ?  AND ${estadoCondition} 
GROUP BY 
    d.idDocente;
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
