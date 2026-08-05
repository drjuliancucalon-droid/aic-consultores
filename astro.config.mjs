import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// ⚠️ Reemplace "site" por el dominio definitivo antes de publicar.
// Es obligatorio para que el sitemap.xml y las etiquetas canonical/OG generen URLs absolutas correctas.
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://www.aicconsultores.co';

// Sitio 100% estático — listo para Cloudflare Pages.
// Build: npm run build  →  Output: dist/
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  vite: {
    define: {
      __DATE_BUILD__: JSON.stringify(new Date().toISOString()),
    },
  },
});
