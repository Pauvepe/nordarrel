import Link from "next/link";

interface Props {
  titulo: string;
  subtitulo: string;
  cta_texto: string;
  cta_url: string;
  whatsapp_numero: string;
  whatsapp_mensaje: string;
  imagen_url?: string;
}

export default function Hero({ titulo, subtitulo, cta_texto, cta_url, whatsapp_numero, whatsapp_mensaje, imagen_url }: Props) {
  const ctaHref = cta_url || `https://wa.me/${whatsapp_numero}${whatsapp_mensaje ? `?text=${encodeURIComponent(whatsapp_mensaje)}` : ""}`;
  const isExternal = ctaHref.startsWith("http");

  return (
    <section className="hero-shell relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black px-5 pb-24 pt-28 text-white shadow-[0_8px_22px_rgba(0,0,0,0.42)]">
      {imagen_url && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${imagen_url})` }}
        />
      )}
      <div className="topographic-layer" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(0,0,0,0.20),rgba(0,0,0,0.62)_70%),linear-gradient(90deg,rgba(0,0,0,0.52),rgba(0,0,0,0.16)_48%,rgba(0,0,0,0.52))]" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <p className="mb-5 text-[11px] font-bold uppercase text-[var(--copper-light)]">
          NordArrel - Barcelona
        </p>
        <h1 className="mb-5 flex flex-wrap items-baseline justify-center gap-x-4 text-[clamp(2.35rem,7vw,5rem)] font-black leading-[1.08] text-white">
          <span>{titulo}</span>
          <span className="hero-word-window">
            <span className="hero-word-list">
              <span>mas criterio.</span>
              <span>mas calma.</span>
              <span>mas control.</span>
              <span>mejor raiz.</span>
              <span>mas criterio.</span>
            </span>
          </span>
        </h1>
        <p className="max-w-2xl text-[clamp(0.98rem,1.6vw,1.12rem)] font-medium leading-8 text-white/76">
          {subtitulo}
        </p>
        <div className="mt-7 flex w-full max-w-[360px] flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
          {isExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-full border-[3px] border-transparent bg-[linear-gradient(var(--copper),var(--copper))_padding-box,conic-gradient(from_0deg,#8a431e,#d97032,#f0ba82,#8a431e)_border-box] px-7 py-3.5 text-sm font-bold text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.14),0_6px_24px_rgba(217,112,50,0.48)] transition-transform hover:-translate-y-0.5"
            >
              {cta_texto}
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="inline-flex justify-center rounded-full border-[3px] border-transparent bg-[linear-gradient(var(--copper),var(--copper))_padding-box,conic-gradient(from_0deg,#8a431e,#d97032,#f0ba82,#8a431e)_border-box] px-7 py-3.5 text-sm font-bold text-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.14),0_6px_24px_rgba(217,112,50,0.48)] transition-transform hover:-translate-y-0.5"
            >
              {cta_texto}
            </Link>
          )}
          <Link
            href="#metodo"
            className="inline-flex justify-center rounded-full border border-white/22 bg-white/9 px-7 py-3.5 text-sm font-bold text-white/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_18px_rgba(0,0,0,0.18)] backdrop-blur-md transition-colors hover:border-[var(--copper)] hover:bg-[rgba(217,112,50,0.16)] hover:text-white"
          >
            Como funciona
          </Link>
        </div>
        <p className="mt-5 text-sm font-semibold text-white/60">
          15 min - sin compromiso - primer diagnostico visual
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/55" />
    </section>
  );
}
