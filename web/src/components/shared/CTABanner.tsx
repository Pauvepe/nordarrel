import Link from "next/link";

interface Props {
  whatsapp_numero?: string;
  whatsapp_mensaje?: string;
}

export default function CTABanner({ whatsapp_numero, whatsapp_mensaje }: Props) {
  const waUrl = whatsapp_numero
    ? `https://wa.me/${whatsapp_numero}${whatsapp_mensaje ? `?text=${encodeURIComponent(whatsapp_mensaje)}` : ""}`
    : null;

  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.90),rgba(255,247,238,0.78))] p-6 shadow-[0_20px_54px_rgba(30,38,31,0.12)] backdrop-blur-md sm:p-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-xs font-black uppercase text-[var(--copper)]">Siguiente paso</p>
            <h2 className="text-2xl font-black leading-tight text-[var(--text)] sm:text-3xl">
              Agenda una revision sin compromiso
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              La cita sirve para entender si podemos ayudarte y que camino tiene mas sentido para tu caso.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/cita"
              className="inline-flex justify-center rounded-full bg-[var(--green-dark)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(56,82,58,0.24)] transition-transform hover:-translate-y-0.5"
            >
              Agendar cita
            </Link>
            {waUrl && (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-full border border-[var(--border)] bg-white/75 px-7 py-3.5 text-sm font-bold text-[var(--text)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-colors hover:border-[var(--copper)] hover:text-[var(--copper)]"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
