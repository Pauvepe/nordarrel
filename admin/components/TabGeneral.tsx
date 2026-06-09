"use client";

interface Props {
  ajustes: Record<string, string>;
  update: (key: string, val: string) => void;
}

const fields = [
  { key: "nombre_negocio", label: "Nombre del negocio" },
  { key: "telefono", label: "Telefono" },
  { key: "email", label: "Email" },
  { key: "direccion", label: "Direccion" },
  { key: "ciudad", label: "Ciudad" },
  { key: "codigo_postal", label: "Codigo postal" },
  { key: "horario", label: "Horario", type: "textarea" },
];

export default function TabGeneral({ ajustes, update }: Props) {
  return (
    <div style={{ backgroundColor: "#fff", border: "1px solid var(--admin-card-border)", padding: 20, maxWidth: 600 }}>
      {fields.map((f) => (
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
              style={inputStyle}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontSize: 13, padding: "4px 8px", border: "1px solid #8c8f94", borderRadius: 3, width: "100%", boxSizing: "border-box",
};
