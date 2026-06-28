import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Section } from '@/components/ui/Section';
import { PortfolioGallery } from '@/components/portfolio/PortfolioGallery';
import { ENABLE_PORTFOLIO, routes } from '@/config/site';
import { projects } from '@/data';
import { resolveMediaMap } from '@/lib/media';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.portfolio' });
  // Portfolio is temporarily disabled (returns 404) — keep it out of the index.
  return buildMetadata({
    locale,
    path: routes.portfolio,
    title: t('title'),
    description: t('description'),
    index: ENABLE_PORTFOLIO,
  });
}

export default function PortfolioPage({ params: { locale } }: { params: { locale: string } }) {
  // Portfolio is TEMPORARILY DISABLED. While ENABLE_PORTFOLIO is false
  // (see src/config/site.ts), visiting /portfolio returns a 404 via the locale
  // not-found page. The full page below is kept intact for reactivation —
  // flip ENABLE_PORTFOLIO back to true to restore it.
  if (!ENABLE_PORTFOLIO) {
    notFound();
  }

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
