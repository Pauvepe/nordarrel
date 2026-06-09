// =====================================================================
// API: GUARDAR UNA RESERVA  (POST /api/appointments)
// ---------------------------------------------------------------------
// ES LA PUERTA que se llama cuando alguien envia el formulario de
// "Diagnostico sin compromiso" o de "Agendar cita". Hace 3 cosas en orden:
//   1) revisa que los datos sean validos (tipo, fecha, hora, nombre...).
//   2) guarda el CONTACTO y la RESERVA en la base de datos (Supabase).
//   3) manda 2 emails con Resend (confirmacion al cliente + aviso a la clinica).
// Si la hora ya estaba cogida, responde 409 y NO duplica la reserva.
// =====================================================================
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

  // 1) Validar: el tipo debe ser diagnostico o cita, y la fecha/hora deben
  //    ser un hueco valido segun las reglas de horario (booking-rules.ts).
  if (!["diagnostico", "cita"].includes(tipo) || !isValidSlot(tipo, fecha, hora)) {
    return NextResponse.json({ error: "Horario no disponible" }, { status: 400 });
  }

  if (!nombre || !email.includes("@") || telefono.length < 9) {
    return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }

  // 2) Abrir la conexion segura con la base de datos (llave maestra).
  const supabase = createSupabaseServerClient();
  const edad = body.edad ? Number(body.edad) : null;
  const motivo = clean(body.motivo || body.preocupacion);

  // 3) Guardar el CONTACTO. "upsert" = si ese email ya existe lo actualiza,
  //    y si no, lo crea. Asi no se duplican contactos.
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

  // 4) Guardar la RESERVA en estado "pendiente", enlazada al contacto.
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

  // El codigo 23505 lo lanza la base de datos cuando alguien intenta
  // reservar una fecha+hora que ya estaba cogida -> evita doble reserva.
  if (error?.code === "23505") {
    return NextResponse.json({ error: "Esta hora acaba de ser reservada" }, { status: 409 });
  }

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 5) Mandar los emails (sin bloquear: si Resend fallara, la reserva ya
  //    quedo guardada arriba). Uno al cliente y otro a la clinica.
  await Promise.allSettled([
    sendAppointmentConfirmation({ nombre, email, tipo, fecha, hora }),
    sendAdminNewAppointment({ nombre, email, telefono, tipo, fecha, hora, motivo }),
  ]);

  return NextResponse.json({ success: true });
}
