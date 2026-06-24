'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'outline-invert' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const SIZES: Record<Size, string> = {
  sm: 'h-[38px] px-[14px] text-[13px] gap-[7px]',
  md: 'h-[46px] px-5 text-[15px] gap-[9px]',
  lg: 'h-14 px-7 text-[16.5px] gap-[11px]',
};

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white border border-brand shadow-brand',
  secondary: 'bg-steel-950 text-white border border-steel-950 shadow-sm',
  outline: 'bg-transparent text-ink-strong border border-hairline-strong',
  'outline-invert': 'bg-transparent text-white border border-white/35',
  ghost: 'bg-transparent text-brand border border-transparent',
};

const BASE =
  'inline-flex items-center justify-center font-display font-semibold tracking-[-0.015em] leading-none ' +
  'rounded-sm whitespace-nowrap cursor-pointer select-none ' +
  'transition-[transform,filter,box-shadow,background] duration-200 ease-out ' +
  'hover:brightness-[0.93] active:translate-y-px ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2';

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  block?: boolean;
  className?: string;
  /** When set, the button renders as a locale-aware link. */
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'type'> & {
    type?: 'button' | 'submit' | 'reset';
  };

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  block = false,
  className,
  href,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], block && 'w-full flex', className);

  const inner = (
    <>
      {iconLeft && <span className="inline-flex">{iconLeft}</span>}
      {children}
      {iconRight && <span className="inline-flex">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {inner}
    </button>
  );
}
