// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'de', 'ru'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  server: {
    host: true, // Listen on 0.0.0.0 so Windows browser can always connect to http://localhost:4321
    port: 4321
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
