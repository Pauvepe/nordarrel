"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createBrowserClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !data.session) {
        setError("Email o contrasena incorrectos");
        setLoading(false);
        return;
      }

      document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      window.location.href = "/";
    } catch {
      setError("Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <div style={{ width: "100%", maxWidth: 360, background: "#fff", padding: 32, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 24, color: "#222" }}>
          NordArrel Admin
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4, color: "#555" }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
              style={{ width: "100%", padding: "8px 12px", fontSize: 14, border: "1px solid #ddd", borderRadius: 4, boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 4, color: "#555" }}>Contrasena</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password"
              style={{ width: "100%", padding: "8px 12px", fontSize: 14, border: "1px solid #ddd", borderRadius: 4, boxSizing: "border-box" }} />
          </div>
          {error && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 12 }}>{error}</p>}
          <button type="submit" disabled={loading || !email || !password}
            style={{ width: "100%", padding: "10px", fontSize: 14, fontWeight: 600, color: "#fff", background: "#2271b1", border: "none", borderRadius: 4, cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Iniciando sesion..." : "Iniciar sesion"}
          </button>
        </form>
      </div>
    </div>
  );
}
