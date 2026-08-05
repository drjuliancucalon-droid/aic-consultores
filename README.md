# AIC Consultores — sitio web

Sitio institucional para una consultoría interdisciplinaria (contabilidad y
gestión tributaria, SG-SST, riesgo psicosocial y servicios especializados)
en Popayán, Cauca. Construido con **Astro 5 + TypeScript + Tailwind CSS**,
listo para desplegarse como sitio estático en **Cloudflare Pages**, con una
función serverless (Cloudflare Pages Functions) para el formulario de
contacto y la captura de leads en la sección de Recursos.

## Stack técnico

| Pieza | Herramienta |
|---|---|
| Framework | Astro 5 (salida estática) |
| Estilos | Tailwind CSS 3 + `@tailwindcss/typography` |
| Contenido | Content Collections (Markdown/MDX) — servicios, soluciones, recursos |
| Formularios | Cloudflare Pages Function (`/functions/api/contacto.ts`) |
| SEO | `@astrojs/sitemap`, metadatos Open Graph, JSON-LD (ProfessionalService) |
| Hosting recomendado | Cloudflare Pages |

## 1. Instalación local

Requiere Node.js 18.20.8+ o 20.3.0+ (probado con Node 22).

```bash
npm install
cp .env.example .env   # ya viene copiado con valores de ejemplo; ajústelos
npm run dev             # http://localhost:4321
```

Otros comandos:

```bash
npm run build     # genera el sitio estático en /dist
npm run preview   # sirve /dist localmente para probar el build de producción
```

## 2. Variables de entorno

Están documentadas con comentarios en `.env.example`. Resumen:

