/**
 * App-level configuration that is *not* editable marketing content.
 * Business details (phone, WhatsApp, email, address, socials) live in the
 * content layer — see `src/data/contact.ts` and `src/data/company.ts`.
 */
export const site = {
  name: 'High Tech',
  domain: 'https://hightech.sa',
} as const;

/**
 * ─── Feature flags ──────────────────────────────────────────────────────────
 *
 * PORTFOLIO — TEMPORARILY DISABLED.
 *
 * While this is `false`, the entire Portfolio feature is hidden site-wide:
 *   • Navbar link (desktop + mobile menu)   — src/components/layout/Navbar.tsx
 *   • Footer "quick links" entry            — src/components/layout/Footer.tsx
 *   • Homepage "Our work" preview section   — src/app/[locale]/page.tsx
 *   • The /portfolio route (returns 404)    — src/app/[locale]/portfolio/page.tsx
 *
 * No Portfolio code, data, images, components or translations were removed —
 * everything stays intact for future reactivation.
 *
 * TO RE-ENABLE: set this back to `true`. That single change restores the whole
 * feature; no other edits are required.
 */
export const ENABLE_PORTFOLIO = false;

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
