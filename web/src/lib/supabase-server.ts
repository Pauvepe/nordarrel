// =====================================================================
// CONEXION SEGURA CON LA BASE DE DATOS (solo servidor)
// ---------------------------------------------------------------------
// QUE ES: abre la conexion con Supabase usando la LLAVE MAESTRA
//   (service_role). Esta llave puede escribir cualquier cosa, por eso
//   SOLO se usa aqui, en el servidor, nunca en el navegador del usuario.
// QUIEN LO USA: las APIs de /api (appointments, availability, newsletter).
// LAS CLAVES: se leen de .env.local, no estan escritas en el codigo.
// =====================================================================
import { createClient } from "@supabase/supabase-js";

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
    db: { schema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "public" },
  });
}
