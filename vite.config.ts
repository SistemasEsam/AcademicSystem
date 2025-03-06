import { defineConfig } from "vite";

export default defineConfig({
  preview: {
    allowedHosts: [
      "sistemacad-production.up.railway.app", // Dominio de Railway
      "localhost" // Para pruebas locales
    ],
    host: "0.0.0.0", // Obligatorio para Docker
    port: 4321,
    strictPort: true // Evita cambios de puerto automáticos
  },
  server: {
    host: "0.0.0.0", // Asegura que el servidor escuche externamente
    port: 4321
  }
});