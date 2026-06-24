import { defineRouting } from 'next-intl/routing';

/**
 * Locale routing. Arabic is the default (industrial brand is Arabic-first);
 * English is a toggle. The prefix is always present so /ar and /en are explicit.
 */
export const routing = defineRouting({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
