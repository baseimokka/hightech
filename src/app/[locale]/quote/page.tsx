import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { QuoteForm } from '@/components/quote/QuoteForm';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.quote' });
  return { title: t('title'), description: t('description') };
}

export default function QuotePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations('quote');

  return (
    <div className="bg-bg-subtle">
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
