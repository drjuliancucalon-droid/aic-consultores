import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// ⚠️ Reemplace "site" por el dominio definitivo antes de publicar.
// Es obligatorio para que el sitemap.xml y las etiquetas canonical/OG generen URLs absolutas correctas.
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://www.aicconsultores.co';

// Cloudflare Pages con adapter para rutas API del admin CMS.
// Las páginas públicas se pre-renderizan estáticamente.
// Build: npm run build  →  Output: dist/
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  output: 'server',
  adapter: cloudflare({
    mode: 'directory',
  }),
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
