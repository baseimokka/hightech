import { cn } from '@/lib/cn';

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  invert?: boolean;
  align?: 'start' | 'center';
}

export function StatCard({ value, label, suffix, invert = false, align = 'start' }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1.5',
        align === 'center' ? 'text-center items-center' : 'text-start items-start',
      )}
    >
      <span
        className={cn(
          'flex items-baseline gap-0.5 font-display text-display-2 font-bold tracking-tighter2 leading-none',
          invert ? 'text-white' : 'text-ink-strong',
        )}
      >
        {value}
        {suffix && <span className="text-brand">{suffix}</span>}
      </span>
      <span
        className={cn(
          'font-mono text-[12.5px] tracking-wide2 uppercase',
          invert ? 'text-steel-300' : 'text-ink-muted',
        )}
      >
        {label}
      </span>
    </div>
  );
}
