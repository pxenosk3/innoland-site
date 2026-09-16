// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// INNOLAND Ε.Π.Ε. - Astro SSG, δίγλωσσο EL (default) / EN.
// EL στη ρίζα (/), EN στο /en/ (prefixDefaultLocale: false).
// Static output -> σερβίρεται αυτούσιο το dist (GitHub Pages / Cloudflare Pages).

// ------------------------------------------------------------------
// ΠΡΟΟΡΙΣΜΟΣ ΔΗΜΟΣΙΕΥΣΗΣ (config-driven, βλ. README §Deploy)
// Τρέχον: GitHub Pages project site -> υποδιαδρομή /innoland-site.
// Μετάβαση σε innoland.gr: SITE_URL='https://innoland.gr', SITE_BASE='/'.
// Οι μεταβλητές περιβάλλοντος υπερισχύουν (CI/άλλος host χωρίς αλλαγή κώδικα).
// ------------------------------------------------------------------
const SITE_URL = process.env.SITE_URL ?? 'https://pxenosk3.github.io';
const SITE_BASE = process.env.SITE_BASE ?? '/innoland-site';

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
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
