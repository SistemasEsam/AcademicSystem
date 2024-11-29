import mysql from "mysql2/promise";

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "esam_db",
    });

    console.log("Conexión a la base de datos establecida exitosamente.");
    return connection;
  } catch (error: any) {
    console.error("Error al conectar con la base de datos:", error.message);
    throw error;
  }
}
