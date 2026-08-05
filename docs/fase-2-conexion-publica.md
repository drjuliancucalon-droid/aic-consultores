# Fase 2 completada — Conexión del sitio público a D1

## Qué se conectó
- `equipo.astro` ahora lee `team_members` desde D1 cuando hay registros; si D1 está vacía, usa el fallback estático de `src/data/equipo.ts`.
- Se creó `src/lib/site-resolver.ts` como capa única de resolución de configuración (D1 primero, `site.ts` como fallback).
- `legales/aviso-privacidad.astro` ahora usa `resolveSiteSettings` y lee texto legal enriquecido desde `legal_content` cuando existe.

## Pendiente de la misma fase
- Replicar el mismo patréon de fallback en `politica-tratamiento-datos.astro` y `terminos-condiciones.astro`.
- Replicar `resolveSiteSettings` en `Header.astro`, `Footer.astro`, `WhatsAppFloat.astro` y `contacto.astro` para que WhatsApp/agenda/correo se actualicen sin nuevo deploy de código (solo con Publicar desde el admin, que ya dispara el deploy hook).
- Conectar `servicios/[slug].astro`, `soluciones/[slug].astro` y `recursos/[slug].astro` a `content_entries` con el mismo patrón de fallback a Content Collections.
- Conectar `faqInicio` de `site.ts` con `faq_items` en la página de inicio.

## Nota de arquitectura
Todas las páginas públicas que ahora leen D1 se marcaron `export const prerender = false` porque el binding D1 solo existe en tiempo de request en Cloudflare Pages Functions, no en build estático. Esto es intencional y coherente con `output: 'hybrid'`: solo estas rutas específicas pasan a SSR: el resto del sitio sigue estático.
