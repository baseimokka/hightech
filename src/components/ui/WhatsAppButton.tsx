import { type ReactNode } from 'react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { contact } from '@/data/contact';
import { cn } from '@/lib/cn';

type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, { box: string; glyph: number }> = {
  sm: { box: 'h-[38px] px-[14px] text-[13px]', glyph: 16 },
  md: { box: 'h-[46px] px-5 text-[15px]', glyph: 19 },
  lg: { box: 'h-14 px-[26px] text-[16.5px]', glyph: 22 },
};

function WaGlyph({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.13c-.25.7-1.44 1.33-1.98 1.38-.53.06-1.02.27-3.42-.71-2.88-1.16-4.7-4.1-4.84-4.29-.14-.19-1.15-1.53-1.15-2.92s.73-2.07.99-2.35c.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.84 2.07.91 2.22.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.37-.42.49-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.37-.23.62-.14.25.09 1.6.75 1.87.89.28.14.46.21.53.32.07.12.07.66-.18 1.35Z" />
    </svg>
  );
}

interface WhatsAppButtonProps {
  children?: ReactNode;
  size?: Size;
  block?: boolean;
  phone?: string;
  message?: string;
  className?: string;
  'aria-label'?: string;
}

export function WhatsAppButton({
  children = 'WhatsApp Us',
  size = 'md',
  block = false,
  phone = contact.whatsapp,
  message,
  className,
  ...rest
}: WhatsAppButtonProps) {
  const s = SIZES[size];
  return (
    <a
      href={buildWhatsAppUrl(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center gap-[9px] font-display font-semibold tracking-[-0.015em] leading-none',
        'text-white bg-whatsapp border border-whatsapp rounded-sm whitespace-nowrap cursor-pointer no-underline',
        'shadow-[0_8px_22px_rgba(37,211,102,0.30)] transition-[filter,transform] duration-200 ease-out',
        'hover:brightness-[0.94] active:translate-y-px',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2',
        s.box,
        block && 'w-full flex',
        className,
      )}
      {...rest}
    >
      <WaGlyph size={s.glyph} />
      {children}
    </a>
  );
}
