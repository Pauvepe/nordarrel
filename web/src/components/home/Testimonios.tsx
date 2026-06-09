interface Testimonio {
  id: string;
  nombre: string;
  texto: string;
  foto_url: string | null;
  estrellas: number;
}

interface Props {
  items: Testimonio[];
}

function Stars({ count }: { count: number }) {
  return (
    <div className="mb-4 flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < count ? "text-[var(--copper)]" : "text-[var(--border)]"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonios({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section id="testimonios" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-xs font-black uppercase text-[var(--copper)]">Confianza</p>
          <h2 className="text-3xl font-black leading-tight text-[var(--text)] sm:text-4xl">
            Tono humano, sin exagerar promesas
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t.id} className="rounded-[22px] border border-[var(--border)] bg-white p-6 shadow-[0_14px_34px_rgba(30,38,31,0.08)]">
              <Stars count={t.estrellas} />
              <p className="mb-5 text-sm leading-7 text-[var(--muted)]">
                &ldquo;{t.texto}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {t.foto_url ? (
                  <img src={t.foto_url} alt={t.nombre} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--cream)] text-xs font-black text-[var(--green-dark)]">
                    {t.nombre.split(" ").map((w) => w[0]).join("")}
                  </div>
                )}
                <span className="text-sm font-black text-[var(--text)]">{t.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
