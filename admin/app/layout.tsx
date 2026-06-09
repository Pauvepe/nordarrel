// =====================================================================
// LAYOUT GENERAL DEL ADMIN
// ---------------------------------------------------------------------
// Marco que envuelve todo el panel. Mete cada pantalla dentro de
// AdminShell (que pone la cabecera y, si no estas en login, exige sesion).
// =====================================================================
import type { Metadata } from "next";
import "./globals.css";
import { AdminShell } from "@/components/AdminShell";

export const metadata: Metadata = {
  title: "Admin Servicios",
  description: "Panel de administracion para web de servicios",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
