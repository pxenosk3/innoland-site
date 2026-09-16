# INNOLAND Site

Εταιρικό website της INNOLAND Ε.Π.Ε. (Καινοτόμα Επιχειρηματικά Δίκτυα Ανάπτυξης). Astro SSG, δίγλωσσο EL (default) / EN, deploy σε GitHub Pages / Cloudflare Pages.

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
  logo-v2.png, favicon.svg, .nojekyll, _headers, policies/*.pdf
```

## IA v2 (routes)

`/` `ypiresies` `tomeis` `etaireia` `erga` `nea` `politikes` `epikoinonia` (× EL/EN).

Στο τρέχον scaffold η αρχική είναι πλήρης (εγκεκριμένο v0.2) και το nav οδηγεί σε ενότητες (`#services` κ.λπ.) της αρχικής. Οι 7 σελίδες IA v2 υπάρχουν ως stubs (ρητό «υπό ολοκλήρωση», όχι fake περιεχόμενο) και δεσμεύουν τη δομή/URLs. Επόμενη φάση: συγγραφή περιεχομένου ανά σελίδα και σύνδεση του nav στα routes.

## Deploy

Ο προορισμός δημοσίευσης είναι config-driven: `astro.config.mjs` -> `SITE_URL` / `SITE_BASE`, με τις μεταβλητές περιβάλλοντος να υπερισχύουν. Καμία διαδρομή δεν είναι hardcoded: όλα τα εσωτερικά links/assets περνούν από το `withBase()` (`src/i18n/utils.ts`) και το `robots.txt` παράγεται σε build time.

### Τρέχον: GitHub Pages (project site)

| Ρύθμιση | Τιμή |
|---|---|
| URL | `https://pxenosk3.github.io/innoland-site/` |
| Workflow | `.github/workflows/deploy.yml` (push σε `main` -> build -> deploy) |
| `SITE_URL` | `https://pxenosk3.github.io` |
| `SITE_BASE` | `/innoland-site` |
| Pages source | GitHub Actions (όχι branch) |

Το `public/.nojekyll` είναι υποχρεωτικό: χωρίς αυτό το Jekyll του GitHub Pages αγνοεί τον φάκελο `_astro/` (hashed CSS/JS) και το site σερβίρεται χωρίς styles.

### Μετάβαση σε custom domain (`innoland.gr`)

1. Στο `deploy.yml`: `SITE_URL: https://innoland.gr`, `SITE_BASE: /`.
2. `public/CNAME` με περιεχόμενο `innoland.gr`.
3. Settings -> Pages -> Custom domain -> `innoland.gr`, Enforce HTTPS.
4. DNS στον **υπάρχοντα registrar**, χωρίς μεταφορά nameservers (τα MX του `info@innoland.gr` μένουν άθικτα): apex A records στις IP του GitHub Pages + `www` CNAME στο `pxenosk3.github.io`.

### Εναλλακτικά: Cloudflare Pages

Framework preset Astro, build `npm run build`, output `dist`, Node 20+. Root directory `/` αν το repo είναι ο φάκελος `site/`. Το `public/_headers` (security + caching) εφαρμόζεται μόνο σε Cloudflare, στο GitHub Pages αγνοείται.

## Εκκρεμότητες πριν το production

- **Custom domain**: το site ζει σε προσωρινό URL GitHub Pages. Μετάβαση κατά τα παραπάνω.
- **ISO πιστοποιητικά**: τα 5 claims βασίζονται στη λίστα φορέων, τα ίδια τα πιστοποιητικά δεν έχουν επαληθευτεί ένα-ένα (καμία δημοσίευση ISO claim χωρίς εν ισχύι πιστοποιητικό).
- **Σελίδα 404**: δεν υπάρχει custom `404.astro`, σερβίρεται το default του GitHub Pages.
- **Νέα**: η σελίδα είναι ειλικρινές empty state (καμία εικονική είδηση), ενεργοποίηση όταν υπάρξει υλικό. Το route είναι unlinked από το nav.
- **OG image**: δεν έχει οριστεί `og:image` (προαιρετικό social card).
- **apple-touch-icon**: δεν υπάρχει τετράγωνο brand asset. Προσθήκη 180x180 PNG αν χρειαστεί.

## Πηγή περιεχομένου

Όλο το κείμενο προέρχεται από τα masters `_source/*.docx` (προφίλ INNOLAND) μέσω του εγκεκριμένου v0.2. Στοιχεία επικοινωνίας: Πανεπιστημίου 56, 106 78 Αθήνα / +30 210 6995053 / info@innoland.gr.
