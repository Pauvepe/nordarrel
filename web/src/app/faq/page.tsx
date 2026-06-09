"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  title: string;
  items: FAQItem[];
}

const faqGroups: FAQGroup[] = [
  {
    title: "Citas y Reservas",
    items: [
      {
        question: "Como puedo pedir una cita?",
        answer: "Puedes reservar tu cita llamandonos por telefono, enviando un mensaje por WhatsApp o rellenando el formulario de contacto en nuestra web. Te confirmaremos la cita en menos de 24 horas.",
      },
      {
        question: "Puedo cancelar o cambiar mi cita?",
        answer: "Si, puedes cancelar o modificar tu cita con al menos 24 horas de antelacion sin ningun coste. Para cancelaciones con menos de 24 horas, contacta con nosotros lo antes posible.",
      },
      {
        question: "Necesito llegar con antelacion?",
        answer: "Recomendamos llegar 5-10 minutos antes de tu cita para que podamos atenderte puntualmente y preparar todo para tu tratamiento.",
      },
    ],
  },
  {
    title: "Servicios y Tratamientos",
    items: [
      {
        question: "Cuanto dura cada sesion?",
        answer: "La duracion varia segun el tratamiento. Las sesiones suelen durar entre 30 y 90 minutos. Al reservar tu cita te informaremos de la duracion estimada.",
      },
      {
        question: "Los tratamientos tienen contraindicaciones?",
        answer: "Algunos tratamientos pueden tener contraindicaciones. En la primera visita realizamos una valoracion personalizada para asegurar que el tratamiento es adecuado para ti.",
      },
    ],
  },
  {
    title: "Precios y Pagos",
    items: [
      {
        question: "Que metodos de pago aceptan?",
        answer: "Aceptamos efectivo, tarjeta de credito/debito y Bizum. Para packs y bonos de sesiones, tambien ofrecemos opciones de pago fraccionado.",
      },
      {
        question: "Ofrecen descuentos o packs?",
        answer: "Si, ofrecemos bonos de sesiones con descuento y promociones especiales a lo largo del ano. Consulta con nuestro equipo para conocer las ofertas actuales.",
      },
      {
        question: "La primera consulta tiene coste?",
        answer: "La primera valoracion es sin compromiso y sin compromiso. Te explicaremos las opciones de tratamiento disponibles y resolveremos todas tus dudas.",
      },
    ],
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E0E0E0] last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left">
        <span className="pr-4 text-sm font-medium text-[#222222]">{item.question}</span>
        <svg className={`h-5 w-5 shrink-0 text-[#888888] transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="pb-4 pr-8">
          <p className="text-sm leading-relaxed text-[#555555]">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-6 text-sm text-[#888888]">
        <Link href="/" className="hover:text-[#222222]">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-[#222222]">Preguntas Frecuentes</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold text-[#222222]">Preguntas Frecuentes</h1>
      <p className="mb-8 text-sm text-[#555555]">
        Encuentra respuestas a las preguntas mas comunes sobre nuestros servicios, citas y tratamientos.
      </p>

      <div className="space-y-8">
        {faqGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-4 text-lg font-bold text-[#222222]">{group.title}</h2>
            <div className="rounded-lg border border-[#E0E0E0] bg-white px-5">
              {group.items.map((item) => (
                <AccordionItem key={item.question} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-[#F5F5F5] p-8 text-center">
        <h3 className="mb-2 text-lg font-bold text-[#222222]">Aun tienes dudas?</h3>
        <p className="mb-4 text-sm text-[#555555]">Nuestro equipo estara encantado de ayudarte.</p>
        <Link href="/contacto" className="inline-block rounded bg-[#333333] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#555555]">
          Contactar
        </Link>
      </div>
    </div>
  );
}
