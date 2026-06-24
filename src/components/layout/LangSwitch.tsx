'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

interface LangSwitchProps {
  className?: string;
}

/** Toggles between Arabic and English while preserving the current route. */
export function LangSwitch({ className }: LangSwitchProps) {
  const locale = useLocale();
  const t = useTranslations('a11y');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const next = locale === 'ar' ? 'en' : 'ar';

  const toggle = () => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      aria-label={t('switchLang')}
      className={cn(
        'inline-flex items-center gap-1.5 h-9 px-3 bg-transparent border border-white/25 rounded-sm',
        'text-white font-mono text-[12px] tracking-[0.08em] cursor-pointer',
        'transition-colors duration-200 hover:border-white/50',
        className,
      )}
    >
      <Icon name="languages" size={15} />
      {locale === 'ar' ? 'EN' : 'ع'}
    </button>
  );
}
