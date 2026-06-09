"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  precio: string;
  icono: string;
  imagen_url: string | null;
  visible: boolean;
  orden: number;
}

const iconOptions = ["Sparkles", "Heart", "Zap", "Hand", "Star", "Scissors", "Sun", "Droplets", "Eye", "Smile", "Shield", "Clock"];

export default function TabServicios() {
  const [items, setItems] = useState<Servicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Servicio | null>(null);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", icono: "Sparkles", imagen_url: "", visible: true });

  useEffect(() => {
    fetch("/api/servicios").then((r) => r.json()).then((d) => { setItems(d); setLoading(false); });
  }, []);

  const resetForm = () => {
    setForm({ nombre: "", descripcion: "", precio: "", icono: "Sparkles", imagen_url: "", visible: true });
    setEditing(null);
  };

  const handleSave = async () => {
    if (!form.nombre.trim()) return;
    const body = { ...form, imagen_url: form.imagen_url || null, orden: editing ? editing.orden : items.length + 1 };

    if (editing) {
      const res = await fetch(`/api/servicios/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      setItems((prev) => prev.map((i) => i.id === editing.id ? data : i));
    } else {
      const res = await fetch("/api/servicios", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (data.id) setItems((prev) => [...prev, data]);
    }
    resetForm();
  };

  const handleEdit = (s: Servicio) => {
    setEditing(s);
    setForm({ nombre: s.nombre, descripcion: s.descripcion, precio: s.precio, icono: s.icono, imagen_url: s.imagen_url || "", visible: s.visible });
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/servicios/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div className="skeleton" style={{ width: "100%", height: 200 }} />;

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {/* Form */}
      <div style={{ backgroundColor: "#fff", border: "1px solid var(--admin-card-border)", padding: 20, width: 300, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600 }}>{editing ? "Editar" : "Nuevo"} servicio</h3>
          {editing && <button onClick={resetForm} style={{ background: "none", border: "none", cursor: "pointer", color: "#888" }}><X size={16} /></button>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Nombre del servicio" style={inputStyle} />
          <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} placeholder="Descripcion" rows={3} style={inputStyle} />
          <input type="text" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} placeholder="Precio (ej: Desde 45€)" style={inputStyle} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: 13, color: "#555" }}>Icono:</label>
            <select value={form.icono} onChange={(e) => setForm({ ...form, icono: e.target.value })} style={{ ...inputStyle, width: 140 }}>
              {iconOptions.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <input type="text" value={form.imagen_url} onChange={(e) => setForm({ ...form, imagen_url: e.target.value })} placeholder="URL imagen (opcional)" style={inputStyle} />
          <label style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} /> Visible
          </label>
          <button onClick={handleSave} style={btnPrimary} disabled={!form.nombre.trim()}>
            {editing ? "Actualizar" : <><Plus size={14} /> Anadir</>}
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, minWidth: 300 }}>
        {items.length === 0 ? (
          <p style={{ color: "#888", fontSize: 13 }}>No hay servicios.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, backgroundColor: "#fff", border: "1px solid var(--admin-card-border)" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--admin-card-border)", textAlign: "left" }}>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Precio</th>
                <th style={thStyle}>Visible</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={tdStyle}>
                    <strong>{s.nombre}</strong>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.icono}</div>
                  </td>
                  <td style={tdStyle}>{s.precio}</td>
                  <td style={tdStyle}>{s.visible ? "Si" : "No"}</td>
                  <td style={{ ...tdStyle, display: "flex", gap: 8 }}>
                    <button onClick={() => handleEdit(s)} style={iconBtn}><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(s.id)} style={{ ...iconBtn, color: "var(--admin-destructive)" }}><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = { fontSize: 13, padding: "4px 8px", border: "1px solid #8c8f94", borderRadius: 3, width: "100%", boxSizing: "border-box" };
const btnPrimary: React.CSSProperties = { fontSize: 13, padding: "6px 16px", backgroundColor: "var(--admin-primary)", color: "#fff", border: "1px solid var(--admin-primary)", borderRadius: 3, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, width: "fit-content" };
const thStyle: React.CSSProperties = { padding: "8px 12px", fontSize: 12, color: "#555", fontWeight: 600 };
const tdStyle: React.CSSProperties = { padding: "8px 12px", verticalAlign: "top" };
const iconBtn: React.CSSProperties = { background: "none", border: "none", cursor: "pointer", color: "var(--admin-primary)", padding: 2 };
