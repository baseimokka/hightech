import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { machines } from '@/data';
import { absoluteUrl, languageAlternates, localePath } from '@/lib/seo';

/**
 * /sitemap.xml — every public page, for every locale, with hreflang
 * alternates (incl. x-default). Portfolio is excluded while disabled.
 */
type Route = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const STATIC_ROUTES: Route[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/machines', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/quote', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const machineRoutes: Route[] = machines.map((m) => ({
    path: `/machines/${m.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const allRoutes = [...STATIC_ROUTES, ...machineRoutes];

  // One <url> entry per locale, each carrying the full set of hreflang links so
  // both language versions are discoverable and correctly cross-referenced.
  return allRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(localePath(route.path, locale)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(route.path)).map(([key, value]) => [
            key,
            absoluteUrl(value),
          ]),
        ),
      },
    })),
  );
}
