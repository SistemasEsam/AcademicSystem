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
    s.nombre AS sector,

    -- País del docente
    p.nombre AS pais_docente,

    -- Tipo de documento
    doc.tipo AS tipo_documento,

    -- Estudios superiores
   CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"tipo":"', IFNULL(te.tipo, ''), '",',
            '"carrera":"', IFNULL(es.carrera, ''), '",',
            '"nombre":"', IFNULL(es.nombre, ''), '",',
            '"universidad":"', IFNULL(es.universidad, ''), '",',
            '"pais":"', IFNULL(ep.nombre, ''), '",',
            '"fecha":"', IFNULL(es.fecha, ''), '",',
            '"modalidad":"', IFNULL(m.tipo, ''), '",',
            '"gradoTipo":"', IFNULL(g.tipo, ''), '"}'
        ) SEPARATOR ','
    ), 
']') AS estudiossuperiores,


    -- Experiencias docentes
    CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"idExperiencia":"', ed.idExperienciaDocente, '",',
            '"materia":"', ed.materia, '",',
            '"calidad":"', ed.calidad, '",',
            '"universidad":"', ed.universidad, '",',
            '"concluidoEl":"', ed.concluidoEl, '"}'
        ) SEPARATOR ','
    ), 
']') AS experienciasdocentes,


    -- Idiomas
    CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"idIdiomaDocente":"', id.idIdiomaDocente, '",',
            '"idioma":"', i.idioma, '",',
            '"escritura":"', id.escritura, '",',
            '"oral":"', id.oral, '",',
            '"lectura":"', id.lectura, '",',
            '"escucha":"', id.escucha, '"}'
        ) SEPARATOR ','
    ), 
']') AS idiomas,


    -- Habilidades blandas
    CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"idHabilidadBlanda":"', hb.idHabilidadBlanda, '",',
            '"habilidad":"', hb.habilidad, '"}'
        ) SEPARATOR ','
    ), 
']') AS habilidades_blandas,


    -- Experiencias laborales
   CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"idExperienciaLaboral":"', el.idExperienciaLaboral, '",',
            '"nombreEmpresa":"', el.nombreEmpresa, '",',
            '"cargo":"', el.cargo, '",',
            '"ciudad":"', el.ciudad, '",',
            '"fechaInicio":"', el.fechaInicio, '",',
            '"fechaFinal":"', el.fechaFinal, '",',
            '"pais":"', epais.nombre, '",',
            '"descripcion":"', el.descripcion, '",',
            '"referencia":{',
                '"idReferencia":"', r.idReferencia, '",',
                '"nombreCompleto":"', r.nombreCompleto, '",',
                '"cargo":"', r.cargo, '",',
                '"numeroContacto":"', r.numeroContacto, '"}',
            '}'
        ) SEPARATOR ','
    ), 
']') AS experienciaslaborales,

    -- Publicaciones intelectuales
    CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"idProduccionIntelectual":"', pi.idProduccionIntelectual, '",',
            '"nombre":"', pi.nombre, '",',
            '"enlaceEditorial":"', pi.enlaceEditorial, '",',
            '"pais":"', pp.nombre, '",',
            '"fecha":"', pi.fecha, '",',
            '"tipoPublicacion":"', tp.tipo, '"}'
        ) SEPARATOR ','
    ), 
']') AS publicacionesintelectuales,


    -- Nueva relación con 'agendas'
  CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"fecha":"', DATE_FORMAT(ag.fecha, '%Y-%m-%d %H:%i:%s'), '",',
            '"link":"', ag.linkZoom, '"}'
        ) SEPARATOR ','
    ), 
']') AS detalles,


    -- Nueva relación con 'áreas'
    CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"idArea":"', ar.idArea, '"}'
        ) SEPARATOR ','
    ), 
']') AS areas,

    
    CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{',
            '"nombre":"', c.nombre, '",',
            '"universidad":"', c.lugar, '",',
            '"pais":"', p.nombre, '",',
            '"anio":"', c.fechaInicio, '"}'
        ) SEPARATOR ','
    ), 
']') AS cursos


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
    LEFT JOIN docente_curso dc ON (d.idDocente = de.idDocente )
    LEFT JOIN cursos c ON (c.idCurso = dc.idCurso)
WHERE 
    d.idDocente = ?  AND d.estado = 'postulante'
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
// Aquí procesamos los campos con GROUP_CONCAT como JSON
const postulanteData = results[0];

// Convierte los campos GROUP_CONCAT a objetos JSON válidos
postulanteData.experienciasdocentes = JSON.parse(postulanteData.experienciasdocentes);
postulanteData.idiomas = JSON.parse(postulanteData.idiomas);
postulanteData.habilidades_blandas = JSON.parse(postulanteData.habilidades_blandas);
postulanteData.experienciaslaborales = JSON.parse(postulanteData.experienciaslaborales);
postulanteData.publicacionesintelectuales = JSON.parse(postulanteData.publicacionesintelectuales);
postulanteData.detalles = JSON.parse(postulanteData.detalles);
postulanteData.areas = JSON.parse(postulanteData.areas);
postulanteData.cursos = JSON.parse(postulanteData.cursos);

return new Response(JSON.stringify(postulanteData), { status: 200 });
} catch (error) {
console.error("Error al obtener el postulante:", error);
return new Response(
  JSON.stringify({ error: "Error al obtener el postulante" }),
  { status: 500 }
);
}
}
