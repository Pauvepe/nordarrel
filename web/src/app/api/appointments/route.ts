import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { isValidSlot, type BookingMode } from "@/lib/booking-rules";
import { sendAppointmentConfirmation, sendAdminNewAppointment } from "@/lib/email";

function clean(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const tipo = clean(body.tipo) as BookingMode;
  const fecha = clean(body.fecha);
  const hora = clean(body.hora);
  const email = clean(body.email).toLowerCase();
  const telefono = clean(body.telefono).replace(/\D/g, "");
  const nombre = clean(body.nombre);

  if (!["diagnostico", "cita"].includes(tipo) || !isValidSlot(tipo, fecha, hora)) {
    return NextResponse.json({ error: "Horario no disponible" }, { status: 400 });
  }

  if (!nombre || !email.includes("@") || telefono.length < 9) {
    return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const edad = body.edad ? Number(body.edad) : null;
  const motivo = clean(body.motivo || body.preocupacion);

  const { data: contact, error: contactError } = await supabase
    .from("nordarrel_contacts")
    .upsert(
      {
        nombre,
        email,
        telefono,
        edad,
        canal_origen: tipo,
        segmento: tipo === "diagnostico" ? "lead" : "paciente",
        ultimo_motivo: motivo,
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (contactError) return NextResponse.json({ error: contactError.message }, { status: 500 });

  const { error } = await supabase.from("nordarrel_appointments").insert({
    contact_id: contact.id,
    tipo,
    fecha,
    hora,
    estado: "pendiente",
    nombre,
    email,
    telefono,
    motivo,
    edad,
    preocupacion: clean(body.preocupacion),
    desde_cuando: clean(body.desde_cuando),
    tratamientos_previos: clean(body.tratamientos_previos),
    mensaje: clean(body.mensaje),
  });

  if (error?.code === "23505") {
    return NextResponse.json({ error: "Esta hora acaba de ser reservada" }, { status: 409 });
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await Promise.allSettled([
    sendAppointmentConfirmation({ nombre, email, tipo, fecha, hora }),
    sendAdminNewAppointment({ nombre, email, telefono, tipo, fecha, hora, motivo }),
  ]);

  return NextResponse.json({ success: true });
}
