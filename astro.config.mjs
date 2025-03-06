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
    host: true,
    port: 4321
  },
  vite: {
    server: {
      hmr: {
        clientPort: 4321 // Clave para Railway
      }
    }
  }
});