"use client";

interface Props {
  ajustes: Record<string, string>;
  update: (key: string, val: string) => void;
}

interface Field {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface Section {
  title: string;
  fields: Field[];
}

const sections: Section[] = [
  {
    title: "Hero (banner principal)",
    fields: [
      { key: "hero_titulo", label: "Titulo" },
      { key: "hero_subtitulo", label: "Subtitulo" },
      { key: "hero_cta_texto", label: "Texto del boton" },
      { key: "hero_cta_url", label: "URL del boton (vacio = WhatsApp)", placeholder: "/contacto" },
    ],
  },
  {
    title: "Sobre Nosotros",
    fields: [
      { key: "sobre_nosotros_titulo", label: "Titulo" },
      { key: "sobre_nosotros_texto", label: "Texto", type: "textarea" },
    ],
  },
  {
    title: "SEO (meta tags)",
    fields: [
      { key: "meta_title", label: "Titulo de la pagina" },
      { key: "meta_description", label: "Descripcion", type: "textarea" },
    ],
  },
];

export default function TabTextos({ ajustes, update }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {sections.map((s) => (
        <div key={s.title} style={{ backgroundColor: "#fff", border: "1px solid var(--admin-card-border)", padding: 20, maxWidth: 600 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "var(--admin-text)" }}>{s.title}</h3>
          {s.fields.map((f) => (
            <div key={f.key} style={{ display: "flex", alignItems: f.type === "textarea" ? "flex-start" : "center", gap: 12, marginBottom: 16 }}>
              <label style={{ width: 160, fontSize: 13, color: "#555", flexShrink: 0, paddingTop: f.type === "textarea" ? 4 : 0 }}>
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  value={ajustes[f.key] || ""}
                  onChange={(e) => update(f.key, e.target.value)}
                  rows={3}
                  style={inputStyle}
                />
              ) : (
                <input
                  type="text"
                  value={ajustes[f.key] || ""}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder || ""}
                  style={inputStyle}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontSize: 13, padding: "4px 8px", border: "1px solid #8c8f94", borderRadius: 3, width: "100%", boxSizing: "border-box",
};
