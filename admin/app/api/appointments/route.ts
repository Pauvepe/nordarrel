import { createServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("nordarrel_appointments")
    .select("*")
    .order("fecha", { ascending: true })
    .order("hora", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function PATCH(request: NextRequest) {
  const supabase = createServerClient();
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Falta id" }, { status: 400 });

  const { error } = await supabase.from("nordarrel_appointments").update(updates).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
