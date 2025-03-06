import { defineConfig } from "vite";

export default defineConfig({
  preview: {
    allowedHosts: [
      "sistemacad-production.up.railway.app",
      "localhost",
      "0.0.0.0" // Añade esto explícitamente
    ],
    host: "0.0.0.0",
    port: 4321,
    strictPort: true
  },
  build: {
    chunkSizeWarningLimit: 2000 // Ignora advertencias de chunks grandes
  }
});