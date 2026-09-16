// robots.txt παραγόμενο σε build time, ώστε το Sitemap URL να ακολουθεί
// το `site` + `base` του astro.config (GitHub Pages τώρα, innoland.gr αργότερα).
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL(
    `${import.meta.env.BASE_URL}/sitemap-index.xml`.replace(/\/{2,}/g, '/'),
    site,
  ).href;
  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
