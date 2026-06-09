import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  const today = new Date().toISOString().slice(0, 10);

  const [{ count: contactos }, { count: newsletter }, { count: citasPendientes }, { data: proximas }] = await Promise.all([
    supabase.from("nordarrel_contacts").select("id", { count: "exact", head: true }),
    supabase.from("nordarrel_newsletter_subscribers").select("id", { count: "exact", head: true }).eq("estado", "activo"),
    supabase.from("nordarrel_appointments").select("id", { count: "exact", head: true }).neq("estado", "cancelada").gte("fecha", today),
    supabase.from("nordarrel_appointments").select("*").neq("estado", "cancelada").gte("fecha", today).order("fecha").order("hora").limit(6),
  ]);

  return NextResponse.json({ contactos, newsletter, citasPendientes, proximas: proximas || [] });
}
