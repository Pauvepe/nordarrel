"use client";

import { CalendarCheck, Mail, Users } from "lucide-react";
import { useEffect, useState } from "react";

type Appointment = {
  id: string;
  tipo: string;
  fecha: string;
  hora: string;
  nombre: string;
  telefono: string;
  estado: string;
};

export default function TabDashboard() {
  const [data, setData] = useState<{ contactos: number; newsletter: number; citasPendientes: number; proximas: Appointment[] } | null>(null);

  useEffect(() => {
    fetch("/api/dashboard").then((r) => r.json()).then(setData);
  }, []);

  const cards = [
    { label: "Contactos", value: data?.contactos || 0, icon: Users },
    { label: "Citas pendientes", value: data?.citasPendientes || 0, icon: CalendarCheck },
    { label: "Newsletter", value: data?.newsletter || 0, icon: Mail },
  ];

  return (
    <div>
      <div className="admin-metric-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="admin-metric-card" key={card.label}>
              <Icon size={18} />
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </article>
          );
        })}
      </div>

      <section className="admin-card">
        <h2>Proximas citas</h2>
        <div className="admin-list">
          {(data?.proximas || []).map((item) => (
            <div className="admin-row" key={item.id}>
              <div>
                <strong>{item.nombre}</strong>
                <span>{item.tipo} · {item.estado}</span>
              </div>
              <div className="admin-row-right">{item.fecha} · {String(item.hora).slice(0, 5)}<br />{item.telefono}</div>
            </div>
          ))}
          {data && data.proximas.length === 0 && <p className="admin-empty">No hay citas proximas.</p>}
        </div>
      </section>
    </div>
  );
}
