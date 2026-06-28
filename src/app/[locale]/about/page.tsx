import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatCard } from '@/components/ui/StatCard';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, localePath } from '@/lib/seo';
import { breadcrumbSchema, webPageSchema } from '@/lib/jsonld';
import { routes } from '@/config/site';
import { company, statistics, certifications, pick } from '@/data';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return buildMetadata({
    locale,
    path: routes.about,
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const lc = useLocale();

  const structuredData = [
    webPageSchema({
      type: 'AboutPage',
      locale: lc,
      path: routes.about,
      name: t('meta.about.title'),
      description: t('meta.about.description'),
    }),
    breadcrumbSchema([
      { name: t('nav.home'), path: localePath(routes.home, lc) },
      { name: t('nav.about'), path: localePath(routes.about, lc) },
    ]),
  ];

  const pillars: Array<{ icon: IconName; title: string; desc: string }> = [
    {
      icon: 'target',
      title: pick(lc, company.mission.titleAr, company.mission.titleEn),
      desc: pick(lc, company.mission.descriptionAr, company.mission.descriptionEn),
    },
    {
      icon: 'eye',
      title: pick(lc, company.vision.titleAr, company.vision.titleEn),
      desc: pick(lc, company.vision.descriptionAr, company.vision.descriptionEn),
    },
  ];

  return (
    <div>
      <JsonLd data={structuredData} />
      <PageHeader eyebrow={t('about.eyebrow')} title={t('about.title')} />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <p className="m-0 text-[var(--fs-lg)] leading-[1.75] text-ink-body">
              {pick(lc, company.descriptionAr, company.descriptionEn)}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 auto-rows-[130px] gap-3">
              <MediaFrame
                className="col-span-2"
                label={t('about.media.facility')}
                caption={t('about.media.factory')}
                icon="factory"
                ratio="auto"
              />
              <MediaFrame caption={t('about.media.cncBay')} icon="cog" ratio="auto" />
              <MediaFrame caption={t('about.media.laserCell')} icon="flame" ratio="auto" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tight dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pillars.map((m) => (
            <div
              key={m.title}
              className="flex flex-col gap-3 p-8 bg-surface-dark border border-hairline-dark border-t-[3px] border-t-brand rounded-md"
            >
              <Icon name={m.icon} size={26} className="text-red-300" />
              <h3 className="m-0 font-display text-[22px] font-bold text-white">{m.title}</h3>
              <p className="m-0 text-[15px] leading-[1.7] text-steel-300">{m.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tight>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics.cards.map((c, i) => (
            <StatCard
              key={i}
              value={c.value}
              suffix={pick(lc, c.suffixAr, c.suffixEn)}
              label={pick(lc, c.labelAr, c.labelEn)}
            />
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section tight className="bg-bg-subtle border-y border-hairline">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow={t('about.certs.eyebrow')}
            title={t('about.certs.title')}
            description={t('about.certs.sub')}
          />
        </Reveal>
        <div className="flex flex-wrap justify-center gap-5 mt-[var(--space-8)]">
          {certifications.map((c) => (
            <div
              key={c.id}
              className="flex items-center gap-4 w-full sm:w-[360px] p-5 bg-surface-card border border-hairline rounded-md"
            >
              <div className="flex items-center justify-center w-[76px] h-[76px] shrink-0 rounded-md bg-white border border-hairline p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={`${pick(lc, c.titleAr, c.titleEn)} certification`}
                  width={c.width}
                  height={c.height}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full w-auto object-contain"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="m-0 font-display text-[17px] font-bold text-ink-strong">
                  {pick(lc, c.titleAr, c.titleEn)}
                </h3>
                <p className="m-0 text-[13.5px] leading-[1.5] text-ink-muted">
                  {pick(lc, c.descriptionAr, c.descriptionEn)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <FinalCta />
    </div>
  );
}
