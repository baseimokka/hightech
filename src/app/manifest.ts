import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { routing } from '@/i18n/routing';

/**
 * /manifest.webmanifest — PWA / install metadata. Mirrors the brand colours
 * (dark steel chrome, white surface) and the existing SVG favicon.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Industrial Machinery & Metal Fabrication`,
    short_name: site.name,
    description:
      'Precision engineering at industrial scale: CNC machining, laser cutting, spare parts and metal fabrication.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0c0f',
    lang: routing.defaultLocale,
    dir: 'rtl',
    categories: ['business', 'industrial', 'manufacturing'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
