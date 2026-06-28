import type { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { routes } from '@/config/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const locale = useLocale();
  const ar = locale === 'ar';

  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-5"
      style={{ minHeight: '60vh', paddingInline: 'var(--gutter)' }}
    >
      <span className="font-mono text-brand tracking-[0.2em] text-sm">ERROR 404</span>
      <h1 className="m-0 font-display text-display-2 font-bold leading-[1.1] max-sm:leading-[1.18] tracking-tighter2 text-ink-strong">
        {ar ? 'الصفحة غير موجودة' : 'Page not found'}
      </h1>
      <p className="m-0 max-w-[460px] text-[var(--fs-lg)] text-ink-muted">
        {ar
          ? 'عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.'
          : 'Sorry, the page you are looking for is unavailable or has moved.'}
      </p>
      <Button href={routes.home} variant="primary" size="lg">
        {ar ? 'العودة للرئيسية' : 'Back to home'}
      </Button>
    </div>
  );
}
