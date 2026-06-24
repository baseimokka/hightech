import { type ReactNode } from 'react';

interface FieldLabelProps {
  children: ReactNode;
  required?: boolean;
  htmlFor?: string;
}

export function FieldLabel({ children, required, htmlFor }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-mono text-[12px] tracking-wide2 uppercase text-ink-muted mb-2"
    >
      {children}
      {required && <span className="text-brand ms-1">*</span>}
    </label>
  );
}
