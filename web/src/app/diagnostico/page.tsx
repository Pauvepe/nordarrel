"use client";

// =====================================================================
// PAGINA: DIAGNOSTICO SIN COMPROMISO  (URL "/diagnostico") - CTA principal
// ---------------------------------------------------------------------
// Formulario para pedir el diagnostico sin compromiso + calendario para elegir hora.
// "use client" significa que esta pagina corre en el navegador (guarda lo
// que escribe el usuario en variables de estado: name, email, slot...).
// Al darle a Confirmar, envia todo a la API POST /api/appointments, que
// guarda la reserva en Supabase y manda los emails. Aqui solo se recoge
// y valida lo que el usuario escribe.
// =====================================================================
import { ClipboardList, Eye, MessageCircleMore, ShieldCheck } from "lucide-react";
import Link from "next/link";
import BookingCalendar from "@/components/booking/BookingCalendar";
import { useState, useCallback } from "react";

const benefits = [
  {
    icon: Eye,
    title: "Primera valoracion clara",
    text: "Ordenamos sintomas, tiempo de evolucion y senales visibles antes de hablar de tratamiento.",
  },
  {
    icon: ClipboardList,
    title: "Revision del caso",
    text: "Llegas con la informacion importante preparada: que notas, desde cuando y que has probado.",
  },
  {
    icon: ShieldCheck,
    title: "Orientacion sin presion",
    text: "Si el caso encaja se explica el siguiente paso; si no, se dice con criterio.",
  },
  {
    icon: MessageCircleMore,
    title: "Confirmacion por WhatsApp",
    text: "Te confirmaremos por WhatsApp en menos de 24h.",
  },
];

export default function DiagnosticoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [age, setAge] = useState("");
  const [concern, setConcern] = useState("");
  const [since, setSince] = useState("");
  const [prevTreatments, setPrevTreatments] = useState("");
  const [message, setMessage] = useState("");
  const [slot, setSlot] = useState<{ fecha: string; hora: string } | null>(null);
  const [privacy, setPrivacy] = useState(false);
  const [submitState, setSubmitState] = useState<{ loading: boolean; error: string; success: boolean }>({ loading: false, error: "", success: false });

  const isFormValid = name.trim() && email.trim() && !emailError && email.includes("@") && whatsapp.length === 9 && concern && slot && privacy;

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

  const handleAgeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 3) setAge(val);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) return;
    setSubmitState({ loading: true, error: "", success: false });
    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: "diagnostico",
        fecha: slot?.fecha,
        hora: slot?.hora,
        nombre: name,
        email,
        telefono: whatsapp,
        edad: age,
        preocupacion: concern,
        desde_cuando: since,
        tratamientos_previos: prevTreatments,
        mensaje: message,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setSubmitState({ loading: false, error: data.error || "No se ha podido reservar esta hora", success: false });
      return;
    }
    setSubmitState({ loading: false, error: "", success: true });
  }, [age, concern, email, isFormValid, message, name, prevTreatments, since, slot, whatsapp]);

  return (
    <>
      <section className="inner-hero booking-hero booking-hero-diagnostico">
        <div className="inner-hero-bg-img" aria-hidden="true">
          <img src="/assets/generated/header-diagnostico-videocall.png" alt="" />
        </div>
        <div className="inner-hero-overlay" aria-hidden="true" />
        <div className="inner-hero-mark" aria-hidden="true">
          <img src="/assets/brand/nordarrel-isotipo-negro.svg" alt="" />
        </div>
        <div className="container inner-hero-content">
          <nav className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Diagnostico sin compromiso</span>
          </nav>
          <p className="na-kicker">Nuevos pacientes</p>
          <h1>Diagnostico capilar sin compromiso para empezar con criterio.</h1>
          <p>Una primera valoracion para entender caida, entradas, coronilla, grasa, caspa, picor o perdida de densidad sin entrar a ciegas.</p>
        </div>
      </section>

      <section className="booking-page-section">
        <div className="container">
          <div className="service-card-grid booking-benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article className="service-mini-card" key={benefit.title}>
                  <div className="service-icon"><Icon /></div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
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
                    <input
                      type="text"
                      name="age"
                      placeholder="Edad (ej. 35)"
                      value={age}
                      onChange={handleAgeChange}
                      maxLength={3}
                    />
                  </label>
                </div>

                <div className="form-grid">
                  <label className="input-minimal">
                    <select
                      name="concern"
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                    >
                      <option value="" disabled>Que te preocupa</option>
                      <option value="caida">Caida</option>
                      <option value="entradas">Entradas</option>
                      <option value="coronilla">Coronilla</option>
                      <option value="grasa-caspa">Grasa / caspa</option>
                      <option value="picor">Picor</option>
                      <option value="densidad">Densidad</option>
                      <option value="otro">Otro</option>
                    </select>
                  </label>
                  <label className="input-minimal">
                    <input
                      type="text"
                      name="since"
                      placeholder="Desde cuando lo notas (ej. 6 meses)"
                      value={since}
                      onChange={(e) => setSince(e.target.value)}
                    />
                  </label>
                </div>

                <label className="input-minimal">
                  <input
                    type="text"
                    name="previousTreatments"
                    placeholder="Tratamientos previos: minoxidil, champus, vitaminas, ninguno..."
                    value={prevTreatments}
                    onChange={(e) => setPrevTreatments(e.target.value)}
                  />
                </label>

                <label className="input-minimal">
                  <textarea name="message" rows={3} placeholder="Comentario opcional — anade cualquier detalle que ayude a preparar la valoracion." value={message} onChange={(e) => setMessage(e.target.value)} />
                </label>

                <BookingCalendar mode="diagnostico" onChange={setSlot} />

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
                  {submitState.loading ? "Reservando..." : "Confirmar diagnostico"}
                </button>
                {submitState.error && <p className="input-error">{submitState.error}</p>}
                {submitState.success && <p className="newsletter-success">Solicitud registrada. Te confirmaremos por WhatsApp.</p>}
                {!submitState.error && !submitState.success && <p className="booking-confirmation">Te confirmaremos por WhatsApp en menos de 24h.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
