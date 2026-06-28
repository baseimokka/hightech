import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata, localePath } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/jsonld';
import { routes } from '@/config/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.quote' });
  return buildMetadata({
    locale,
    path: routes.quote,
    title: t('title'),
    description: t('description'),
    keywords: t.raw('keywords') as string[],
  });
}

export default function QuotePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('quote');
  const tn = useTranslations('nav');
  const lc = useLocale();

  const breadcrumbs = breadcrumbSchema([
    { name: tn('home'), path: localePath(routes.home, lc) },
    { name: tn('quote'), path: localePath(routes.quote, lc) },
  ]);

  return (
    <div className="bg-bg-subtle">
      <JsonLd data={breadcrumbs} />
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} description={t('sub')} />
      <div
        className="mx-auto w-full max-w-container"
        style={{ paddingBlock: 'var(--section-y)', paddingInline: 'var(--gutter)' }}
      >
        <QuoteForm />
      </div>
    </div>
  );
}
