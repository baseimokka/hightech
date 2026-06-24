import { type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}

/**
 * Service grid item: icon tile, title, description, hover-revealed link.
 * The top accent edge and icon tile shift to brand red on hover.
 */
export function ServiceCard({
  icon,
  title,
  description,
  href = '/services',
  linkLabel = 'Learn more',
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex h-full flex-col gap-4 p-7 no-underline',
        'bg-surface-card border border-hairline border-t-[3px] border-t-steel-200 rounded-md shadow-sm',
        'transition-[box-shadow,transform,border-color] duration-200 ease-out',
        'hover:shadow-lg hover:-translate-y-[3px] hover:border-t-brand',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex shrink-0 items-center justify-center w-[52px] h-[52px] rounded-sm',
          'bg-surface-inset text-brand transition-colors duration-200 ease-out',
          'group-hover:bg-brand group-hover:text-white',
        )}
      >
        {icon}
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="m-0 font-display text-[1.25rem] font-semibold tracking-tight text-ink-strong">
          {title}
        </h3>
        <p className="m-0 text-[0.875rem] leading-[1.6] text-ink-muted">{description}</p>
      </div>
      <span
        className={cn(
          'inline-flex items-center gap-[7px] font-mono text-[12px] font-medium tracking-wide2 uppercase',
          'text-ink-faint transition-colors duration-200 ease-out group-hover:text-brand',
        )}
      >
        {linkLabel}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          aria-hidden="true"
          className="transition-transform duration-200 ease-out group-hover:translate-x-[3px] rtl:rotate-180 rtl:group-hover:-translate-x-[3px]"
        >
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
