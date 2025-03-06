import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  server: {
    host: true, // Habilita exposición en red
    port: 4321
  },
  vite: {
    // Hereda la configuración de vite.config.js
  }
});