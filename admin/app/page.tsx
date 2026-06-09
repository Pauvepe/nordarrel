"use client";

import { useState } from "react";
import TabDashboard from "@/components/TabDashboard";
import TabContactos from "@/components/TabContactos";
import TabCalendario from "@/components/TabCalendario";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "contactos", label: "Contactos" },
  { id: "calendario", label: "Calendario" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div>
      <h1>Panel NordArrel</h1>

      <div style={{ display: "flex", gap: 0, marginTop: 16, marginBottom: 20, borderBottom: "1px solid var(--admin-card-border)" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: activeTab === t.id ? 600 : 400,
              color: activeTab === t.id ? "var(--admin-primary)" : "var(--admin-text-secondary)",
              background: "none",
              border: "none",
              borderBottom: activeTab === t.id ? "2px solid var(--admin-primary)" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && <TabDashboard />}
      {activeTab === "contactos" && <TabContactos />}
      {activeTab === "calendario" && <TabCalendario />}
    </div>
  );
}
