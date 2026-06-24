import { cn } from '@/lib/cn';

/** Shared field surface used by Input, Textarea and Select. */
export function fieldClass(error?: boolean, extra?: string) {
  return cn(
    'w-full font-body text-[15px] text-ink-strong bg-bg-base rounded-sm outline-none box-border',
    'border transition-[border-color,box-shadow] duration-200 ease-out',
    'focus:shadow-[var(--focus-ring)]',
    error ? 'border-brand focus:border-brand' : 'border-hairline-strong focus:border-red-400',
    extra,
  );
}
