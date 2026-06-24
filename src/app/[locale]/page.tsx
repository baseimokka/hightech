import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Button } from '@/components/ui/Button';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { routes } from '@/config/site';
import {
  company,
  clients,
  projects,
  projectCategories,
  projectLabelAr,
  projectLabelEn,
  services,
  pick,
} from '@/data';
import { resolveMedia } from '@/lib/media';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  return { title: t('title'), description: t('description') };
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const lc = useLocale();

  const why = t.raw('why.items') as Array<{ icon: IconName; t: string; d: string }>;

  // Portfolio teaser: first four projects in a bento layout.
  const teaser = projects.slice(0, 4);
  const projLabel = pick(lc, projectLabelAr, projectLabelEn);
  const catShort = (key: string) => {
    const c = projectCategories.find((pc) => pc.key === key);
    return c ? pick(lc, c.shortAr, c.shortEn) : '';
  };

  return (
    <div>
      <Hero />

      {/* Services overview */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={t('services.eyebrow')}
            title={t('services.title')}
            description={t('services.sub')}
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-[var(--space-8)]">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              icon={<Icon name={s.icon as IconName} size={24} />}
              title={pick(lc, s.titleAr, s.titleEn)}
              description={pick(lc, s.descriptionAr, s.descriptionEn)}
              href={routes.services}
              linkLabel={t('cta.learn')}
            />
          ))}
        </div>
      </Section>

      {/* Industries */}
      <Section tight className="bg-bg-subtle border-y border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <Reveal>
            <SectionHeading eyebrow={t('industries.eyebrow')} title={t('industries.title')} />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {company.industries.map((ind) => (
              <div
                key={ind.icon}
                className="flex items-center gap-3 px-[18px] py-4 bg-surface-card border border-hairline rounded-sm"
              >
                <Icon name={ind.icon as IconName} size={20} className="text-brand" />
                <span className="text-[14.5px] font-medium text-ink-strong">
                  {pick(lc, ind.titleAr, ind.titleEn)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why choose us — dark band */}
      <Section dark>
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <div className="flex flex-col gap-7">
            <Reveal>
              <SectionHeading invert eyebrow={t('why.eyebrow')} title={t('why.title')} />
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[22px]">
              {why.map((w) => (
                <div key={w.t} className="flex flex-col gap-2.5">
                  <span className="inline-flex items-center justify-center w-[46px] h-[46px] rounded-sm bg-[rgba(225,6,0,0.14)] text-red-300">
                    <Icon name={w.icon} size={22} />
                  </span>
                  <h3 className="m-0 font-display text-[17px] font-semibold text-white">{w.t}</h3>
                  <p className="m-0 text-[13.5px] leading-[1.6] text-steel-300">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <MediaFrame
              label={t('why.mediaLabel')}
              caption={t('why.mediaCaption')}
              icon="factory"
              ratio="4 / 3.4"
            />
          </Reveal>
        </div>
      </Section>

      {/* Portfolio preview */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal>
            <SectionHeading
              eyebrow={t('portfolio.eyebrow')}
              title={t('portfolio.title')}
              description={t('portfolio.sub')}
            />
          </Reveal>
          <Button
            href={routes.portfolio}
            variant="outline"
            iconRight={<Icon name="arrow-right" size={16} className="rtl:rotate-180" />}
          >
            {t('cta.portfolio')}
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] gap-3.5 mt-[var(--space-8)]">
          {teaser.map((p, i) => (
            <MediaFrame
              key={p.id}
              className={i === 0 ? 'lg:col-span-2 lg:row-span-2' : i === 3 ? 'col-span-2' : undefined}
              video={i === 3}
              label={pick(lc, p.titleAr, p.titleEn)}
              caption={`${projLabel} · ${catShort(p.category)}`}
              icon={p.icon as IconName}
              ratio="auto"
              src={resolveMedia(p.image)}
              alt={pick(lc, p.titleAr, p.titleEn)}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          ))}
        </div>
      </Section>

      {/* Clients */}
      <Section tight className="bg-bg-subtle border-t border-hairline">
        <SectionHeading
          align="center"
          eyebrow={t('clients.eyebrow')}
          title={t('clients.title')}
        />
        <div className="flex flex-wrap justify-center gap-[clamp(28px,5vw,64px)] mt-[var(--space-7)] opacity-70">
          {clients.map((c) => (
            <span
              key={c.id}
              className="font-display font-bold text-[22px] tracking-[0.04em] text-steel-500"
            >
              {c.name}
            </span>
          ))}
        </div>
      </Section>

      <FinalCta />
    </div>
  );
}
