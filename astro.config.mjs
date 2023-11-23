import { defineConfig } from 'astro/config';
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      experimentalThemes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      langs: [],
      wrap: true,
    },
  },
  site: 'https://blog.riquelmes.com',
  integrations: [preact()]
});