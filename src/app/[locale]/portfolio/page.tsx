import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery';
import { projects } from '@/data';
import { resolveMediaMap } from '@/lib/media';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.portfolio' });
  return { title: t('title'), description: t('description') };
}

export default function PortfolioPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('portfolio');
  const media = resolveMediaMap(projects.map((p) => ({ id: p.id, path: p.image })));

  return (
    <div>
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} description={t('sub')} />
      <Section>
        <PortfolioGallery media={media} />
      </Section>
      <FinalCta />
    </div>
  );
}
