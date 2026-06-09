"use client";

import { usePathname } from "next/navigation";
import { AdminHeader } from "./AdminHeader";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <>
      <AdminHeader />
      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "68px 16px 40px" }}>
        {children}
      </main>
    </>
  );
}
