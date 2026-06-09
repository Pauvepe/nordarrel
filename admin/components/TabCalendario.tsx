"use client";

import { useEffect, useMemo, useState } from "react";

type Appointment = {
  id: string;
  tipo: "diagnostico" | "cita";
  fecha: string;
  hora: string;
  estado: string;
  nombre: string;
  email: string;
  telefono: string;
  motivo?: string;
  preocupacion?: string;
  mensaje?: string;
  notas_admin?: string;
};

export default function TabCalendario() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("todos");

  const load = () => fetch("/api/appointments").then((r) => r.json()).then((d) => setItems(Array.isArray(d) ? d : []));
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => items.filter((item) => filter === "todos" || item.tipo === filter || item.estado === filter), [items, filter]);

  async function setStatus(id: string, estado: string) {
    await fetch("/api/appointments", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, estado }) });
    load();
  }

  return (
    <section className="admin-card">
      <div className="admin-toolbar">
        <h2>Calendario clinico</h2>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="todos">Todo</option>
          <option value="diagnostico">Diagnosticos</option>
          <option value="cita">Citas</option>
          <option value="pendiente">Pendientes</option>
          <option value="confirmada">Confirmadas</option>
        </select>
      </div>
      <div className="admin-table">
        <div className="admin-table-head admin-appointment-grid">
          <span>Fecha</span><span>Paciente</span><span>Tipo</span><span>Estado</span><span>Acciones</span>
        </div>
        {filtered.map((item) => (
          <div className="admin-table-row admin-appointment-grid" key={item.id}>
            <span><strong>{item.fecha}</strong><br />{String(item.hora).slice(0, 5)}</span>
            <span><strong>{item.nombre}</strong><br />{item.telefono}<br />{item.email}</span>
            <span>{item.tipo}<br />{item.motivo || item.preocupacion || "-"}</span>
            <span><b className={`status status-${item.estado}`}>{item.estado}</b></span>
            <span className="admin-actions">
              <button onClick={() => setStatus(item.id, "confirmada")}>Confirmar</button>
              <button onClick={() => setStatus(item.id, "completada")}>Completar</button>
              <button onClick={() => setStatus(item.id, "cancelada")}>Cancelar</button>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
