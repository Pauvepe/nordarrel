import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  const { data } = await supabase.from("servicios_ajustes").select("*");
  return NextResponse.json(data || []);
}

export async function PUT(request: NextRequest) {
  const supabase = createServerClient();
  const body = await request.json();

  for (const [clave, valor] of Object.entries(body)) {
    await supabase
      .from("servicios_ajustes")
      .upsert({ clave, valor: String(valor), tipo: "text" }, { onConflict: "clave" });
  }

  return NextResponse.json({ success: true });
}
