// =====================================================================
// API: HORAS OCUPADAS  (GET /api/availability?from=...&to=...)
// ---------------------------------------------------------------------
// El calendario llama aqui para saber que dias/horas ya estan pillados.
// Pregunta a Supabase por las reservas (que no esten canceladas) y por
// los bloqueos manuales del calendario, y devuelve la lista "ocupado".
// Con eso el calendario pinta esas horas como no disponibles.
// =====================================================================
import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!from || !to) {
    return NextResponse.json({ error: "Rango invalido" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data: appointments, error } = await supabase
    .from("nordarrel_appointments")
    .select("fecha,hora,tipo,estado")
    .gte("fecha", from)
    .lte("fecha", to)
    .neq("estado", "cancelada");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: blocks } = await supabase
    .from("nordarrel_calendar_blocks")
    .select("fecha,hora,tipo")
    .gte("fecha", from)
    .lte("fecha", to)
    .eq("activo", true);

  const occupied = [
    ...(appointments || []).map((item) => ({
      fecha: item.fecha,
      hora: String(item.hora).slice(0, 5),
      tipo: item.tipo,
    })),
    ...(blocks || []).map((item) => ({
      fecha: item.fecha,
      hora: item.hora ? String(item.hora).slice(0, 5) : null,
      tipo: item.tipo,
    })),
  ];

  return NextResponse.json({ occupied });
}
