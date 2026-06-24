'use client';

import { useRef, useState } from 'react';
import { FieldLabel } from './FieldLabel';
import { cn } from '@/lib/cn';

interface FileUploadProps {
  label?: string;
  required?: boolean;
  helper?: string;
  accept?: string;
  multiple?: boolean;
  id?: string;
  ctaLabel?: string;
  dragLabel?: string;
  /** Reports the selected File objects to the parent form. */
  onFilesChange?: (files: File[]) => void;
}

/** Drag-and-drop styled picker for CAD drawings / specs on the quote form. */
export function FileUpload({
  label,
  required,
  helper,
  accept = '.pdf,.dwg,.dxf,.step,.stp,.igs,.jpg,.png',
  multiple = true,
  id = 'file-upload',
  ctaLabel = 'Click to upload',
  dragLabel = 'or drag files here',
  onFilesChange,
}: FileUploadProps) {
  const [files, setFiles] = useState<string[]>([]);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    const arr = Array.from(list || []);
    setFiles(arr.map((f) => f.name));
    onFilesChange?.(arr);
  };

  return (
    <div className="w-full">
      {label && <FieldLabel required={required}>{label}</FieldLabel>}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 min-h-[130px] px-4 py-5 text-center',
          'rounded-md border-2 border-dashed cursor-pointer',
          'transition-[border-color,background] duration-200 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
          over ? 'border-brand bg-brand-tint' : 'border-hairline-strong bg-surface-inset',
        )}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M17 8l-5-5-5 5" />
          <path d="M12 3v12" />
        </svg>
        <p className="m-0 text-[14.5px] text-ink-body">
          <strong className="text-brand font-semibold">{ctaLabel}</strong> {dragLabel}
        </p>
        <p className="m-0 font-mono text-[11px] tracking-[0.04em] text-ink-faint">
          PDF · DWG · DXF · STEP · IGES · IMG
        </p>
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>
      {files.length > 0 && (
        <ul className="list-none mt-2.5 p-0 flex flex-col gap-1.5">
          {files.map((n, i) => (
            <li key={i} className="flex items-center gap-2 text-[13px] text-ink-body">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green-500)"
                strokeWidth="2.4"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {n}
            </li>
          ))}
        </ul>
      )}
      {helper && <p className="mt-[7px] text-[12.5px] text-ink-faint">{helper}</p>}
    </div>
  );
}
