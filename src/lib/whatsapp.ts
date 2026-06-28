import { contact } from '@/data/contact';

/**
 * WhatsApp deep-link helpers.
 *
 * wa.me links can only carry pre-filled *text* (not binary attachments), so the
 * quote flow composes a fully-formatted text message from the form fields and
 * lists any uploaded file names for the user to attach inside the chat.
 */

export function sanitizePhone(phone: string): string {
  return String(phone).replace(/[^\d]/g, '');
}

/** Build a wa.me URL with an optional pre-filled message. */
export function buildWhatsAppUrl(message?: string, phone: string = contact.whatsapp): string {
  const digits = sanitizePhone(phone);
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface QuoteFields {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  service?: string;
  machineType?: string;
  machine?: string;
  message?: string;
  files?: string[];
}

export interface QuoteLabels {
  intro: string;
  filesNote: string;
  f: {
    name: string;
    company: string;
    phone: string;
    email: string;
    service: string;
    machineType: string;
    machine: string;
    message: string;
  };
}

/** Compose a clean, scannable WhatsApp message from the quote form. */
export function buildQuoteMessage(fields: QuoteFields, labels: QuoteLabels): string {
  const lines: string[] = [labels.intro, ''];

  const row = (label: string, value?: string) => {
    if (value && value.trim()) lines.push(`• ${label}: ${value.trim()}`);
  };

  row(labels.f.name, fields.name);
  row(labels.f.company, fields.company);
  row(labels.f.phone, fields.phone);
  row(labels.f.email, fields.email);
  row(labels.f.service, fields.service);
  row(labels.f.machineType, fields.machineType);
  row(labels.f.machine, fields.machine);

  if (fields.message && fields.message.trim()) {
    lines.push('', `${labels.f.message}:`, fields.message.trim());
  }

  if (fields.files && fields.files.length > 0) {
    lines.push('', labels.filesNote, ...fields.files.map((f) => `– ${f}`));
  }

  return lines.join('\n');
}
