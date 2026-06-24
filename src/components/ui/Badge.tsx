import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'brand' | 'steel' | 'outline' | 'tint' | 'amber' | 'success';

const VARIANTS: Record<Variant, string> = {
  brand: 'bg-brand text-white border border-brand',
  steel: 'bg-steel-950 text-white border border-steel-950',
  outline: 'bg-transparent text-ink-body border border-hairline-strong',
  tint: 'bg-brand-tint text-brand-pressed border border-red-100',
  amber: 'bg-amber-500 text-steel-950 border border-amber-500',
  success: 'bg-[rgba(30,184,88,0.12)] text-[#0f7a39] border border-[rgba(30,184,88,0.30)]',
};

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant = 'tint', dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2.5 font-mono text-[11px] font-medium',
        'tracking-wide2 uppercase leading-none rounded-xs whitespace-nowrap',
        VARIANTS[variant],
        className,
      )}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
