import { connectToDatabase } from "../../../../utils/dbConect";
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

export async function GET({ params }: APIContext) {
  try {
    const { postulante } = params;
    console.log("Postulante recibido:", postulante); // Para depuración

    if (!postulante || typeof postulante !== "string" || !/^\d+$/.test(postulante)) {
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
          s.nombre AS sector,
          p.nombre AS pais_docente,
          doc.tipo AS tipo_documento,

          -- Estudios superiores
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idEstudio", es.idEstudioSuperior,
                  "carrera", es.carrera,
                  "nombre", es.nombre,
                  "universidad", es.universidad,
                  "pais", ep.nombre,
                  "fecha", es.fecha,
                  "modalidad", m.tipo,
                  "gradoTipo", g.tipo
              )
          ) AS estudiossuperiores,

          -- Experiencias docentes
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idExperiencia", ed.idExperienciaDocente,
                  "materia", ed.materia,
                  "calidad", ed.calidad,
                  "universidad", ed.universidad,
                  "concluidoEl", ed.concluidoEl
              )
          ) AS experienciasdocentes,

          -- Idiomas
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idIdiomaDocente", id.idIdiomaDocente,
                  "idioma", i.idioma,
                  "escritura", id.escritura,
                  "oral", id.oral,
                  "lectura", id.lectura,
                  "escucha", id.escucha
              )
          ) AS idiomas,

          -- Habilidades blandas
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idHabilidadBlanda", hb.idHabilidadBlanda,
                  "habilidad", hb.habilidad
              )
          ) AS habilidades_blandas,

          -- Experiencias laborales
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idExperienciaLaboral", el.idExperienciaLaboral,
                  "nombreEmpresa", el.nombreEmpresa,
                  "cargo", el.cargo,
                  "ciudad", el.ciudad,
                  "fechaInicio", el.fechaInicio,
                  "fechaFinal", el.fechaFinal,
                  "pais", epais.nombre,
                  "descripcion", el.descripcion,
                  "referencia", JSON_OBJECT(
                      "idReferencia", r.idReferencia,
                      "nombreCompleto", r.nombreCompleto,
                      "cargo", r.cargo,
                      "numeroContacto", r.numeroContacto
                  )
              )
          ) AS experienciaslaborales,

          -- Publicaciones intelectuales
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idProduccionIntelectual", pi.idProduccionIntelectual,
                  "nombre", pi.nombre,
                  "enlaceEditorial", pi.enlaceEditorial,
                  "pais", pp.nombre,
                  "fecha", pi.fecha,
                  "tipoPublicacion", tp.tipo
              )
          ) AS publicacionesintelectuales,

          -- Agendas
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idAgenda", ag.idAgenda,
                  "fecha", ag.fecha,
                  "linkZoom", ag.linkZoom
              )
          ) AS agendas,

          -- Áreas
          GROUP_CONCAT(
              JSON_OBJECT(
                  "idArea", ar.idArea
              )
          ) AS areas

      FROM 
          docentes d
          LEFT JOIN sectores s ON d.idSector = s.idSector
          LEFT JOIN paises p ON d.idPais = p.idPais
          LEFT JOIN documentos doc ON d.idDocumento = doc.idDocumentos
          LEFT JOIN docentes_estudios de ON d.idDocente = de.idDocente
          LEFT JOIN estudiossuperiores es ON de.idEstudioSuperior = es.idEstudioSuperior
          LEFT JOIN modalidades m ON m.idModalidad = es.idModalidad
          LEFT JOIN grados g ON g.idGrado = es.idGrado
          LEFT JOIN paises ep ON ep.idPais = es.idPais
          LEFT JOIN docente_experienciadocente ded ON d.idDocente = ded.idDocente
          LEFT JOIN experienciadocente ed ON ded.idExperienciaDocente = ed.idExperienciaDocente
          LEFT JOIN idiomas_docente id ON d.idDocente = id.idDocente
          LEFT JOIN idiomas i ON id.idIdioma = i.idIdioma
          LEFT JOIN habilidadesblandas hb ON d.idDocente = hb.idDocentes
          LEFT JOIN docente_experiencias dexp ON d.idDocente = dexp.idDocente
          LEFT JOIN experiencialaboral el ON dexp.idExperienciaLaboral = el.idExperienciaLaboral
          LEFT JOIN paises epais ON el.idPais = epais.idPais
          LEFT JOIN referencias r ON el.idReferencia = r.idReferencia
          LEFT JOIN docentes_publicacionesintelectuales dpi ON d.idDocente = dpi.idDocente
          LEFT JOIN produccionesintelectuales pi ON dpi.idProduccionIntelectual = pi.idProduccionIntelectual
          LEFT JOIN paises pp ON pi.idPais = pp.idPais
          LEFT JOIN tipospublicaciones tp ON pi.idTipoPublicacion = tp.idTipoPublicacion
          LEFT JOIN agendas ag ON d.idDocente = ag.idDocente
          LEFT JOIN areas ar ON d.idAreaInteres = ar.idArea
      WHERE 
          d.idDocente = ? 
          AND d.estado = 'postulante'
      GROUP BY 
          d.idDocente;
    `;


    // Ejecutar la consulta y desestructurar los resultados
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

    const postulanteData = results[0];

    // Parsear los campos que contienen JSON
    postulanteData.estudiossuperiores = JSON.parse(`[${postulanteData.estudiossuperiores}]`);
    postulanteData.experienciasdocentes = JSON.parse(`[${postulanteData.experienciasdocentes}]`);
    postulanteData.idiomas = JSON.parse(`[${postulanteData.idiomas}]`);
    postulanteData.habilidades_blandas = JSON.parse(`[${postulanteData.habilidades_blandas}]`);
    postulanteData.experienciaslaborales = JSON.parse(`[${postulanteData.experienciaslaborales}]`);
    postulanteData.publicacionesintelectuales = JSON.parse(`[${postulanteData.publicacionesintelectuales}]`);
    postulanteData.agendas = JSON.parse(`[${postulanteData.agendas}]`);
    postulanteData.areas = JSON.parse(`[${postulanteData.areas}]`);


    // Devolver los resultados sin el campo 'detalles'
    return new Response(JSON.stringify(postulanteData), { status: 200 });
  } catch (error) {
    console.error("Error al obtener el postulante:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener el postulante" }),
      { status: 500 }
    );
  }
}