"use client";

// =====================================================================
// PAGINA: AGENDAR CITA  (URL "/cita") - CTA secundario
// ---------------------------------------------------------------------
// Como la de diagnostico, pero para pacientes ya valorados o seguimiento.
// Formulario + calendario. Al confirmar envia a la API POST /api/appointments
// con tipo "cita". Funciona igual que diagnostico/page.tsx.
// =====================================================================
import { CalendarCheck, ClipboardList, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import BookingCalendar from "@/components/booking/BookingCalendar";
import { useState, useCallback } from "react";

const notes = [
  {
    icon: ClipboardList,
    title: "Para pacientes valorados",
    text: "Cita normal para seguimiento, revision, tratamiento o una consulta ya contextualizada.",
  },
  {
    icon: CalendarCheck,
    title: "Calendario laboral",
    text: "Lunes a viernes, con manana y tarde. Hoy y manana aparecen desactivados.",
  },
  {
    icon: MessageCircleMore,
    title: "Confirmacion cercana",
    text: "Te confirmaremos por WhatsApp en menos de 24h.",
  },
];

export default function CitaPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [slot, setSlot] = useState<{ fecha: string; hora: string } | null>(null);
  const [privacy, setPrivacy] = useState(false);
  const [exitWarning, setExitWarning] = useState(false);
  const [submitState, setSubmitState] = useState<{ loading: boolean; error: string; success: boolean }>({ loading: false, error: "", success: false });

  const isFormDirty = name || email || whatsapp || reason;
  const isFormValid = name.trim() && email.trim() && !emailError && email.includes("@") && whatsapp.length === 9 && reason && slot && privacy;

  const handleEmailBlur = useCallback(() => {
    if (email && !email.includes("@")) {
      setEmailError("Introduce un email valido con @");
    } else {
      setEmailError("");
    }
  }, [email]);

  const handleWhatsappChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 9) setWhatsapp(val);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) return;
    setSubmitState({ loading: true, error: "", success: false });
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "cita",
        fecha: slot?.fecha,
        hora: slot?.hora,
        nombre: name,
        email,
        telefono: whatsapp,
        motivo: reason,
        mensaje: message,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setSubmitState({ loading: false, error: data.error || "No se ha podido reservar esta hora", success: false });
      return;
    }
    setSubmitState({ loading: false, error: "", success: true });
  }, [email, isFormValid, message, name, reason, slot, whatsapp]);

  return (
    <>
      <section className="inner-hero booking-hero booking-hero-cita">
        <div className="inner-hero-bg-img" aria-hidden="true">
          <img src="/assets/generated/header-clinica-cita.png" alt="" />
        </div>
        <div className="inner-hero-overlay" aria-hidden="true" />
        <div className="inner-hero-mark" aria-hidden="true">
          <img src="/assets/brand/nordarrel-isotipo-negro.svg" alt="" />
        </div>
        <div className="container inner-hero-content">
          <nav className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Agendar cita</span>
          </nav>
          <p className="na-kicker">Pacientes ya valorados</p>
          <h1>Agenda tu cita de seguimiento, revision o tratamiento.</h1>
          <p>Esta ruta es mas directa: si NordArrel ya conoce tu caso, selecciona motivo, dia y hora para que podamos confirmar la visita.</p>
        </div>
      </section>

      <section className="booking-page-section">
        <div className="container">
          <div className="service-card-grid booking-notes-grid">
            {notes.map((note) => {
              const Icon = note.icon;
              return (
                <article className="service-mini-card" key={note.title}>
                  <div className="service-icon"><Icon /></div>
                  <h3>{note.title}</h3>
                  <p>{note.text}</p>
                </article>
              );
            })}
          </div>

          <div className="booking-form-shell-full">
            <div className="contact-main-card booking-form-card">
              <form className="contact-form booking-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-grid">
                  <label className="input-minimal">
                    <input
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="input-minimal">
                    <input
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
                      onBlur={handleEmailBlur}
                    />
                    {emailError && <span className="input-error">{emailError}</span>}
                  </label>
                </div>

                <div className="form-grid">
                  <label className="input-minimal input-whatsapp">
                    <span className="whatsapp-prefix">+34</span>
                    <input
                      type="tel"
                      name="whatsapp"
                      placeholder="600 000 000"
                      value={whatsapp}
                      onChange={handleWhatsappChange}
                      maxLength={9}
                    />
                  </label>
                  <label className="input-minimal">
                    <select
                      name="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    >
                      <option value="" disabled>Selecciona motivo</option>
                      <option value="seguimiento">Seguimiento</option>
                      <option value="revision">Revision</option>
                      <option value="tratamiento">Tratamiento</option>
                      <option value="otra-consulta">Otra consulta</option>
                    </select>
                  </label>
                </div>

                <label className="input-minimal">
                  <textarea name="message" rows={3} placeholder="Comentario opcional — indica si vienes por evolucion, dudas o continuidad." value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>

                <BookingCalendar mode="cita" onChange={setSlot} />

                <label className="privacy-check">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                  />
                  <span>Acepto la politica de privacidad y el uso de mis datos para gestionar esta solicitud.</span>
                </label>

                <button
                  type="button"
                  className={`btn btn-large btn-submit ${isFormValid ? "btn-on-black" : "btn-disabled"}`}
                  onClick={handleSubmit}
                  disabled={!isFormValid || submitState.loading}
                >
                  {submitState.loading ? "Reservando..." : "Agendar cita"}
                </button>
                {submitState.error && <p className="input-error">{submitState.error}</p>}
                {submitState.success && <p className="newsletter-success">Cita registrada. Te confirmaremos por WhatsApp.</p>}
                {!submitState.error && !submitState.success && <p className="booking-confirmation">Te confirmaremos por WhatsApp en menos de 24h.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