| Variable | Para qué sirve |
|---|---|
| `PUBLIC_SITE_URL` | Dominio final (sitemap, canonical, Open Graph) |
| `PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp Business, solo dígitos con código de país |
| `PUBLIC_WHATSAPP_MENSAJE` | Mensaje precargado del botón de WhatsApp |
| `PUBLIC_AGENDA_URL` | URL de su sistema de agenda (Cal.com, Calendly, etc.) |
| `PUBLIC_CONTACT_EMAIL` | Correo de contacto mostrado en el sitio |
| `PUBLIC_FORM_ENDPOINT` | A dónde se envían los formularios (por defecto `/api/contacto`) |
| `PUBLIC_GTM_ID` | Opcional. ID de Google Tag Manager, si decide usarlo |

**Ninguna de estas variables debe contener una clave API real** (son
`PUBLIC_`, es decir, quedan visibles en el navegador). Si conecta un
servicio de correo/CRM real en `functions/api/contacto.ts`, esa clave se
configura aparte, como variable de entorno **del lado servidor** en
Cloudflare Pages (ver sección 5).

## 3. Cómo editar el contenido (sin tocar código)

El contenido "de negocio" vive como archivos Markdown/MDX en
`src/content/`, no en los componentes:

- `src/content/servicios/*.md` — cada servicio (qué resuelve, incluye, no
  incluye, responsable, modalidad). Agregar un archivo nuevo agrega
  automáticamente una página en `/servicios/`.
- `src/content/soluciones/*.md` — las tres soluciones por sector.
- `src/content/recursos/*.mdx` — las guías descargables.
- `src/data/equipo.ts` — perfiles del equipo. **No se inventaron
  credenciales**: complete ahí los nombres y matrículas reales de sus
  colegas antes de publicar.
- `src/data/site.ts` — navegación, textos del FAQ del inicio y demás
  configuración reutilizada en varias páginas.

## 4. Pendientes antes de publicar (no inventado, a propósito)

Siguiendo la instrucción de no inventar credenciales, testimonios ni datos
de contacto, quedaron marcados explícitamente estos puntos:

- [ ] Nombres y matrículas reales de contador(a) y psicólogo(a)
      organizacional en `src/data/equipo.ts` (el perfil de médico
      laboral/SST ya está completo).
- [ ] Número real de WhatsApp Business en `.env`.
- [ ] URL real de agenda en línea en `.env`.
- [ ] Razón social y NIT en las páginas legales (`src/pages/legales/`),
      una vez formalizada la sociedad — actualmente redactadas para la
      fase de profesionales independientes.
- [ ] Revisión de las tres páginas legales por un abogado.
- [ ] Dominio definitivo (ver sección 6).

## 5. Despliegue

### GitHub

```bash
git init
git add .
git commit -m "Sitio inicial AIC Consultores"
git branch -M main
git remote add origin https://github.com/<su-usuario>/<su-repo>.git
git push -u origin main
```

### Cloudflare Pages

1. En el dashboard de Cloudflare → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**, seleccione el repositorio.
2. Configuración de build:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. En **Settings → Environment variables**, agregue las mismas variables
   de `.env.example` con sus valores reales de producción (para ambos
   entornos, Production y Preview).
4. La carpeta `/functions` se detecta automáticamente: no requiere
   configuración adicional para que `/api/contacto` funcione.
5. Al hacer push a `main`, Cloudflare construye y publica automáticamente.

## 6. Dominio

Sugerencias de nombre a verificar disponibilidad (no se confirmó
disponibilidad real; revíselo con un registrador como NIC Colombia,
GoDaddy o Cloudflare Registrar):

- `aicconsultores.co`
- `aic-consultores.com`
- `consultoresaic.co`

Pasos generales para conectar un dominio propio en Cloudflare Pages:
**Workers & Pages → su proyecto → Custom domains → Set up a custom
domain**, y siga las instrucciones para apuntar los DNS (si el dominio ya
está en Cloudflare, el proceso es prácticamente automático).

Después de definir el dominio, actualice `PUBLIC_SITE_URL` y la línea
`Sitemap:` de `public/robots.txt`.

## 7. Checklist de publicación

- [ ] Favicon y `apple-touch-icon.png` — ya incluidos (monograma de
      marca); reemplazar si define un logo definitivo distinto.
- [ ] SEO: título y descripción por página revisados; `PUBLIC_SITE_URL`
      configurado; `sitemap-index.xml` se genera solo en cada build.
- [ ] Formularios: endpoint de contacto conectado a un servicio real de
      correo/CRM (ver comentarios `TODO` en
      `functions/api/contacto.ts`); probado el envío de principio a fin.
- [ ] Política de datos, aviso de privacidad y términos revisados por un
      abogado y con razón social/NIT definitivos.
- [ ] Todos los enlaces internos probados con `npm run build && npm run
      preview`.
- [ ] Responsive probado en móvil, tablet y escritorio.
- [ ] Rendimiento: correr Lighthouse sobre el sitio publicado (Astro ya
      genera HTML estático y CSS minificado; las fuentes cargan desde
      Google Fonts con `preconnect`).
- [ ] Accesibilidad: navegación por teclado, foco visible, `prefers-
      reduced-motion` y contraste ya están cubiertos en el diseño base;
      vale la pena una pasada con un lector de pantalla antes de
      publicar.

## 8. Estructura del proyecto

```
src/
  components/     Componentes reutilizables (Header, Footer, formularios…)
  layouts/        BaseLayout.astro (head, SEO, header/footer comunes)
  content/        Contenido editable: servicios, soluciones, recursos
  data/           Configuración central (site.ts) y equipo (equipo.ts)
  pages/          Rutas del sitio (incluye páginas dinámicas [slug].astro)
  scripts/        Utilidad de analítica de eventos (analytics.ts)
  styles/         global.css (Tailwind + utilidades de marca)
functions/api/    Cloudflare Pages Function del formulario
public/           Estáticos: favicon, robots.txt, imagen Open Graph
design/           Fuente SVG editable de la imagen Open Graph
```

## 9. Analítica de eventos

`src/scripts/analytics.ts` empuja eventos a `window.dataLayer` (formato
estándar de GTM/GA4): `clic_whatsapp`, `clic_agendar`, `envio_formulario`,
`descarga_recurso`. Si define `PUBLIC_GTM_ID`, Google Tag Manager los
recibe automáticamente. Si prefiere otra herramienta (Plausible, Matomo),
puede leer `window.dataLayer` o modificar `trackEvent()` directamente.
