// =====================================================================
// API ADMIN: SUSCRITOS A NEWSLETTER  (GET /api/newsletter)
// ---------------------------------------------------------------------
// Devuelve la lista de suscritos. La usa la pestana Contactos para marcar
// quien esta en la newsletter.
// =====================================================================
import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("nordarrel_newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}
