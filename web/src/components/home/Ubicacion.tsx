interface Props {
  direccion: string;
  ciudad: string;
  codigo_postal: string;
  horario: string;
  google_maps_url: string;
  telefono: string;
}

export default function Ubicacion({ direccion, ciudad, codigo_postal, horario, google_maps_url, telefono }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[0_18px_44px_rgba(30,38,31,0.10)]">
          {google_maps_url ? (
            <iframe
              src={google_maps_url}
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicacion"
            />
          ) : (
            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[var(--green-dark)] text-center text-white">
              <div className="topographic-layer opacity-60" aria-hidden="true" />
              <div className="relative z-10 px-8">
                <p className="text-xs font-black uppercase text-[var(--copper-light)]">Barcelona</p>
                <p className="mt-3 text-3xl font-black">Revision con cita previa</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center rounded-[28px] border border-[var(--border)] bg-white/82 p-7 shadow-[0_18px_44px_rgba(30,38,31,0.08)] backdrop-blur-md sm:p-10">
          <p className="mb-3 text-xs font-black uppercase text-[var(--copper)]">Contacto</p>
          <h2 className="text-3xl font-black leading-tight text-[var(--text)] sm:text-4xl">
            Donde empieza la cita
          </h2>

          <div className="mt-8 space-y-6">
            <InfoItem label="Direccion" value={`${direccion}${codigo_postal ? `, ${codigo_postal}` : ""}${ciudad ? `, ${ciudad}` : ""}`} />
            <InfoItem label="Horario" value={horario} />
            <InfoItem label="Telefono" value={telefono} href={`tel:${telefono.replace(/\s/g, "")}`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 h-3 w-3 rounded-full bg-[var(--copper)] shadow-[0_0_0_6px_rgba(217,112,50,0.12)]" />
      <div>
        <p className="text-sm font-black text-[var(--text)]">{label}</p>
        {href ? (
          <a href={href} className="whitespace-pre-line text-sm leading-7 text-[var(--muted)] transition-colors hover:text-[var(--copper)]">
            {value}
          </a>
        ) : (
          <p className="whitespace-pre-line text-sm leading-7 text-[var(--muted)]">{value}</p>
        )}
      </div>
    </div>
  );
}
