// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  preview: {
    allowedHosts: [
      "sistemacad-production.up.railway.app" // Dominio de Railway
    ]
  }
});