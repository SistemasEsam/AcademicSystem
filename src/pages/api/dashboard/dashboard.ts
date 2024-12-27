// src/pages/api/dashboard.ts
import { authenticateToken } from '../auth'; // Asegúrate de que la ruta es correcta
import type { APIContext } from "astro";

export async function GET({ request }: APIContext) {
  const { success, response } = authenticateToken(request);
  if (!success) {
    return response; // Redirige a la página de login si no está autenticado
  }

  return new Response(JSON.stringify({ message: 'Bienvenido al dashboard.' }), { status: 200 });
}
