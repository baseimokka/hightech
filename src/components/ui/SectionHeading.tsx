import { type ElementType } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'start' | 'center';
  invert?: boolean;
  as?: ElementType;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'start',
  invert = false,
  as: Title = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3.5 max-w-[720px]',
        align === 'center' ? 'text-center items-center mx-auto' : 'text-start items-start',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Title
        className={cn(
          'm-0 font-display text-display-3 font-bold leading-[1.2] max-sm:leading-[1.3] tracking-tight text-balance',
          invert ? 'text-white' : 'text-ink-strong',
        )}
      >
        {title}
      </Title>
      {description && (
        <p
          className={cn(
            'm-0 max-w-[620px] text-[var(--fs-lg)] leading-[1.6] text-pretty',
            invert ? 'text-steel-300' : 'text-ink-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
