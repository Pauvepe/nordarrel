"use client";

// =====================================================================
// COMPONENTE: CookieBanner (aviso de cookies de abajo)
// ---------------------------------------------------------------------
// Aparece la primera vez que entras. Al aceptar o rechazar, guarda la
// eleccion en el navegador (localStorage) para no volver a mostrarlo.
// Se coloca en layout.tsx.
// =====================================================================
import Link from "next/link";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

const COOKIE_KEY = "nordarrel-cookies";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!localStorage.getItem(COOKIE_KEY));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function choose(value: "accept" | "reject") {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-banner__main">
        <span className="cookie-banner__icon">
          <Cookie />
        </span>
        <div className="min-w-0">
          <p className="cookie-banner__title">Cookies</p>
          <p className="cookie-banner__text">
            Solo usamos cookies tecnicas necesarias para que la web funcione. Consulta la{" "}
            <Link href="/legal/politica-cookies">politica de cookies</Link>.
          </p>
        </div>
      </div>
      <div className="cookie-banner__actions">
        <button type="button" onClick={() => choose("reject")} className="btn btn-secondary">
          Rechazar
        </button>
        <button type="button" onClick={() => choose("accept")} className="btn btn-on-orange">
          Aceptar
        </button>
      </div>
    </div>
  );
}
