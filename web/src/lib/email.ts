import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "NordArrel <hola@nordarrel-web.pauvepe.com>";
const ADMIN_EMAIL = process.env.NORDARREL_ADMIN_EMAIL || "info@pauvepe.com";

export async function sendAppointmentConfirmation({
  nombre,
  email,
  tipo,
  fecha,
  hora,
}: {
  nombre: string;
  email: string;
  tipo: "diagnostico" | "cita";
  fecha: string;
  hora: string;
}) {
  const esDiagnostico = tipo === "diagnostico";
  const tipoLabel = esDiagnostico ? "Diagnóstico sin compromiso" : "Cita";

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Confirmación de ${tipoLabel} — NordArrel`,
    text: `Hola ${nombre},

Tu ${tipoLabel.toLowerCase()} ha quedado confirmado.

Fecha: ${fecha}
Hora: ${hora}

${esDiagnostico ? "En el diagnóstico analizaremos el estado de tu cabello y te explicaremos las opciones más adecuadas para ti. No tienes que preparar nada." : "Te esperamos en la clínica. Si necesitas cambiar la hora, responde a este email."}

Hasta pronto,
El equipo de NordArrel`,
  });
}

export async function sendAdminNewAppointment({
  nombre,
  email,
  telefono,
  tipo,
  fecha,
  hora,
  motivo,
}: {
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  fecha: string;
  hora: string;
  motivo?: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `Nueva reserva: ${tipo} — ${nombre} (${fecha} ${hora})`,
    text: `Nueva reserva recibida.

Tipo: ${tipo}
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Fecha: ${fecha}
Hora: ${hora}
${motivo ? `Motivo: ${motivo}` : ""}`,
  });
}

export async function sendNewsletterWelcome({ email }: { email: string }) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Ya estás en la lista — NordArrel",
    text: `Hola,

Te has suscrito correctamente a las novedades de NordArrel.

Te avisaremos cuando publiquemos contenido nuevo sobre salud capilar masculina.

Un saludo,
El equipo de NordArrel`,
  });
}
