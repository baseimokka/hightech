import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Icon, type IconName } from '@/components/ui/Icon';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ENABLE_PORTFOLIO, routes, site } from '@/config/site';
import { company, contact, services, pick } from '@/data';

function FootCol({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="m-0 font-mono text-[12px] tracking-[0.16em] uppercase text-steel-400">
        {title}
      </h4>
      {items.map((it, i) => (
        <Link key={i} href={it.href} className="text-[14px] text-steel-200 no-underline hover:text-white">
          {it.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const socials: Array<{ name: IconName; href: string }> = [
    { name: 'facebook', href: company.social.facebook },
    { name: 'instagram', href: company.social.instagram },
  ];

  return (
    <footer className="bg-steel-950 border-t border-hairline-dark">
      <div className="container-page pt-[var(--space-12)] pb-[var(--space-7)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div className="flex flex-col gap-4 max-w-[320px] sm:col-span-2 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt={site.name} className="h-9 w-auto self-start" />
            <p className="m-0 text-[14.5px] leading-[1.6] text-steel-400">
              {pick(locale, company.taglineAr, company.taglineEn)}
            </p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-sm border border-hairline-dark text-steel-300 hover:text-white hover:border-steel-500 transition-colors"
                >
                  <Icon name={s.name} size={17} />
                </a>
              ))}
            </div>
          </div>

          <FootCol
            title={t('footer.quick')}
            items={[
              { label: t('nav.about'), href: routes.about },
              { label: t('nav.machines'), href: routes.machines },
              // Portfolio is temporarily disabled (see ENABLE_PORTFOLIO in
              // src/config/site.ts). Re-enable there to restore this link.
              ...(ENABLE_PORTFOLIO
                ? [{ label: t('nav.portfolio'), href: routes.portfolio }]
                : []),
              { label: t('nav.contact'), href: routes.contact },
            ]}
          />
          <FootCol
            title={t('footer.svc')}
            items={services.slice(0, 5).map((s) => ({
              label: pick(locale, s.titleAr, s.titleEn),
              href: routes.services,
            }))}
          />

          <div className="flex flex-col gap-3">
            <h4 className="m-0 font-mono text-[12px] tracking-[0.16em] uppercase text-steel-400">
              {t('footer.reach')}
            </h4>
            <a href={`tel:+${contact.whatsapp}`} className="text-[14px] text-steel-200 no-underline hover:text-white">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="text-[14px] text-steel-200 no-underline hover:text-white">
              {contact.email}
            </a>
            <span className="mt-1">
              <WhatsAppButton size="sm">{t('cta.whatsapp')}</WhatsAppButton>
            </span>
          </div>
        </div>

        <div className="mt-[var(--space-8)] pt-[var(--space-5)] border-t border-hairline-dark flex flex-wrap justify-between gap-3">
          <span className="text-[13px] text-steel-500">{t('footer.rights')}</span>
          <span className="font-mono text-[11px] tracking-[0.12em] text-steel-600">
            {t('footer.certified')}
          </span>
        </div>
      </div>
    </footer>
  );
}
