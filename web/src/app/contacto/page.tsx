"use client";

import { Clock, Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";

const contactCards = [
  {
    icon: Phone,
    title: "Telefono",
    text: "+34 600 000 000",
  },
  {
    icon: Mail,
    title: "Email",
    text: "info@nordarrel.com",
  },
  {
    icon: MapPin,
    title: "Clinica",
    text: "Barcelona",
  },
  {
    icon: Clock,
    title: "Horario",
    text: "Lunes a viernes, 9:00 - 20:00",
  },
];

export default function ContactoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");

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

  return (
    <>
      <section className="inner-hero">
        <div className="inner-hero-mark" aria-hidden="true">
          <img src="/assets/brand/nordarrel-isotipo-negro.svg" alt="" />
        </div>
        <div className="container inner-hero-content">
          <nav className="breadcrumb">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span>Contacto</span>
          </nav>
          <p className="na-kicker">Contacto</p>
          <h1>Dudas rapidas, ubicacion y contacto de NordArrel.</h1>
          <p>Las reservas importantes se ordenaran desde diagnostico o cita. Esta pagina queda para preguntas, direccion, horarios y contacto general.</p>
          <div className="inner-hero-actions">
            <Link href="/diagnostico" className="header-cta hero-cta">Diagnostico sin compromiso</Link>
            <Link href="/cita" className="btn btn-secondary btn-large">Agendar cita</Link>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-grid">
          <div className="contact-main-card">
            <p className="na-kicker">Escribenos</p>
            <h2>Consulta general</h2>
            <p>Este formulario queda preparado para dudas. Mas adelante se puede conectar a Supabase o email sin mezclarlo con los formularios de diagnostico y cita.</p>
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
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
                <label className="input-minimal input-whatsapp">
                  <span className="whatsapp-prefix">+34</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="600 000 000"
                    value={whatsapp}
                    onChange={handleWhatsappChange}
                    maxLength={9}
                  />
                </label>
              </div>
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
              <label className="input-minimal">
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Cuentanos tu duda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-on-orange btn-large">Enviar mensaje</button>
            </form>
          </div>

          <aside className="contact-side">
            <div className="contact-info-grid">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article className="contact-info-card" key={card.title}>
                    <div className="service-icon"><Icon /></div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </article>
                );
              })}
            </div>

            <a
              className="contact-whatsapp-card"
              href="https://wa.me/34637682568?text=Hola%2C%20tengo%20una%20duda%20sobre%20NordArrel."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircleMore />
              <div>
                <h3>WhatsApp para dudas</h3>
                <p>No es el canal oficial de reservas. Sirve para resolver preguntas rapidas.</p>
              </div>
            </a>
          </aside>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="map-card">
            <div>
              <p className="na-kicker">Barcelona</p>
              <h2>Clinica capilar NordArrel</h2>
              <p>Direccion pendiente de confirmar. De momento la pagina queda preparada con Barcelona como ubicacion base.</p>
            </div>
            <iframe
              title="Mapa NordArrel Barcelona"
              src="https://www.google.com/maps?q=Barcelona&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
