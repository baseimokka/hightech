'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { services as serviceList, machineCategories, getMachinesByCategory, pick } from '@/data';
import { Input } from '@/components/ui/form/Input';
import { Select } from '@/components/ui/form/Select';
import { Textarea } from '@/components/ui/form/Textarea';
import { FileUpload } from '@/components/ui/form/FileUpload';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Badge } from '@/components/ui/Badge';
import { Icon, type IconName } from '@/components/ui/Icon';
import { buildQuoteMessage, buildWhatsAppUrl } from '@/lib/whatsapp';

interface FormValues {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  machineType: string;
  machine: string;
  message: string;
}

const EMPTY: FormValues = {
  name: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  machineType: '',
  machine: '',
  message: '',
};

export function QuoteForm() {
  const tq = useTranslations('quote');
  const tc = useTranslations('cta');
  const lc = useLocale();
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [sent, setSent] = useState(false);

  const services = serviceList.map((s) => pick(lc, s.titleAr, s.titleEn));
  const machineTypes = machineCategories.map((c) => pick(lc, c.titleAr, c.titleEn));
  // "Industrial Machinery" (the machines service) is the single machine option;
  // selecting it reveals the machine-category field, which in turn reveals the
  // list of machines in that category.
  const machinesService = serviceList.find((s) => s.id === 'machines');
  const machinesLabel = machinesService ? pick(lc, machinesService.titleAr, machinesService.titleEn) : '';
  const showMachineType = !!machinesLabel && values.service === machinesLabel;

  // Machines belonging to the currently selected category.
  const selectedCategory = machineCategories.find((c) => pick(lc, c.titleAr, c.titleEn) === values.machineType);
  const machinesInCategory = selectedCategory
    ? getMachinesByCategory(selectedCategory.slug).map((m) => pick(lc, m.nameAr, m.nameEn))
    : [];
  const showMachine = showMachineType && machinesInCategory.length > 0;

  const trust = tq.raw('trust') as string[];
  const trustIcons: IconName[] = ['shield-check', 'clock', 'file-check'];

  const set = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  // Changing the service away from machinery clears the machine category + machine.
  const onServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const service = e.target.value;
    const keep = service === machinesLabel;
    setValues((v) => ({
      ...v,
      service,
      machineType: keep ? v.machineType : '',
      machine: keep ? v.machine : '',
    }));
  };

  // Changing the category clears the previously chosen machine.
  const onMachineTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const machineType = e.target.value;
    setValues((v) => ({ ...v, machineType, machine: '' }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = tq('errors.name');
    if (!/\d{6,}/.test(values.phone.replace(/[^\d]/g, ''))) next.phone = tq('errors.phone');
    if (!values.service) next.service = tq('errors.service');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = buildQuoteMessage(
      { ...values, files: files.map((f) => f.name) },
      {
        intro: tq('waIntro'),
        filesNote: tq('waFilesNote'),
        f: {
          name: tq('f.name'),
          company: tq('f.company'),
          phone: tq('f.phone'),
          email: tq('f.email'),
          service: tq('f.service'),
          machineType: tq('f.machineType'),
          machine: tq('f.machine'),
          message: tq('f.message'),
        },
      },
    );

    window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const reset = () => {
    setValues(EMPTY);
    setFiles([]);
    setErrors({});
    setSent(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-8 items-start">
      {/* FORM CARD */}
      <div className="bg-surface-card border border-hairline border-t-[3px] border-t-brand rounded-md shadow-md p-[clamp(22px,3vw,38px)]">
        {sent ? (
          <div className="flex flex-col items-center text-center gap-4 px-2.5 py-10">
            <span className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[rgba(30,184,88,0.12)] text-ok">
              <Icon name="check" size={36} />
            </span>
            <h3 className="m-0 font-display text-2xl font-bold text-ink-strong">{tq('success')}</h3>
            <p className="m-0 max-w-[380px] leading-[1.6] text-ink-muted">{tq('successSub')}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-1.5">
              <WhatsAppButton message={tq('waIntro')}>{tc('whatsapp')}</WhatsAppButton>
              <Button variant="outline" onClick={reset}>
                {tq('newRequest')}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]">
              <Input
                label={tq('f.name')}
                required
                placeholder={tq('ph.name')}
                value={values.name}
                onChange={set('name')}
                error={errors.name}
              />
              <Input
                label={tq('f.company')}
                placeholder={tq('ph.company')}
                value={values.company}
                onChange={set('company')}
              />
              <Input
                label={tq('f.phone')}
                required
                type="tel"
                inputMode="tel"
                placeholder={tq('ph.phone')}
                iconLeft={<Icon name="phone" size={17} />}
                value={values.phone}
                onChange={set('phone')}
                error={errors.phone}
              />
              <Select
                label={tq('f.service')}
                required
                placeholder={tq('ph.service')}
                options={services}
                value={values.service}
                onChange={onServiceChange}
                error={errors.service}
              />
              {/* Machine category — shown only when "Industrial Machinery" is the chosen service. */}
              {showMachineType && (
                <Select
                  label={tq('f.machineType')}
                  placeholder={tq('ph.machineType')}
                  options={machineTypes}
                  value={values.machineType}
                  onChange={onMachineTypeChange}
                />
              )}
              {/* Machine — the available machines in the chosen category. */}
              {showMachine && (
                <Select
                  label={tq('f.machine')}
                  placeholder={tq('ph.machine')}
                  options={machinesInCategory}
                  value={values.machine}
                  onChange={set('machine')}
                />
              )}
              <Input
                label={tq('f.email')}
                type="email"
                placeholder={tq('ph.email')}
                iconLeft={<Icon name="mail" size={17} />}
                value={values.email}
                onChange={set('email')}
              />
            </div>

            <Textarea
              label={tq('f.message')}
              rows={5}
              placeholder={tq('ph.message')}
              value={values.message}
              onChange={set('message')}
            />

            <FileUpload
              label={tq('f.file')}
              helper={tq('fileHelper')}
              ctaLabel={tq('fileCta')}
              dragLabel={tq('fileDrag')}
              onFilesChange={setFiles}
            />

            <div className="flex flex-wrap items-center gap-3.5 mt-1">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                iconRight={<Icon name="arrow-right" size={18} className="rtl:rotate-180" />}
              >
                {tc('send')}
              </Button>
              <span className="inline-flex items-center gap-[7px] text-[13px] text-ink-faint">
                <Icon name="lock" size={14} />
                {tq('confidential')}
              </span>
            </div>
          </form>
        )}
      </div>

      {/* WHATSAPP-FIRST PANEL */}
      <div className="flex flex-col gap-[18px] lg:sticky lg:top-[90px]">
        <div className="relative overflow-hidden bg-steel-950 rounded-md p-7 flex flex-col gap-4">
          <div
            className="absolute w-[120px] h-[120px] rounded-full"
            style={{
              insetInlineEnd: -20,
              top: -20,
              background: 'radial-gradient(circle, rgba(37,211,102,0.22), transparent 70%)',
            }}
            aria-hidden="true"
          />
          <Badge variant="success" dot>
            {tq('repliesIn2h')}
          </Badge>
          <h3 className="m-0 font-display text-[22px] font-bold leading-[1.25] text-white">
            {tq('or')}
          </h3>
          <p className="m-0 text-[14px] leading-[1.6] text-steel-300">{tq('whatsappLead')}</p>
          <WhatsAppButton block size="lg" message={tq('waIntro')}>
            {tc('whatsapp')}
          </WhatsAppButton>
        </div>

        <div className="bg-surface-card border border-hairline rounded-md p-6 flex flex-col gap-4">
          {trust.map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <Icon name={trustIcons[i]} size={20} className="text-brand" />
              <span className="text-[14.5px] font-medium text-ink-body">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
