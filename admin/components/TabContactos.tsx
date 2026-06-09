"use client";

// =====================================================================
// PESTANA: Contactos (mini CRM)
// ---------------------------------------------------------------------
// Lista y busca contactos, muestra sus datos y si estan en la newsletter,
// y deja guardar notas internas. Pide datos a /api/contacts (y a
// /api/newsletter para el estado de suscripcion) y guarda con /api/contacts.
// =====================================================================
import { Cake, Mail, Search, StickyNote } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Contact = {
  id: string;
  nombre: string;
  email?: string;
  telefono?: string;
  fecha_nacimiento?: string;
  edad?: number;
  canal_origen: string;
  segmento: string;
  newsletter: boolean;
  notas?: string;
  ultimo_motivo?: string;
  updated_at: string;
};

type Subscriber = {
  id: string;
  email: string;
  estado: string;
  origen: string;
  created_at: string;
};

export default function TabContactos() {
  const [items, setItems] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const [notes, setNotes] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const load = () =>
    fetch(`/api/contacts?search=${encodeURIComponent(search)}`)
      .then((r) => r.json())
      .then((d) => setItems(Array.isArray(d) ? d : []));

  useEffect(() => {
    load();
    fetch("/api/newsletter")
      .then((r) => r.json())
      .then((d) => setSubscribers(Array.isArray(d) ? d : []));
  }, []);

  const selectedContact = useMemo(
    () => (selected ? items.find((item) => item.id === selected.id) || selected : null),
    [items, selected]
  );

  async function saveNotes() {
    if (!selectedContact) return;
    await fetch("/api/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedContact.id, notas: notes }),
    });
    load();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Contactos inscritos */}
      <div>
        <h2 style={{ marginBottom: 12 }}>Contactos ({items.length})</h2>
        <div className="admin-split">
          <section className="admin-card">
            <div className="admin-search">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") load(); }}
                placeholder="Buscar contacto"
              />
              <button onClick={load}>Buscar</button>
            </div>
            <div className="admin-table">
              {items.map((item) => (
                <button
                  className="contact-row"
                  key={item.id}
                  onClick={() => { setSelected(item); setNotes(item.notas || ""); }}
                >
                  <span>
                    <strong>{item.nombre}</strong>
                    <br />
                    {item.email || "-"} · {item.telefono || "-"}
                  </span>
                  <span>
                    {item.segmento}
                    <br />
                    {item.newsletter ? "Newsletter" : "Sin newsletter"}
                  </span>
                </button>
              ))}
              {items.length === 0 && <p className="admin-empty">Sin contactos.</p>}
            </div>
          </section>

          <aside className="admin-card admin-detail">
            {selectedContact ? (
              <>
                <h2>{selectedContact.nombre}</h2>
                <p><Mail size={14} /> {selectedContact.email || "-"}</p>
                <p><Cake size={14} /> {selectedContact.fecha_nacimiento || selectedContact.edad || "Sin cumpleaños"}</p>
                <p><StickyNote size={14} /> Origen: {selectedContact.canal_origen} · Último motivo: {selectedContact.ultimo_motivo || "-"}</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={8}
                  placeholder="Notas internas"
                />
                <button className="admin-primary" onClick={saveNotes}>Guardar notas</button>
              </>
            ) : (
              <p className="admin-empty">Selecciona un contacto.</p>
            )}
          </aside>
        </div>
      </div>

      {/* Newsletter */}
      <div>
        <h2 style={{ marginBottom: 12 }}>Newsletter ({subscribers.length})</h2>
        <section className="admin-card">
          <div className="admin-table">
            <div className="admin-table-head admin-newsletter-grid">
              <span>Email</span><span>Estado</span><span>Origen</span><span>Alta</span>
            </div>
            {subscribers.map((item) => (
              <div className="admin-table-row admin-newsletter-grid" key={item.id}>
                <span>{item.email}</span>
                <span><b className={`status status-${item.estado}`}>{item.estado}</b></span>
                <span>{item.origen}</span>
                <span>{new Date(item.created_at).toLocaleDateString("es-ES")}</span>
              </div>
            ))}
            {subscribers.length === 0 && <p className="admin-empty">Sin suscriptores.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
