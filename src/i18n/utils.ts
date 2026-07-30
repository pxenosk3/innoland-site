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

// Βάση διαδρομής ανά γλώσσα: EL -> '/', EN -> '/en/'.
export function localeBase(lang: Lang): string {
  return lang === 'en' ? '/en/' : '/';
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
  const isEn = pathname === '/en' || pathname === '/en/' || pathname.startsWith('/en/');
  let base = isEn ? pathname.replace(/^\/en/, '') : pathname;
  if (base === '') base = '/';
  if (target === 'en') {
    return base === '/' ? '/en/' : '/en' + base;
  }
  return base;
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
