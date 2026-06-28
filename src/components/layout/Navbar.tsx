'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { LangSwitch } from './LangSwitch';
import { ENABLE_PORTFOLIO, routes, site } from '@/config/site';
import { cn } from '@/lib/cn';

const NAV_ITEMS: Array<{
  key: 'home' | 'about' | 'services' | 'machines' | 'portfolio' | 'contact';
  href: string;
}> = [
  { key: 'home', href: routes.home },
  { key: 'about', href: routes.about },
  { key: 'services', href: routes.services },
  { key: 'machines', href: routes.machines },
  { key: 'portfolio', href: routes.portfolio },
  { key: 'contact', href: routes.contact },
];

// Portfolio is temporarily disabled — its link is filtered out while
// ENABLE_PORTFOLIO is false (see src/config/site.ts). Re-enable it there.
const NAV = NAV_ITEMS.filter((item) => ENABLE_PORTFOLIO || item.key !== 'portfolio');

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 backdrop-blur-[14px] transition-colors duration-200 ease-out',
        scrolled
          ? 'bg-[rgba(10,12,15,0.92)] border-b border-hairline-dark'
          : 'bg-[rgba(10,12,15,0.55)] border-b border-white/[0.07]',
      )}
    >
      <div className="container-page flex h-[72px] items-center gap-6">
        <Link href={routes.home} className="inline-flex items-center" aria-label={t('nav.home')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* Dark-background lockup (red monogram + white wordmark) so the logo stays
              crisp over the dark, translucent header — see public/logo-nav.svg. */}
          <img src="/logo-nav.svg" alt={site.name} className="h-[38px] w-auto" />
        </Link>

        <nav className="hidden lg:flex gap-1 ms-auto" aria-label={t('a11y.menu')}>
          {NAV.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'px-3.5 py-2 font-display text-[14.5px] font-medium rounded-sm transition-colors duration-200',
                isActive(href)
                  ? 'text-white bg-white/[0.07]'
                  : 'text-steel-300 hover:text-white',
              )}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 ms-auto lg:ms-0">
          <LangSwitch />
          <span className="hidden lg:inline-flex">
            <Button href={routes.quote} variant="primary" size="sm">
              {t('cta.quote')}
            </Button>
          </span>
          <button
            type="button"
            aria-label={t('a11y.menu')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 bg-transparent border border-white/25 rounded-sm text-white cursor-pointer"
          >
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          'lg:hidden flex flex-col overflow-hidden bg-[rgba(10,12,15,0.98)] transition-[max-height] duration-300 ease-out',
          open ? 'max-h-[480px] border-t border-hairline-dark' : 'max-h-0',
        )}
      >
        <nav className="px-[var(--gutter)] pt-3 pb-5 flex flex-col gap-1" aria-label={t('a11y.menu')}>
          {NAV.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              aria-current={isActive(href) ? 'page' : undefined}
              className={cn(
                'px-3 py-3.5 font-display text-[17px] font-semibold no-underline border-b border-hairline-dark',
                isActive(href) ? 'text-red-300' : 'text-white',
              )}
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
          <div className="mt-3">
            <Button href={routes.quote} variant="primary" size="lg" block>
              {t('cta.quote')}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
