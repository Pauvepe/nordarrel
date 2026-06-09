"use client";

import { useState } from "react";
import Link from "next/link";

const menuLinks = [
  { name: "Inicio", href: "/" },
  { name: "Metodo", href: "/#lo-que-construyo" },
  { name: "Tratamientos", href: "/#oferta" },
  { name: "FAQ", href: "/#faq" },
  { name: "Cita", href: "/cita" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-full p-2 md:hidden"
        aria-label="Abrir menu"
      >
        <svg className="h-6 w-6 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 bg-[var(--green-dark)] text-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-5">
          <span className="text-lg font-black">NordArrel</span>
          <button onClick={() => setOpen(false)} aria-label="Cerrar menu">
            <svg className="h-6 w-6 text-white/75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-4 py-4">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 text-sm font-bold text-white/82 transition-colors hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mt-4 px-4">
          <Link
            href="/diagnostico"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center rounded-xl bg-[var(--orange)] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/20"
          >
            Diagnostico sin compromiso
          </Link>
          <Link
            href="/cita"
            onClick={() => setOpen(false)}
            className="mt-3 flex w-full items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white"
          >
            Agendar cita
          </Link>
        </div>
      </div>
    </>
  );
}
