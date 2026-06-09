"use client";

// =====================================================================
// COMPONENTE: NAVBAR (el menu de arriba)
// ---------------------------------------------------------------------
// DONDE SE USA: en layout.tsx, asi que sale en TODAS las paginas.
// QUE HACE: logo + enlaces (Servicios, Sobre nosotros, Contacto, Cita) +
// boton naranja "Diagnostico sin compromiso" + menu hamburguesa para movil.
// "open" controla si el menu movil esta abierto o cerrado.
// =====================================================================
import { useState } from "react";
import Link from "next/link";

type NavLink = { name: string; href: string; icon?: boolean };

const navLinks: NavLink[] = [
  { name: "Servicios", href: "/servicios" },
  { name: "Sobre nosotros", href: "/sobre-nosotros" },
  { name: "Contacto", href: "/contacto" },
  { name: "Cita", href: "/cita", icon: true },
];

function CitaIcon() {
  return (
    <svg className="nav-cita-icon" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true">
      <path d="M843.968 896a51.072 51.072 0 0 1-51.968-52.032V232H180.032A51.072 51.072 0 0 1 128 180.032c0-29.44 22.528-52.032 52.032-52.032h663.936c29.44 0 52.032 22.528 52.032 52.032v663.936c0 29.44-22.528 52.032-52.032 52.032z" />
      <path d="M180.032 896a49.92 49.92 0 0 1-36.48-15.616c-20.736-20.8-20.736-53.76 0-72.832L807.616 143.616c20.864-20.8 53.76-20.8 72.832 0 20.8 20.8 20.8 53.76 0 72.768L216.384 880.384a47.232 47.232 0 0 1-36.352 15.616z" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="header-logo" aria-label="NordArrel">
          <img src="/assets/brand/nordarrel-imagotipo-negro.svg" alt="NordArrel" className="header-logo-full" />
        </Link>

        <nav className="nav-desktop" aria-label="Menu principal">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
              {link.icon && <CitaIcon />}
            </Link>
          ))}
        </nav>

        <div className="header-right">
          <Link
            href="/diagnostico"
            className="header-cta"
          >
            Diagnostico sin compromiso
            <svg className="h-3 w-3" viewBox="0 0 1024 1024" fill="currentColor" aria-hidden="true">
              <path d="M843.968 896a51.072 51.072 0 0 1-51.968-52.032V232H180.032A51.072 51.072 0 0 1 128 180.032c0-29.44 22.528-52.032 52.032-52.032h663.936c29.44 0 52.032 22.528 52.032 52.032v663.936c0 29.44-22.528 52.032-52.032 52.032z" />
              <path d="M180.032 896a49.92 49.92 0 0 1-36.48-15.616c-20.736-20.8-20.736-53.76 0-72.832L807.616 143.616c20.864-20.8 53.76-20.8 72.832 0 20.8 20.8 20.8 53.76 0 72.768L216.384 880.384a47.232 47.232 0 0 1-36.352 15.616z" />
            </svg>
          </Link>
          <button
            className={`hamburger${open ? " open" : ""}`}
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <nav className={`nav-mobile${open ? " open" : ""}`} aria-label="Menu movil">
        {navLinks.map((link) => (
          <Link key={link.name} href={link.href} onClick={() => setOpen(false)}>
            {link.name}
            {link.icon && <CitaIcon />}
          </Link>
        ))}
      </nav>
    </header>
  );
}
