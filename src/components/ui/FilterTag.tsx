'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface FilterTagProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  count?: number;
}

/** Toggleable filter chip for the portfolio gallery. */
export function FilterTag({ children, active = false, onClick, count }: FilterTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-2 h-[38px] px-4 font-mono text-[12.5px] font-medium',
        'tracking-wide2 uppercase leading-none rounded-pill cursor-pointer',
        'transition-colors duration-200 ease-out',
        active
          ? 'bg-steel-950 text-white border border-steel-950'
          : 'bg-transparent text-ink-body border border-hairline-strong hover:border-brand',
      )}
    >
      {children}
      {count != null && (
        <span className={active ? 'text-red-200' : 'text-ink-faint'}>{count}</span>
      )}
    </button>
  );
}
