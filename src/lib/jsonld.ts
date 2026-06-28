/**
 * schema.org structured-data (JSON-LD) builders.
 *
 * All `@id`s and URLs are absolute (JSON-LD is not resolved against
 * `metadataBase`). The Organization node is referenced by `@id` from the
 * other nodes so the graph stays connected without repeating company data.
 */
import { absoluteUrl, localePath } from './seo';
import { site } from '@/config/site';
import { company, contact, pick } from '@/data';
import type { Machine, MachineCategory } from '@/data';

const ORG_ID = `${site.domain}/#organization`;
const WEBSITE_ID = `${site.domain}/#website`;

type Json = Record<string, unknown>;

/** Organization — emitted globally from the root layout. */
export function organizationSchema(locale: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: pick(locale, company.nameAr, company.nameEn),
    legalName: site.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.svg'),
    image: absoluteUrl('/images/hero.jpg'),
    description: pick(locale, company.descriptionAr, company.descriptionEn),
    slogan: pick(locale, company.taglineAr, company.taglineEn),
    email: contact.email,
    telephone: contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: pick(locale, contact.addressAr, contact.addressEn),
      addressLocality: 'Qalyub',
      addressRegion: 'Qalyubia',
      addressCountry: 'EG',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: contact.phone,
        email: contact.email,
        contactType: 'sales',
        availableLanguage: ['Arabic', 'English'],
      },
    ],
    sameAs: [company.social.facebook, company.social.instagram].filter(
      (url) => url && url !== '#',
    ),
  };
}

/** WebSite — emitted on the home page. */
export function websiteSchema(locale: string): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: site.name,
    description: pick(locale, company.descriptionAr, company.descriptionEn),
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  };
}

export interface Crumb {
  name: string;
  /** Site-relative path including the locale prefix, e.g. '/en/about'. */
  path: string;
}

/** BreadcrumbList — emitted on inner pages. */
export function breadcrumbSchema(items: Crumb[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** A WebPage subtype (AboutPage / ContactPage / WebPage). */
export function webPageSchema({
  type,
  locale,
  path,
  name,
  description,
}: {
  type: 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'WebPage';
  locale: string;
  /** Bare route path without the locale prefix, e.g. '/about'. */
  path: string;
  name: string;
  description: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    url: absoluteUrl(localePath(path, locale)),
    name,
    description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  };
}

/** ItemList of Service offerings — emitted on the services page. */
export function servicesSchema(
  locale: string,
  services: Array<{ titleAr: string; titleEn: string; descriptionAr: string; descriptionEn: string }>,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: pick(locale, s.titleAr, s.titleEn),
        description: pick(locale, s.descriptionAr, s.descriptionEn),
        provider: { '@id': ORG_ID },
        areaServed: 'EG',
      },
    })),
  };
}

/** ItemList of machines — emitted on the machines listing page. */
export function machineListSchema(
  locale: string,
  machines: Machine[],
  basePath: string,
): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: machines.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: pick(locale, m.nameAr, m.nameEn),
      url: absoluteUrl(`${basePath}/${m.slug}`),
    })),
  };
}

/** Product — emitted on a machine detail page. */
export function machineProductSchema({
  locale,
  machine,
  category,
  image,
}: {
  locale: string;
  machine: Machine;
  category?: MachineCategory;
  image?: string;
}): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: pick(locale, machine.nameAr, machine.nameEn),
    description: pick(locale, machine.descriptionAr, machine.descriptionEn),
    ...(image ? { image: absoluteUrl(image) } : {}),
    ...(category ? { category: pick(locale, category.titleAr, category.titleEn) } : {}),
    brand: { '@type': 'Brand', name: site.name },
    additionalProperty: machine.specifications.map((s) => ({
      '@type': 'PropertyValue',
      name: pick(locale, s.labelAr, s.labelEn),
      value: pick(locale, s.valueAr, s.valueEn),
    })),
    offers: {
      '@type': 'Offer',
      // B2B supply is quote-based: advertise availability + seller, no fixed price.
      availability:
        machine.status === 'active'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      seller: { '@id': ORG_ID },
      url: absoluteUrl(`/${locale}/machines/${machine.slug}`),
      priceCurrency: 'EGP',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EGP',
      },
    },
  };
}
