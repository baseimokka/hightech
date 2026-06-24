'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FilterTag } from '@/components/ui/FilterTag';
import { MachineCard } from './MachineCard';
import { machines, machineCategories, pick } from '@/data';

interface MachinesGalleryProps {
  /** Server-resolved `machineId -> image src` map (missing = placeholder). */
  media?: Record<string, string | undefined>;
}

export function MachinesGallery({ media }: MachinesGalleryProps) {
  const t = useTranslations('machines');
  const lc = useLocale();
  const [active, setActive] = useState('all');

  const cats = [
    { key: 'all', label: t('all') },
    ...machineCategories.map((c) => ({ key: c.slug, label: pick(lc, c.titleAr, c.titleEn) })),
  ];
  const count = (key: string) =>
    key === 'all' ? machines.length : machines.filter((m) => m.category === key).length;
  const shown = active === 'all' ? machines : machines.filter((m) => m.category === active);
  const labels = {
    viewDetails: t('viewDetails'),
    available: t('available'),
    unavailable: t('unavailable'),
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-[var(--space-7)]">
        {cats.map((c) => (
          <FilterTag
            key={c.key}
            active={active === c.key}
            count={count(c.key)}
            onClick={() => setActive(c.key)}
          >
            {c.label}
          </FilterTag>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px]">
        {shown.map((m) => (
          <MachineCard key={m.id} machine={m} locale={lc} labels={labels} src={media?.[m.id]} />
        ))}
      </div>
    </div>
  );
}
