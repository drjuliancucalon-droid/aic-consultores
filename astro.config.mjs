import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'hybrid',
  site: process.env.PUBLIC_SITE_URL || 'https://www.aicconsultores.co',
  integrations: [tailwind(), sitemap(), mdx()],
});
