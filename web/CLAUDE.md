@../../ecommerce/codigo/admin/AGENTS.md

# ⚠️ PUERTOS LOCALES — NO MEZCLAR CON ECOMMERCE ⚠️

Esto es la WEB publica de SERVICIOS. En desarrollo local convive con otros proyectos:

| Proyecto | Puerto | Directorio |
|----------|--------|------------|
| **ECOMMERCE admin** | **5000** | `ecommerce/codigo/admin/` |
| **ECOMMERCE web** | **5001** | `ecommerce/codigo/web/` |
| **SERVICIOS admin** | **6000** | `servicios/codigo/admin/` |
| **SERVICIOS web** (ESTE) | **6001** | `servicios/codigo/web/` |

Ver `LOCAL.md` seccion 2 para instrucciones completas de arranque.

**PROHIBIDO**: Cualquier link o referencia a `localhost:5000` o `localhost:5001` desde servicios.
Ecommerce y servicios son proyectos 100% independientes. Comparten Supabase (schema `plantilla_limpia`) pero usan tablas distintas (`servicios_*` vs `ecommerce_*`). En produccion van a clientes diferentes.

# Tablas Supabase
Prefijo: `servicios_*` (ajustes, imagenes, testimonios, servicios)
NUNCA tocar tablas `ecommerce_*`.
