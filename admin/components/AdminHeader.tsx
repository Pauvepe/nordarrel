"use client";

// =====================================================================
// COMPONENTE: AdminHeader (barra superior fija del panel)
// ---------------------------------------------------------------------
// La cabecera del admin. La usa AdminShell, que envuelve todas las
// pantallas menos el login.
// =====================================================================
import { ExternalLink } from "lucide-react";

export function AdminHeader() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--admin-header-height)",
        backgroundColor: "var(--admin-header-bg)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 9999,
        fontSize: 13,
      }}
    >
      <span style={{ fontWeight: 600 }}>NordArrel Admin</span>
      <a
        href={process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:6001"}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#c3c4c7",
          display: "flex",
          alignItems: "center",
          gap: 6,
          textDecoration: "none",
          fontSize: 12,
        }}
      >
        Ver web <ExternalLink size={12} />
      </a>
    </header>
  );
}
