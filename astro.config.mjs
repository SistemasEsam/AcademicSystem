// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import dotenv from "dotenv";
import svgr from "vite-plugin-svgr";

// Carga las variables de entorno del archivo .env
dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    plugins: [
      svgr({
        include: "**/*.svg",
        svgrOptions: {
        }
      }),
    ],
    build: {
      rollupOptions: {
        external: ['dotenv'] // Indica que dotenv es un módulo externo
      }
    }
  }
});
