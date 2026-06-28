import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { routes } from '@/config/site';

/** Red conversion band repeated at the foot of most pages. */
export function FinalCta() {
  const t = useTranslations();
  return (
    <div className="relative overflow-hidden bg-brand">
      <div className="absolute inset-0 hatch-overlay" aria-hidden="true" />
      <div className="container-page relative flex flex-wrap items-center justify-between gap-10 py-[var(--section-y)]">
        <div className="flex max-w-[640px] flex-col gap-3">
          <h2 className="m-0 font-display text-display-3 font-bold leading-[1.15] max-sm:leading-[1.3] tracking-tight text-white text-balance">
            {t('finalCta.title')}
          </h2>
          <p className="m-0 text-[var(--fs-lg)] text-white/90">{t('finalCta.sub')}</p>
        </div>
        <div className="flex flex-wrap gap-3.5">
          <Button href={routes.quote} variant="secondary" size="lg">
            {t('cta.quote')}
          </Button>
          <WhatsAppButton size="lg" message={t('finalCta.title')}>
            {t('cta.whatsapp')}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
