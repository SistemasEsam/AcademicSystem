// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node"; // Nombre correcto del paquete

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: node({ // Usa la variable correcta "node"
    mode: "standalone"
  }),
  server: {
    host: true, // Necesario para exponer en Docker
    port: 4321
  }
});