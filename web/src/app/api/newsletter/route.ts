import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { sendNewsletterWelcome } from "@/lib/email";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = normalizeEmail(String(body.email || ""));

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email invalido" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data: existing } = await supabase
    .from("nordarrel_newsletter_subscribers")
    .select("id,estado")
    .eq("email", email)
    .maybeSingle();

  if (existing?.estado === "activo") {
    return NextResponse.json({ error: "Este email ya esta suscrito" }, { status: 409 });
  }

  const { data: contact } = await supabase
    .from("nordarrel_contacts")
    .upsert(
      { email, nombre: email.split("@")[0], newsletter: true, canal_origen: "newsletter" },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  const { error } = await supabase
    .from("nordarrel_newsletter_subscribers")
    .upsert(
      { email, estado: "activo", origen: body.origen || "footer", contact_id: contact?.id || null },
      { onConflict: "email" }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await sendNewsletterWelcome({ email }).catch(() => null);

  return NextResponse.json({ success: true });
}
