import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { StatCard } from '@/components/ui/StatCard';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { company, statistics, pick } from '@/data';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.about' });
  return { title: t('title'), description: t('description') };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const lc = useLocale();

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

      <FinalCta />
    </div>
  );
}
