"use client";

interface Props {
  ajustes: Record<string, string>;
  update: (key: string, val: string) => void;
}

const fields = [
  { key: "whatsapp_numero", label: "WhatsApp (numero)", placeholder: "34600000000" },
  { key: "whatsapp_mensaje", label: "WhatsApp (mensaje)", placeholder: "Hola, me gustaria pedir cita" },
  { key: "google_maps_url", label: "Google Maps URL", placeholder: "https://maps.google.com/..." },
  { key: "instagram_url", label: "Instagram", placeholder: "https://instagram.com/..." },
  { key: "facebook_url", label: "Facebook", placeholder: "https://facebook.com/..." },
  { key: "tiktok_url", label: "TikTok", placeholder: "https://tiktok.com/@..." },
];

export default function TabEnlaces({ ajustes, update }: Props) {
  return (
    <div style={{ backgroundColor: "#fff", border: "1px solid var(--admin-card-border)", padding: 20, maxWidth: 600 }}>
      {fields.map((f) => (
        <div key={f.key} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <label style={{ width: 160, fontSize: 13, color: "#555", flexShrink: 0 }}>
            {f.label}
          </label>
          <input
            type="text"
            value={ajustes[f.key] || ""}
            onChange={(e) => update(f.key, e.target.value)}
            placeholder={f.placeholder}
            style={inputStyle}
          />
        </div>
      ))}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontSize: 13, padding: "4px 8px", border: "1px solid #8c8f94", borderRadius: 3, width: "100%", boxSizing: "border-box",
};
