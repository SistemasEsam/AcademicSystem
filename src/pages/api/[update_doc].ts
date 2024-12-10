import { connectToDatabase } from "../../utils/dbConect";
import type { APIContext } from "astro";

export async function PUT({ request }: APIContext) {
    try {
      const body = await request.json();
  
      // Desestructurar los datos principales
      const {
        idDocente, apellidoMaterno, apellidoPaterno, nombres, numeroReferencia, correo, telefono,
        idPais, idDocumento, numeroDocumento, fechaNacimiento, ciudadRadicacion, genero, direccion,
        estado, universidad, carrera, idGrado, idModalidad, tipo, idIdioma, escritura, oral, lectura, escucha,
        nombreEmpresa, cargo, ciudad, fechaInicio, fechaFinal, descripcion, enlaceEditorial, idTipoPublicacion
      } = body;
  
      if (!idDocente || !estado) {
        return new Response(
          JSON.stringify({ error: "Faltan campos obligatorios o el estado es inválido" }),
          { status: 400 }
        );
      }
  
      const db = await connectToDatabase();
      await db.beginTransaction();
  
      // Actualizar la tabla `docentes`
      const docenteQuery = `
        UPDATE docentes 
        SET apellidoMaterno = ?, apellidoPaterno = ?, nombres = ?, numeroReferencia = ?, correo = ?, 
            telefono = ?, idPais = ?, idDocumento = ?, numeroDocumento = ?, fechaNacimiento = ?, 
            ciudadRadicacion = ?, genero = ?, direccion = ?, estado = ? 
        WHERE idDocente = ?
      `;
      const docenteValues = [
        apellidoMaterno, apellidoPaterno, nombres, numeroReferencia, correo, telefono,
        idPais, idDocumento, numeroDocumento, fechaNacimiento, ciudadRadicacion,
        genero, direccion, estado, idDocente
      ];
      await db.execute(docenteQuery, docenteValues);
 
  
      await db.commit();
      db.end();
  
      return new Response(
        JSON.stringify({ message: "Datos del docente actualizados correctamente" }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error al actualizar los datos del docente:", error);
  
      return new Response(
        JSON.stringify({ error: "Error al actualizar los datos del docente" }),
        { status: 500 }
      );
    }
  }
  