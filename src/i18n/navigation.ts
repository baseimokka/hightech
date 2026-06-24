import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation helpers. Use these `Link`, `useRouter`, etc. instead
 * of the next/* equivalents so the active locale prefix is preserved.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
