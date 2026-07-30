# INNOLAND Site

Εταιρικό website της INNOLAND Ε.Π.Ε. (Καινοτόμα Επιχειρηματικά Δίκτυα Ανάπτυξης). Astro SSG, δίγλωσσο EL (default) / EN, deploy σε Cloudflare Pages.

Το scaffold είναι πιστή μεταφορά του εγκεκριμένου concept `_concept/index_v0.2.html` (2026-07-30) σε συντηρήσιμη, δίγλωσση, στατική δομή.

## Στοίβα

- **Astro** (SSG, `output: 'static'`) - χωρίς adapter, το `dist/` σερβίρεται αυτούσιο.
- **i18n native routing**: EL στη ρίζα (`/`), EN με πρόθεμα (`/en/`). Το περιεχόμενο αποδίδεται σε build time από λεξικό (`src/i18n/ui.ts`), όχι client-side swap. Ένα URL ανά γλώσσα (SEO, μηδέν FOUC).
- **Χωρίς runtime dependencies** πέραν της Astro. Vanilla JS μόνο για theme toggle + mobile menu.

## Εντολές

```bash
npm install        # εγκατάσταση
npm run dev        # dev server (http://localhost:4321)
npm run build      # production build -> dist/
npm run preview    # τοπική προεπισκόπηση του build
npm run check      # astro check (type-check)
```

## Δομή

```
src/
  i18n/
    ui.ts          # λεξικό EL+EN (single source, πλήρης parity)
    utils.ts       # useTranslations, locale helpers, alt-locale URL
  layouts/
    BaseLayout.astro  # <head> (meta/hreflang/OG), theme-init, Header, slot, Footer
  components/
    Header.astro   # nav, διακόπτης γλώσσας (URL links), theme/menu buttons
    Footer.astro
    Home.astro     # 11 ενότητες αρχικής (hero -> contact CTA)
    PageStub.astro # placeholder σελίδων IA v2 υπό ολοκλήρωση
  pages/
    index.astro           /            (EL αρχική)
    ypiresies|tomeis|etaireia|erga|nea|politikes|epikoinonia.astro   (EL, stub)
    en/
      index.astro         /en/         (EN αρχική)
      ...                 /en/<slug>   (EN, stub)
  styles/
    global.css     # design system (tokens dual-theme, όλες οι κλάσεις)
public/
  logo.png, favicon.svg, robots.txt, _headers
```

## IA v2 (routes)

`/` `ypiresies` `tomeis` `etaireia` `erga` `nea` `politikes` `epikoinonia` (× EL/EN).

Στο τρέχον scaffold η αρχική είναι πλήρης (εγκεκριμένο v0.2) και το nav οδηγεί σε ενότητες (`#services` κ.λπ.) της αρχικής. Οι 7 σελίδες IA v2 υπάρχουν ως stubs (ρητό «υπό ολοκλήρωση», όχι fake περιεχόμενο) και δεσμεύουν τη δομή/URLs. Επόμενη φάση: συγγραφή περιεχομένου ανά σελίδα και σύνδεση του nav στα routes.

## Deploy - Cloudflare Pages

Σύνδεση του git repo στο Cloudflare Pages με ρυθμίσεις:

| Ρύθμιση | Τιμή |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `27. INNOLAND Site/site` (αν το repo είναι το project root) ή `/` (αν το repo είναι ο φάκελος `site/`) |
| Node version | 20+ (env `NODE_VERSION`) |

Το `public/_headers` εφαρμόζεται αυτόματα (security + caching). Δωρεάν πλάνο επαρκές (static).

## Εκκρεμότητες πριν το production

- **`site` URL** (`astro.config.mjs`): τώρα `https://innoland.gr` (apex). Επιβεβαίωση apex vs `www` πριν το deploy (επηρεάζει canonical/hreflang/sitemap).
- **DNS/registrar** `innoland.gr`: ποιος διαχειρίζεται, σύνδεση με CF Pages.
- **ISO PDF πολιτικών**: ενσωμάτωση στη σελίδα Πολιτικές. Κανένα ISO claim χωρίς έγκυρο εν ισχύ πιστοποιητικό.
- **Περιεχόμενο σελίδων IA v2**: αντικατάσταση των stubs.
- **Νέα**: οι καταχωρίσεις είναι υπόδειγμα (ρητά σημειωμένο), αντικατάσταση με πραγματικά γεγονότα.
- **OG image**: δεν έχει οριστεί `og:image` (προαιρετικό social card).
- **apple-touch-icon**: δεν υπάρχει τετράγωνο brand asset. Προσθήκη 180×180 PNG αν χρειαστεί.

## Πηγή περιεχομένου

Όλο το κείμενο προέρχεται από τα masters `_source/*.docx` (προφίλ INNOLAND) μέσω του εγκεκριμένου v0.2. Στοιχεία επικοινωνίας: Πανεπιστημίου 56, 106 78 Αθήνα / +30 210 6995053 / info@innoland.gr.
