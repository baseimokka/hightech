import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { MachinesGallery } from '@/components/machines/MachinesGallery';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, localePath } from '@/lib/seo';
import { breadcrumbSchema, machineListSchema, webPageSchema } from '@/lib/jsonld';
import { routes } from '@/config/site';
import { machines } from '@/data';
import { resolveMediaMap } from '@/lib/media';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.machines' });
  return buildMetadata({
    locale,
    path: routes.machines,
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default function MachinesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('machines');
  const tn = useTranslations('nav');
  const tm = useTranslations('meta.machines');
  const lc = useLocale();
  const media = resolveMediaMap(machines.map((m) => ({ id: m.id, path: m.image })));

  const structuredData = [
    webPageSchema({
      type: 'CollectionPage',
      locale: lc,
      path: routes.machines,
      name: tm('title'),
      description: tm('description'),
    }),
    machineListSchema(lc, machines, localePath(routes.machines, lc)),
    breadcrumbSchema([
      { name: tn('home'), path: localePath(routes.home, lc) },
      { name: tn('machines'), path: localePath(routes.machines, lc) },
    ]),
  ];

  return (
    <div>
      <JsonLd data={structuredData} />
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} description={t('sub')} />
      <Section>
        <MachinesGallery media={media} />
      </Section>
      <FinalCta />
    </div>
  );
}
