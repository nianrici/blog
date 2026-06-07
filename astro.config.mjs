import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://blog.riquelmes.com',
  integrations: [tailwind()],
});
