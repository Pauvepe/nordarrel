"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";

interface Imagen {
  id: string;
  seccion: string;
  posicion: number;
  url: string;
  alt: string;
}

const secciones = [
  { id: "hero", label: "Hero (banner principal)" },
  { id: "sobre_nosotros", label: "Sobre Nosotros" },
  { id: "galeria", label: "Galeria / Trabajos" },
  { id: "logo", label: "Logo" },
];

export default function TabImagenes() {
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [newSeccion, setNewSeccion] = useState("hero");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/imagenes")
      .then((r) => r.json())
      .then((data) => { setImagenes(data); setLoading(false); });
  }, []);

  const handleAdd = async () => {
    if (!newUrl.trim()) return;
    const maxPos = imagenes.filter((i) => i.seccion === newSeccion).length;
    const res = await fetch("/api/imagenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seccion: newSeccion, url: newUrl.trim(), alt: newAlt.trim(), posicion: maxPos }),
    });
    const data = await res.json();
    if (data.id) {
      setImagenes((prev) => [...prev, data]);
      setNewUrl("");
      setNewAlt("");
    }
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/imagenes/${id}`, { method: "DELETE" });
    setImagenes((prev) => prev.filter((i) => i.id !== id));
  };

  if (loading) return <div className="skeleton" style={{ width: "100%", height: 200 }} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Add new image */}
      <div style={{ backgroundColor: "#fff", border: "1px solid var(--admin-card-border)", padding: 20, maxWidth: 600 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Anadir imagen</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <select value={newSeccion} onChange={(e) => setNewSeccion(e.target.value)} style={inputStyle}>
              {secciones.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <input type="text" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="URL de la imagen" style={inputStyle} />
          <input type="text" value={newAlt} onChange={(e) => setNewAlt(e.target.value)} placeholder="Texto alternativo (alt)" style={inputStyle} />
          <button onClick={handleAdd} style={btnPrimary} disabled={!newUrl.trim()}>
            <Plus size={14} style={{ marginRight: 4 }} /> Anadir
          </button>
        </div>
      </div>

      {/* Images by section */}
      {secciones.map((s) => {
        const items = imagenes.filter((i) => i.seccion === s.id);
        if (items.length === 0) return null;
        return (
          <div key={s.id} style={{ backgroundColor: "#fff", border: "1px solid var(--admin-card-border)", padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>{s.label} ({items.length})</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
              {items.map((img) => (
                <div key={img.id} style={{ border: "1px solid #e0e0e0", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <img src={img.url} alt={img.alt} style={{ width: "100%", height: 100, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "6px 8px", fontSize: 11, color: "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {img.alt || img.url.split("/").pop()}
                  </div>
                  <button
                    onClick={() => handleDelete(img.id)}
                    style={{ position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", color: "#fff", border: "none", borderRadius: 3, padding: "2px 4px", cursor: "pointer" }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontSize: 13, padding: "4px 8px", border: "1px solid #8c8f94", borderRadius: 3, width: "100%", boxSizing: "border-box",
};

const btnPrimary: React.CSSProperties = {
  fontSize: 13, padding: "6px 16px", backgroundColor: "var(--admin-primary)", color: "#fff", border: "1px solid var(--admin-primary)", borderRadius: 3, cursor: "pointer", display: "inline-flex", alignItems: "center", width: "fit-content",
};
