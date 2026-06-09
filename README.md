# NordArrel — Web i Admin

Codi del **Projecte Integrat** de Pau Vera Pérez (2GI14 · La Llotja · Juny 2026).
NordArrel és una clínica capil·lar masculina premium a Barcelona. No és ecommerce
ni WordPress: és una web de servei feta en codi, amb un admin privat al darrere.

## Web en viu

- Web pública: https://nordarrel-web.pauvepe.com/
- Admin privat: https://nordarrel-admin.pauvepe.com/login

## Què hi ha en aquest repositori

- `web/` — web pública (Next.js + TypeScript). Home, serveis, sobre nosaltres,
  contacte, diagnòstic, cita i pàgines legals.
- `admin/` — panell privat (Next.js + Supabase Auth) per gestionar leads, cites,
  diagnòstics i newsletter.
- `supabase/` — esquema i migracions de la base de dades.

## Stack

- Next.js (App Router) + TypeScript + CSS/Tailwind.
- Supabase (base de dades + autenticació).
- Resend (emails de confirmació i avís).
- Desplegat en una VPS de Google Cloud amb pm2, nginx i HTTPS.

## Notes

- Les claus reals viuen en `.env.local` (no s'inclouen al repositori). Els fitxers
  `.env.example` mostren quines variables calen.
- L'entrada principal de la web és el **diagnòstic sense compromís**; "agendar cita"
  queda com a via secundària.
