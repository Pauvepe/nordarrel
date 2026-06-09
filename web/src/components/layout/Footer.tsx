"use client";

// =====================================================================
// COMPONENTE: FOOTER (el pie de pagina)
// ---------------------------------------------------------------------
// DONDE SE USA: en layout.tsx, sale en TODAS las paginas.
// QUE HACE: logo, redes, enlaces, legales, mapa y el FORMULARIO DE
// NEWSLETTER. Al enviar la newsletter llama a la API POST /api/newsletter
// (handleNewsletterSubmit), que guarda el email en Supabase y manda la
// bienvenida con Resend.
// =====================================================================
import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";
import { useState, useCallback } from "react";

const pageLinks = [
  { name: "Metodo", href: "/#lo-que-construyo" },
  { name: "Servicios", href: "/servicios" },
  { name: "Sobre nosotros", href: "/sobre-nosotros" },
  { name: "Contacto", href: "/contacto" },
  { name: "Resenas", href: "/#resenas" },
  { name: "Equipo", href: "/#equipo" },
  { name: "Preguntas frecuentes", href: "/#faq" },
  { name: "Diagnostico sin compromiso", href: "/diagnostico" },
  { name: "Agendar cita", href: "/cita" },
];

const legalLinks = [
  { name: "Aviso legal", href: "/legal/aviso-legal" },
  { name: "Privacidad", href: "/legal/politica-privacidad" },
  { name: "Cookies", href: "/legal/politica-cookies" },
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterError, setNewsletterError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEmailValid = newsletterEmail.trim() && !newsletterError && newsletterEmail.includes("@");

  const handleNewsletterBlur = useCallback(() => {
    if (newsletterEmail && !newsletterEmail.includes("@")) {
      setNewsletterError("Introduce un email valido con @");
    } else {
      setNewsletterError("");
    }
  }, [newsletterEmail]);

  const handleNewsletterSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.includes("@")) {
      setNewsletterError("Introduce un email valido con @");
      return;
    }

    setIsSubmitting(true);
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: newsletterEmail, origen: "footer" }),
    });
    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      setNewsletterError(data.error || "No se ha podido guardar el email");
      return;
    }

    setIsSubmitted(true);
    setNewsletterEmail("");
    setNewsletterError("");
    setTimeout(() => setIsSubmitted(false), 5000);
  }, [newsletterEmail]);

  return (
    <div className="footer-wrapper">
      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <Link href="/" className="footer-logo-link" aria-label="NordArrel">
              <img src="/assets/brand/nordarrel-isotipo-na-blanco.svg" alt="NordArrel" className="footer-logo-img" />
            </Link>
            <p className="footer-tagline">Diagnostico capilar, criterio clinico y seguimiento presencial solo cuando encaja.</p>

            <nav className="footer-socials" aria-label="Redes sociales">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </nav>

            <div className="footer-newsletter">
              <p className="footer-newsletter-title">Newsletter</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <label className="input-minimal dark-input">
                  <span className="newsletter-label">Correo electronico</span>
                  <input
                    type="email"
                    name="newsletter-email"
                    placeholder="tu@email.com"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError("");
                    }}
                    onBlur={handleNewsletterBlur}
                  />
                  {newsletterError && <span className="input-error">{newsletterError}</span>}
                </label>
                <button
                  type="submit"
                  className={`btn-newsletter ${isEmailValid ? "btn-on-white" : "btn-disabled"}`}
                  disabled={!isEmailValid || isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Entregar"}
                </button>
              </form>
              {isSubmitted && <p className="newsletter-success">Te has suscrito con exito.</p>}
            </div>
          </div>

          <div>
            <p className="footer-col-title">Paginas</p>
            <nav className="footer-nav" aria-label="Paginas">
              {pageLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.name}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="footer-col-title">Legal</p>
            <nav className="footer-nav" aria-label="Legal">
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href}>{link.name}</Link>
              ))}
            </nav>
          </div>

          <div className="footer-map-col">
            <p className="footer-col-title">Barcelona</p>
            <a
              className="footer-address"
              href="https://www.google.com/maps/search/?api=1&query=Barcelona"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin />
              <span>Clinica capilar NordArrel<br />Barcelona</span>
            </a>
            <iframe
              className="footer-map"
              title="Mapa NordArrel Barcelona"
              src="https://www.google.com/maps?q=Barcelona&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 NordArrel - Barcelona</p>
        </div>
      </footer>
    </div>
  );
}
