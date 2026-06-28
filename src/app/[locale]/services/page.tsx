import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, localePath } from '@/lib/seo';
import { breadcrumbSchema, servicesSchema } from '@/lib/jsonld';
import { routes } from '@/config/site';
import { services, detailedServices, pick, pickList } from '@/data';
import { resolveMedia } from '@/lib/media';
import { cn } from '@/lib/cn';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.services' });
  return buildMetadata({
    locale,
    path: routes.services,
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const lc = useLocale();

  const structuredData = [
    servicesSchema(lc, services),
    breadcrumbSchema([
      { name: t('nav.home'), path: localePath(routes.home, lc) },
      { name: t('nav.services'), path: localePath(routes.services, lc) },
    ]),
  ];

  return (
    <div>
      <JsonLd data={structuredData} />
      <PageHeader
        eyebrow={t('services.eyebrow')}
        title={t('services.title')}
        description={t('services.sub')}
      />
      <Section>
        <div className="flex flex-col gap-[var(--space-10)]">
          {detailedServices.map((s, i) => {
            const reverse = i % 2 === 1;
            const specs = pickList(lc, s.specificationsAr, s.specificationsEn);
            // The Industrial Machinery service links to the machines page; the rest go to the quote form.
            const isMachines = s.id === 'machines';
            return (
              <Reveal key={s.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-11 items-center">
                  <div className={reverse ? 'lg:order-2' : ''}>
                    <MediaFrame
                      label={pick(lc, s.titleAr, s.titleEn)}
                      caption={pick(lc, s.tagAr, s.tagEn)}
                      icon={s.icon as IconName}
                      ratio="4 / 3"
                      src={resolveMedia(s.image)}
                      alt={pick(lc, s.titleAr, s.titleEn)}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div className={cn('flex flex-col gap-4', reverse && 'lg:order-1')}>
                    <span className="font-mono text-[13px] tracking-[0.18em] text-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="m-0 font-display text-display-3 font-bold max-sm:rtl:leading-[1.3] tracking-tight text-ink-strong">
                      {pick(lc, s.titleAr, s.titleEn)}
                    </h2>
                    <p className="m-0 text-[var(--fs-lg)] leading-[1.6] text-ink-muted">
                      {pick(lc, s.descriptionAr, s.descriptionEn)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {specs.map((sp) => (
                        <Badge key={sp} variant="outline">
                          {sp}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-1.5">
                      <Button
                        href={isMachines ? routes.machines : routes.quote}
                        variant="primary"
                        iconRight={<Icon name="arrow-right" size={16} className="rtl:rotate-180" />}
                      >
                        {isMachines ? t('cta.machines') : t('cta.quote')}
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>
      <FinalCta />
    </div>
  );
}
