import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

/**
 * /robots.txt — allow all public pages, keep crawlers out of non-public
 * areas, and point at the sitemap. Portfolio is temporarily disabled
 * (returns 404), so it is disallowed for both locales.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/private/',
          '/ar/portfolio',
          '/en/portfolio',
        ],
      },
    ],
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
