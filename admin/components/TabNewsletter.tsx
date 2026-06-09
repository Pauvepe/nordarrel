"use client";

import { useEffect, useState } from "react";

type Subscriber = {
  id: string;
  email: string;
  estado: string;
  origen: string;
  created_at: string;
};

export default function TabNewsletter() {
  const [items, setItems] = useState<Subscriber[]>([]);

  useEffect(() => {
    fetch("/api/newsletter").then((r) => r.json()).then((d) => setItems(Array.isArray(d) ? d : []));
  }, []);

  return (
    <section className="admin-card">
      <h2>Newsletter</h2>
      <div className="admin-table">
        <div className="admin-table-head admin-newsletter-grid"><span>Email</span><span>Estado</span><span>Origen</span><span>Alta</span></div>
        {items.map((item) => (
          <div className="admin-table-row admin-newsletter-grid" key={item.id}>
            <span>{item.email}</span>
            <span><b className={`status status-${item.estado}`}>{item.estado}</b></span>
            <span>{item.origen}</span>
            <span>{new Date(item.created_at).toLocaleDateString("es-ES")}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
