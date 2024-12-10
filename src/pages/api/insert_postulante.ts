import { connectToDatabase } from "../../utils/dbConect";
import type { APIContext } from "astro";
import fs from "fs";
import path from "path";

export async function POST({ request }: APIContext) {
  try {
    const formData = await request.formData();
    // Extraer los datos del formulario
    const nombres = formData.get("nombres")?.toString();
    const apellidoPaterno = formData.get("apellidoPaterno")?.toString();
    const apellidoMaterno = formData.get("apellidoMaterno")?.toString();
    const correo = formData.get("correo")?.toString();
    const ciudadRadicacion = formData.get("ciudadRadicacion")?.toString();
    const idPais = formData.get("idPais")?.toString();
    const telefono = formData.get("telefono")?.toString();
    const fechaNacimiento = formData.get("fechaNacimiento")?.toString();
    const idAreaInteres = formData.get("idAreaInteres")?.toString();
    const idSector = formData.get("idSector")?.toString();
    const imagen = formData.get("imagen") as File | null; // Recibir la imagen

    // Validar los campos requeridos
    if (
      !nombres ||
      !apellidoPaterno ||
      !correo ||
      !ciudadRadicacion ||
      !idPais ||
      !telefono ||
      !fechaNacimiento ||
      !idAreaInteres ||
      !idSector
    ) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // Guardar la imagen en el servidor
    let imagePath = "";
    if (imagen) {
      const uploadDir = path.join(process.cwd(), "public/images/docentes");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileName = `${Date.now()}-${imagen.name}`;
      const filePath = path.join(uploadDir, fileName);

      // Leer la imagen y guardarla en el servidor
      const buffer = Buffer.from(await imagen.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imagePath = `/images/docentes/${fileName}`;
    }

    // Conectar a la base de datos e insertar los datos
    const db = await connectToDatabase();

    const query = `
      INSERT INTO docentes (
        nombres, apellidoPaterno, apellidoMaterno, correo,
        ciudadRadicacion, idPais, telefono, fechaNacimiento,
        idAreaInteres, idSector, fotografia, estado
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      nombres.trim(),
      apellidoPaterno.trim(),
      apellidoMaterno?.trim() || null,
      correo.trim().toLowerCase(),
      ciudadRadicacion.trim(),
      Number(idPais),
      telefono.trim(),
      fechaNacimiento.trim(),
      Number(idAreaInteres),
      Number(idSector),
      imagePath || null, // Guardar la ruta de la imagen en la base de datos
      "postulante",
    ];

    await db.execute(query, values);
    db.end();

    return new Response(
      JSON.stringify({ message: "Docente insertado correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Error al insertar datos" }), {
      status: 500,
    });
  }
}
