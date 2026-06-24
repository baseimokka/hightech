'use client';

import { type TextareaHTMLAttributes } from 'react';
import { FieldLabel } from './FieldLabel';
import { fieldClass } from './styles';
import { cn } from '@/lib/cn';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string;
  helper?: string;
  error?: string;
}

export function Textarea({ label, required, helper, error, rows = 5, id, ...rest }: TextareaProps) {
  const fid = id || (label ? `t-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <div className="w-full">
      {label && (
        <FieldLabel htmlFor={fid} required={required}>
          {label}
        </FieldLabel>
      )}
      <textarea
        id={fid}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        className={fieldClass(!!error, 'py-3 px-[14px] leading-[1.6] resize-y')}
        {...rest}
      />
      {(helper || error) && (
        <p className={cn('mt-[7px] text-[12.5px]', error ? 'text-brand' : 'text-ink-faint')}>
          {error || helper}
        </p>
      )}
    </div>
  );
}
