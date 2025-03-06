// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  preview: {
    allowedHosts: ["sistemacad-production.up.railway.app"], // Dominio de Railway
    host: "0.0.0.0", // Escucha en todas las interfaces
    port: 4321,
  },
});