import { useTranslations } from 'next-intl';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { Icon } from '@/components/ui/Icon';

/**
 * Floating WhatsApp action button — shown on mobile / tablet where the navbar
 * CTA is collapsed behind the menu.
 */
export function WhatsAppFab() {
  const t = useTranslations('a11y');
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="lg:hidden fixed bottom-[18px] z-[60] inline-flex items-center justify-center w-[58px] h-[58px] rounded-full bg-whatsapp text-white shadow-[0_10px_28px_rgba(37,211,102,0.45)] hover:brightness-95 transition"
      style={{ insetInlineEnd: 18 }}
    >
      <Icon name="message-circle" size={26} />
    </a>
  );
}
