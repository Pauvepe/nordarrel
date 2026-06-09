// =====================================================================
// ADMIN - CONEXION DESDE EL NAVEGADOR (llave normal "anon")
// ---------------------------------------------------------------------
// La usa la pantalla de login para hacer el signInWithPassword contra
// Supabase Auth. Claves desde .env.local.
// =====================================================================
import { createClient } from '@supabase/supabase-js';

export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || 'public' } }
  );
}
