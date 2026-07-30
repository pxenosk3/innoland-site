// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// INNOLAND Ε.Π.Ε. - Astro SSG, δίγλωσσο EL (default) / EN.
// EL στη ρίζα (/), EN στο /en/ (prefixDefaultLocale: false).
// Static output -> deploy σε Cloudflare Pages χωρίς adapter.
export default defineConfig({
  // Απόλυτο URL για canonical/sitemap. Επιβεβαίωση apex vs www πριν το deploy (βλ. README).
  site: 'https://innoland.gr',
  output: 'static',
  i18n: {
    locales: ['el', 'en'],
    defaultLocale: 'el',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'el',
        locales: { el: 'el-GR', en: 'en-GB' },
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
