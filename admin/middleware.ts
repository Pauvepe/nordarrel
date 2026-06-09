import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/_next/", "/favicon.ico"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = request.cookies.get("sb-access-token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: process.env.NEXT_PUBLIC_SUPABASE_SCHEMA || "plantilla_limpia" } }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    const response = pathname.startsWith("/api/")
      ? NextResponse.json({ error: "Sesion expirada" }, { status: 401 })
      : NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("sb-access-token");
    return response;
  }

  const { data: profile } = await supabase
    .from("nordarrel_admin_users")
    .select("rol")
    .eq("auth_user_id", user.id)
    .eq("activo", true)
    .single();

  const ADMIN_ROLES = ["desarrollador", "admin", "editor"];
  if (!profile || !ADMIN_ROLES.includes(profile.rol)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
    }
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("sb-access-token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
