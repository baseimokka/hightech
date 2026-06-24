import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  accent?: boolean;
  interactive?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Generic machined surface: crisp hairline border, small radius, grounded
 * shadow. With `interactive` it lifts on hover; with `accent` it gains a red
 * leading edge.
 */
export function Card({ children, accent = false, interactive = false, className, style }: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface-card border border-hairline rounded-md shadow-sm p-7',
        'transition-[box-shadow,transform] duration-200 ease-out',
        interactive && 'hover:shadow-lg hover:-translate-y-[3px]',
        className,
      )}
      style={style}
    >
      {accent && (
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-[3px] bg-brand"
          style={{ insetInlineStart: 0 }}
        />
      )}
      {children}
    </div>
  );
}
