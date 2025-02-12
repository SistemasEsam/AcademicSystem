import { connectToDatabase } from "../../utils/dbConect";
import type { APIContext } from "astro";
import fs from "fs";
import path from "path";

export async function POST({ request }: APIContext) {
  try {
    // Se obtiene el formData en lugar de request.json()
    const formData = await request.formData();

    // Extraer los campos enviados por el formulario
    const idDocente = formData.get("idDocente")?.toString();
    const apellidoMaterno = formData.get("apellidoMaterno")?.toString();
    const apellidoPaterno = formData.get("apellidoPaterno")?.toString();
    const nombres = formData.get("nombres")?.toString();
    const numeroReferencia = formData.get("numeroReferencia")?.toString();
    const correo = formData.get("correo")?.toString();
    const telefono = formData.get("telefono")?.toString();
    const numeroDocumento = formData.get("numeroDocumento")?.toString();
    const fechaNacimiento = formData.get("fechaNacimiento")?.toString();
    const ciudadRadicacion = formData.get("ciudadRadicacion")?.toString();
    const genero = formData.get("genero")?.toString();
    const direccion = formData.get("direccion")?.toString();
    const estado = formData.get("estado")?.toString();
    // Se recibe el archivo de imagen
    const fotografia = formData.get("fotografia") as File | null;

    // Validar campos obligatorios
    if (!idDocente || !nombres || !apellidoPaterno || !correo) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Manejo de la imagen (si se envió una nueva)
    let imagePath = null;
    if (fotografia && fotografia.size > 0) {
      console.log("Imagen recibida en el backend:", fotografia);

      // Definir el directorio de destino (asegúrate de que exista o se cree)
      const uploadDir = path.join(process.cwd(), "public/images/docentes");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Se genera un nombre único para el archivo
      const fileName = `${Date.now()}-${fotografia.name || "imagen"}`;
      const filePath = path.join(uploadDir, fileName);

      try {
        // Convertir el archivo a buffer y escribirlo en disco
        const buffer = Buffer.from(await fotografia.arrayBuffer());
        fs.writeFileSync(filePath, buffer);
        console.log("La imagen se guardó en:", filePath);
        imagePath = `/images/docentes/${fileName}`;
      } catch (err) {
        console.error("Error al guardar la imagen:", err);
        return new Response(
          JSON.stringify({ error: "Error al guardar la imagen" }),
          { status: 500 }
        );
      }
    }

    // Conectar a la base de datos
    const db = await connectToDatabase();

    // Consulta de actualización, incluyendo la ruta de la imagen
    const docenteQuery = `
      UPDATE docentes 
      SET 
        apellidoMaterno = ?, 
        apellidoPaterno = ?, 
        nombres = ?, 
        numeroReferencia = ?, 
        correo = ?, 
        telefono = ?, 
        numeroDocumento = ?, 
        fechaNacimiento = ?, 
        ciudadRadicacion = ?, 
        genero = ?, 
        direccion = ?, 
        estado = ?,
        fotografia = ?
      WHERE idDocente = ?;
    `;

    const docenteValues = [
      apellidoMaterno?.trim() || null,
      apellidoPaterno.trim(),
      nombres.trim(),
      numeroReferencia?.trim() || null,
      correo.trim().toLowerCase(),
      telefono?.trim() || null,
      numeroDocumento?.trim() || null,
      fechaNacimiento
        ? new Date(fechaNacimiento).toISOString().split("T")[0]
        : null,
      ciudadRadicacion?.trim() || null,
      genero?.trim() || null,
      direccion?.trim() || null,
      estado?.trim() || null,
      imagePath, // Si no se envió nueva imagen, se almacenará null (puedes adaptar esta lógica para conservar la foto actual)
      idDocente,
    ];

    console.log("Actualizando docente con:", docenteValues);

    const [docenteResult]: any = await db.execute(docenteQuery, docenteValues);
    console.log("Resultado de actualización del docente:", docenteResult);

    db.end();

    return new Response(
      JSON.stringify({ message: "Datos actualizados correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al actualizar datos" }),
      { status: 500 }
    );
  }
}
