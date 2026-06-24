'use client';

import { type InputHTMLAttributes, type ReactNode } from 'react';
import { FieldLabel } from './FieldLabel';
import { fieldClass } from './styles';
import { cn } from '@/lib/cn';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string;
  helper?: string;
  error?: string;
  iconLeft?: ReactNode;
}

export function Input({ label, required, helper, error, iconLeft, id, ...rest }: InputProps) {
  const inputId =
    id || (label ? `f-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="w-full">
      {label && (
        <FieldLabel htmlFor={inputId} required={required}>
          {label}
        </FieldLabel>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <span
            aria-hidden="true"
            className="absolute start-[13px] inline-flex text-ink-faint pointer-events-none"
          >
            {iconLeft}
          </span>
        )}
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          className={fieldClass(!!error, cn('h-[50px]', iconLeft ? 'ps-10 pe-[14px]' : 'px-[14px]'))}
          {...rest}
        />
      </div>
      {(helper || error) && (
        <p className={cn('mt-[7px] text-[12.5px]', error ? 'text-brand' : 'text-ink-faint')}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
