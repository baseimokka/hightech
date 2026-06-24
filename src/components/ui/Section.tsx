import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionProps {
  children: ReactNode;
  dark?: boolean;
  tight?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

export function Section({ children, dark = false, tight = false, id, className, style }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(dark ? 'bg-bg-dark' : 'bg-transparent', className)}
      style={{
        paddingTop: tight ? 'var(--section-y-tight)' : 'var(--section-y)',
        paddingBottom: tight ? 'var(--section-y-tight)' : 'var(--section-y)',
        paddingInline: 'var(--gutter)',
        ...style,
      }}
    >
      <div className="mx-auto w-full max-w-container">{children}</div>
    </section>
  );
}
