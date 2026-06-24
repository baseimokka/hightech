import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Icon, type IconName } from '@/components/ui/Icon';
import { routes } from '@/config/site';
import { machines, getMachine, getMachineCategory, pick, pickList } from '@/data';
import { resolveMedia } from '@/lib/media';

export function generateStaticParams() {
  return machines.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const machine = getMachine(slug);
  if (!machine) return {};
  return {
    title: `${pick(locale, machine.nameAr, machine.nameEn)} — High Tech`,
    description: pick(locale, machine.descriptionAr, machine.descriptionEn),
  };
}

export default function MachineDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('machines');
  const tc = useTranslations('cta');
  const lc = useLocale();

  const machine = getMachine(slug);
  if (!machine) notFound();

  const category = getMachineCategory(machine.category);
  const icon = (category?.icon ?? 'cog') as IconName;
  const categoryLabel = category ? pick(lc, category.titleAr, category.titleEn) : '';
  const name = pick(lc, machine.nameAr, machine.nameEn);
  const description = pick(lc, machine.descriptionAr, machine.descriptionEn);
  const features = pickList(lc, machine.featuresAr, machine.featuresEn);
  const active = machine.status === 'active';

  return (
    <div>
      {/* Dark header band */}
      <div className="bg-bg-dark" style={{ paddingBlock: 'var(--section-y-tight)', paddingInline: 'var(--gutter)' }}>
        <div className="mx-auto w-full max-w-container flex flex-col gap-5">
          <Link
            href={routes.machines}
            className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wide2 uppercase text-steel-300 no-underline hover:text-white w-fit"
          >
            <Icon name="arrow-right" size={14} className="rotate-180 rtl:rotate-0" />
            {t('back')}
          </Link>
          <div className="flex flex-col gap-3.5 max-w-[760px]">
            <span className="eyebrow">{categoryLabel}</span>
            <h1 className="m-0 font-display text-display-3 font-bold leading-[1.2] tracking-tight text-white text-balance">
              {name}
            </h1>
            <p className="m-0 max-w-[640px] text-[var(--fs-lg)] leading-[1.6] text-steel-300 text-pretty">
              {description}
            </p>
            <div>
              <Badge variant={active ? 'success' : 'steel'} dot={active}>
                {active ? t('available') : t('unavailable')}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Media */}
          <div className="flex flex-col gap-3">
            <MediaFrame
              label={name}
              caption={categoryLabel}
              icon={icon}
              ratio="4 / 3"
              src={resolveMedia(machine.image)}
              alt={name}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {machine.gallery.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {machine.gallery.map((g, i) => (
                  <MediaFrame
                    key={i}
                    icon={icon}
                    ratio="1 / 1"
                    src={resolveMedia(g)}
                    alt={name}
                    sizes="(max-width: 1024px) 33vw, 16vw"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Specs + features + CTA */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="m-0 mb-4 font-mono text-[12px] tracking-[0.16em] uppercase text-ink-faint">
                {t('specifications')}
              </h2>
              <div className="flex flex-col">
                {machine.specifications.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 py-3 border-b border-hairline"
                  >
                    <span className="font-mono text-[12px] uppercase tracking-wide2 text-ink-faint">
                      {pick(lc, s.labelAr, s.labelEn)}
                    </span>
                    <span className="text-[14px] font-medium text-ink-strong text-end">
                      {pick(lc, s.valueAr, s.valueEn)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {features.length > 0 && (
              <div>
                <h2 className="m-0 mb-4 font-mono text-[12px] tracking-[0.16em] uppercase text-ink-faint">
                  {t('features')}
                </h2>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[14.5px] text-ink-body">
                      <Icon name="check" size={16} className="text-ok shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-steel-950 rounded-md p-6 flex flex-col gap-3">
              <h3 className="m-0 font-display text-[19px] font-bold text-white">{t('ctaTitle')}</h3>
              <p className="m-0 text-[14px] leading-[1.6] text-steel-300">{t('ctaSub')}</p>
              <div className="flex flex-wrap gap-3 mt-1">
                <WhatsAppButton message={t('quoteMessage', { name })}>
                  {tc('whatsapp')}
                </WhatsAppButton>
                <Button href={routes.quote} variant="primary">
                  {tc('quote')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FinalCta />
    </div>
  );
}
