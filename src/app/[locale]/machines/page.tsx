import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { MachinesGallery } from '@/components/machines/MachinesGallery';
import { machines } from '@/data';
import { resolveMediaMap } from '@/lib/media';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.machines' });
  return { title: t('title'), description: t('description') };
}

export default function MachinesPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('machines');
  const media = resolveMediaMap(machines.map((m) => ({ id: m.id, path: m.image })));

  return (
    <div>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} description={t('sub')} />
      <Section>
        <MachinesGallery media={media} />
      </Section>
      <FinalCta />
    </div>
  );
}
