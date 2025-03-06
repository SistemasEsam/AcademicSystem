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
    host: "0.0.0.0", // Escucha en todas las interfaces
    port: 4321,
    headers: {
      "Access-Control-Allow-Origin": "*" // Permite CORS
    }
  },
  vite: {
    preview: {
      host: "0.0.0.0",
      port: 4321
    }
  }
});