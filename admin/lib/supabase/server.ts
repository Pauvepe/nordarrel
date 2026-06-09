// =====================================================================
// ADMIN - CONEXION SEGURA CON LA BASE DE DATOS (llave maestra, servidor)
// ---------------------------------------------------------------------
// La usan las APIs internas del admin para leer/escribir datos. Claves
// desde .env.local. Equivalente al supabase-server.ts de la web.
// =====================================================================
import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false },
      db: { schema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'public' },
    }
  );
}
