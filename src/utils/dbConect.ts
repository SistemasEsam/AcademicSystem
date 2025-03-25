import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno desde .env

export async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    
     
     
    });

    console.log("Conexión a la base de datos establecida exitosamente.");
    return connection;
  } catch (error: any) {
    console.error("Error al conectar con la base de datos:", error.message);
    throw error;
  }
      //host: "localhost",
      //user: "root",
      //password: "",
      //database: "bd_esam",
}
