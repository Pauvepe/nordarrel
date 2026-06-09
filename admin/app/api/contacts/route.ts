// =====================================================================
// API ADMIN: CONTACTOS  (GET busca / PATCH edita)  /api/contacts
// ---------------------------------------------------------------------
// GET lista o busca contactos (por nombre, email o telefono). PATCH
// guarda cambios (p. ej. notas internas). Lo usa la pestana Contactos.
// =====================================================================
import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createServerClient();
  const search = new URL(request.url).searchParams.get("search")?.trim();
  let query = supabase.from("nordarrel_contacts").select("*").order("updated_at", { ascending: false });

  if (search) {
    query = query.or(`nombre.ilike.%${search}%,email.ilike.%${search}%,telefono.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function PATCH(request: NextRequest) {
  const supabase = createServerClient();
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });

  const { error } = await supabase.from("nordarrel_contacts").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
