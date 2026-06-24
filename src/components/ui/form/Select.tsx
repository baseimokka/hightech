'use client';

import { type SelectHTMLAttributes } from 'react';
import { FieldLabel } from './FieldLabel';
import { fieldClass } from './styles';
import { cn } from '@/lib/cn';

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label?: string;
  helper?: string;
  error?: string;
  options?: string[];
  placeholder?: string;
}

export function Select({
  label,
  required,
  helper,
  error,
  options = [],
  placeholder,
  id,
  ...rest
}: SelectProps) {
  const fid = id || (label ? `s-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="w-full">
      {label && (
        <FieldLabel htmlFor={fid} required={required}>
          {label}
        </FieldLabel>
      )}
      <div className="relative">
        <select
          id={fid}
          required={required}
          aria-invalid={error ? true : undefined}
          className={fieldClass(!!error, 'h-[50px] ps-[14px] pe-10 appearance-none cursor-pointer')}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-faint)"
          strokeWidth="2.2"
          aria-hidden="true"
          className="absolute end-[13px] top-4 pointer-events-none"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {(helper || error) && (
        <p className={cn('mt-[7px] text-[12.5px]', error ? 'text-brand' : 'text-ink-faint')}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
