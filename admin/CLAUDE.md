> DEFINICION CANONICA NORDARREL 2026: clinica capilar masculina premium en Barcelona. No ecommerce, no WordPress, no tienda, no pelucas/protesis. Servicios: diagnostico capilar gratis, tratamiento regenerativo si encaja, salud del cuero cabelludo y seguimiento presencial. Injerto/trasplante solo como opcion avanzada si el diagnostico lo justifica. CTA principal: Diagnostico gratis.
# NordArrel â€” Admin privado

Esto es el PANEL privado de NordArrel (Next.js). Se entra con login (Supabase Auth).
No es ecommerce.

## Local

- Admin (este proyecto): `http://localhost:6002` (login en `/login`)
- Web: `http://localhost:6001`

## Pestanas vivas

Solo 3: Dashboard, Contactos, Calendario (ver `app/page.tsx`).

## Supabase

- Proyecto: `NordArrel` (ref `cidlxminqqtptooovgbk`)
- Tablas: prefijo `nordarrel_*`.
- Claves reales en `.env.local`, nunca en el codigo.

## Conexiones

- Conexion a la base de datos: `lib/supabase/server.ts` y `lib/supabase/client.ts`.
- Guardia de acceso (login obligatorio): `middleware.ts`.
- Puertas (APIs) vivas: `app/api/` -> `dashboard`, `appointments`, `contacts`, `newsletter`.

Detalle completo en `../../docs/CONEXIONES-VPS-SUPABASE.md` y mapa en `../../docs/GUIA-DEL-CODIGO.md`.

