import { ClipboardCheck, Clock, Droplets, Eye, Hand, Heart, Search, Shield, ShieldCheck, Smile, Sparkles, Star, Sun, Zap } from "lucide-react";

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  icono: string;
}

interface Props {
  items: Servicio[];
}

const iconMap: Record<string, React.ElementType> = {
  ClipboardCheck, Clock, Droplets, Eye, Hand, Heart, Search, Shield, ShieldCheck, Smile, Sparkles, Star, Sun, Zap,
};

export default function Servicios({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section id="servicios" className="mx-auto max-w-7xl px-5 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="mb-3 text-xs font-black uppercase text-[var(--copper)]">Servicio principal</p>
        <h2 className="text-3xl font-black leading-tight text-[var(--text)] sm:text-4xl">
          Diagnostico capilar antes de decidir nada
        </h2>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
          La Home queda centrada en un flujo simple: entender el caso, orientar el plan y agendar la revision.
        </p>
      </div>
      <div className={`grid gap-5 sm:grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : items.length === 3 ? "lg:grid-cols-3" : ""}`}>
        {items.map((s) => {
          const Icon = iconMap[s.icono] || Sparkles;
          return (
            <div
              key={s.id}
              className="rounded-[22px] border border-[var(--border)] bg-white/82 p-6 shadow-[0_14px_36px_rgba(30,38,31,0.08)] backdrop-blur-md transition-transform hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(30,38,31,0.12)]"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--cream)] text-[var(--copper)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_5px_14px_rgba(0,0,0,0.07)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-black text-[var(--text)]">{s.nombre}</h3>
              {s.descripcion && (
                <p className="mb-4 text-sm leading-7 text-[var(--muted)]">{s.descripcion}</p>
              )}
              {s.precio && (
                <p className="text-sm font-extrabold text-[var(--green-dark)]">{s.precio}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
