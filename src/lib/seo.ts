import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { site } from '@/config/site';

/**
 * Centralised SEO helpers. Every page builds its metadata through
 * `buildMetadata()` so titles, descriptions, canonical URLs, hreflang
 * alternates, Open Graph and Twitter cards stay consistent and never
 * duplicate each other.
 *
 * URLs are emitted relative to `metadataBase` (set in the root layout) so
 * Next.js resolves them to absolute URLs in the rendered HTML.
 */

/** Open Graph locale tokens for each app locale. */
export const OG_LOCALE: Record<string, string> = { ar: 'ar_AR', en: 'en_US' };

/** Site-wide social share image (1920×800 WebP served as /images/hero.jpg). */
export const DEFAULT_OG_IMAGE = '/images/hero.jpg';
export const OG_IMAGE_WIDTH = 1920;
export const OG_IMAGE_HEIGHT = 800;

/** Build a locale-prefixed, site-relative path: ('/about','en') → '/en/about'. */
export function localePath(path: string, locale: string): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Resolve a site-relative path to an absolute URL (used for JSON-LD). */
export function absoluteUrl(path = '/'): string {
  return new URL(path, site.domain).toString();
}

/**
 * hreflang alternates for a route: every locale + an `x-default` pointing at
 * the default locale. Returns site-relative paths (resolved via metadataBase).
 */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) languages[locale] = localePath(path, locale);
  languages['x-default'] = localePath(path, routing.defaultLocale);
  return languages;
}

export interface BuildMetadataInput {
  locale: string;
  /** Route path without the locale prefix, e.g. '/about' or '/'. */
  path: string;
  /**
   * Page title. By default it is the page segment (e.g. "About") and the
   * brand suffix is added by the layout's title template. Set `absoluteTitle`
   * to pass a complete, already-branded title (used by the home page).
   */
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  /** When true, `title` is used verbatim (no template, no brand suffix). */
  absoluteTitle?: boolean;
  /** Set false for pages that must not be indexed. */
  index?: boolean;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  absoluteTitle = false,
  index = true,
}: BuildMetadataInput): Metadata {
  const url = localePath(path, locale);
  const fullTitle = absoluteTitle ? title : `${title} — ${site.name}`;
  const alternateLocale = routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l] ?? l);
  const usesDefaultImage = image === DEFAULT_OG_IMAGE;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    ...(index ? {} : { robots: { index: false, follow: false } }),
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: OG_LOCALE[locale] ?? locale,
      alternateLocale,
      images: [
        {
          url: image,
          ...(usesDefaultImage ? { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT } : {}),
          alt: imageAlt ?? fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
