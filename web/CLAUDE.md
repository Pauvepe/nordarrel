> DEFINICION CANONICA NORDARREL 2026: clinica capilar masculina premium en Barcelona. No ecommerce, no WordPress, no tienda, no pelucas/protesis. Servicios: diagnostico capilar gratis, tratamiento regenerativo si encaja, salud del cuero cabelludo y seguimiento presencial. Injerto/trasplante solo como opcion avanzada si el diagnostico lo justifica. CTA principal: Diagnostico gratis.
# NordArrel â€” Web publica

Esto es la WEB publica de NordArrel, una clinica capilar masculina hecha en Next.js.
No es ecommerce ni WordPress.

## Local

- Web (este proyecto): `http://localhost:6001`
- Admin: `http://localhost:6002`

## Supabase

- Proyecto: `NordArrel` (ref `cidlxminqqtptooovgbk`)
- Tablas: prefijo `nordarrel_*` (contacts, appointments, newsletter_subscribers,
  admin_users, calendar_blocks, appointment_notes).
- Claves reales en `.env.local`, nunca en el codigo.

## Conexiones

- Supabase: `src/lib/supabase-server.ts` (llave maestra) y `src/lib/supabase.ts` (llave normal).
- Emails: `src/lib/email.ts` (Resend).
- Puertas (APIs): `src/app/api/` -> `appointments`, `availability`, `newsletter`.

Detalle completo en `../../docs/CONEXIONES-VPS-SUPABASE.md` y mapa en `../../docs/GUIA-DEL-CODIGO.md`.

