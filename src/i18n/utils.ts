// ============================================================
// INNOLAND - i18n helpers
// EL default στη ρίζα (/), EN με πρόθεμα /en (prefixDefaultLocale:false).
// ============================================================
import { ui, defaultLang, type Lang, type UiKey } from './ui';

// t() για δεδομένη γλώσσα, με fallback στη default γλώσσα.
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

// Locale από το URL pathname.
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/')[1];
  return seg === 'en' ? 'en' : 'el';
}

// Βάση δημοσίευσης (astro.config `base`), κανονικοποιημένη σε '/...' με τελική '/'.
// '/' όταν το site ζει στη ρίζα domain, '/innoland-site/' σε GitHub Pages project site.
const rawBase = import.meta.env.BASE_URL ?? '/';
export const siteBase: string =
  ('/' + rawBase.replace(/^\/+/, '').replace(/\/+$/, '') + '/').replace(/^\/{2,}/, '/');

// Πρόθεμα βάσης σε path/asset. Δέχεται 'logo.png' ή '/logo.png'.
export function withBase(path: string): string {
  return siteBase + path.replace(/^\/+/, '');
}

// Αφαίρεση του προθέματος βάσης από pathname (για λογική ανεξάρτητη του host).
export function stripBase(pathname: string): string {
  if (siteBase === '/') return pathname;
  const b = siteBase.slice(0, -1); // χωρίς τελική '/'
  if (pathname === b) return '/';
  if (pathname.startsWith(siteBase)) return '/' + pathname.slice(siteBase.length);
  return pathname;
}

// Βάση διαδρομής ανά γλώσσα: EL -> <base>, EN -> <base>en/.
export function localeBase(lang: Lang): string {
  return lang === 'en' ? withBase('en/') : siteBase;
}

// Localized path για εσωτερικό route slug (π.χ. 'ypiresies').
export function localizedPath(lang: Lang, slug = ''): string {
  const base = localeBase(lang);
  if (!slug) return base;
  return base + slug + '/';
}

// Anchor προς ενότητα της αρχικής, ανεξάρτητα από τρέχουσα σελίδα.
export function homeAnchor(lang: Lang, id: string): string {
  return localeBase(lang) + '#' + id;
}

// URL της άλλης γλώσσας για την ίδια σελίδα (για τον διακόπτη γλώσσας).
export function altLocaleUrl(pathname: string, target: Lang): string {
  const p = stripBase(pathname);
  const isEn = p === '/en' || p === '/en/' || p.startsWith('/en/');
  let rest = isEn ? p.replace(/^\/en/, '') : p;
  if (rest === '') rest = '/';
  if (target === 'en') {
    return rest === '/' ? withBase('en/') : withBase('en' + rest);
  }
  return withBase(rest);
}

// IA v2 route slugs (κοινά και για τις δύο γλώσσες).
export const routeSlugs = [
  'ypiresies',
  'tomeis',
  'etaireia',
  'erga',
  'nea',
  'politikes',
  'epikoinonia',
] as const;

export type { Lang, UiKey };
