/**
 * App-level configuration that is *not* editable marketing content.
 * Business details (phone, WhatsApp, email, address, socials) live in the
 * content layer — see `src/data/contact.ts` and `src/data/company.ts`.
 */
export const site = {
  name: 'High Tech',
  domain: 'https://hightech.sa',
} as const;

/** Route slugs per page, shared by the navbar, footer and CTAs. */
export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  machines: '/machines',
  portfolio: '/portfolio',
  quote: '/quote',
  contact: '/contact',
} as const;

export type RouteKey = keyof typeof routes;
