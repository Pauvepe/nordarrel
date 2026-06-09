interface Imagen {
  id: string;
  url: string;
  alt: string;
}

interface Props {
  imagenes: Imagen[];
}

const pasos = [
  ["01", "Escucha", "Que notas, desde cuando y que objetivo quieres conseguir."],
  ["02", "Revision", "Mirada tecnica del cuero cabelludo, densidad, habitos y posibles bloqueos."],
  ["03", "Plan", "Siguiente paso claro: rutina, seguimiento o derivacion si hace falta."],
];

export default function Galeria({ imagenes }: Props) {
  if (imagenes.length > 0) {
    return (
      <section id="galeria" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {imagenes.map((img) => (
            <div key={img.id} className="overflow-hidden rounded-[22px] border border-white/60 shadow-[0_14px_34px_rgba(30,38,31,0.10)]">
              <img
                src={img.url}
                alt={img.alt || "Trabajo realizado"}
                className="h-48 w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="metodo" className="bg-[var(--green-dark)] px-5 py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-black uppercase text-[var(--copper-light)]">Metodo</p>
          <h2 className="text-3xl font-black leading-tight sm:text-4xl">
            Una revision sencilla, defendible y facil de explicar
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-8 text-white/68 sm:text-base">
            No montamos una web enorme. Montamos un recorrido claro: el usuario entiende el servicio,
            pide revision y despues el admin gestiona la cita.
          </p>
        </div>
        <div className="grid gap-4">
          {pasos.map(([num, title, text]) => (
            <div key={num} className="grid grid-cols-[58px_1fr] gap-4 rounded-[22px] border border-white/10 bg-white/8 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_42px_rgba(0,0,0,0.16)] backdrop-blur-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--copper)] text-sm font-black text-white">
                {num}
              </div>
              <div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-1 text-sm leading-7 text-white/66">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
