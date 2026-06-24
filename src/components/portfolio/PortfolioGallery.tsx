'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FilterTag } from '@/components/ui/FilterTag';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Reveal } from '@/components/ui/Reveal';
import type { IconName } from '@/components/ui/Icon';
import {
  projects,
  projectCategories,
  projectLabelAr,
  projectLabelEn,
  pick,
} from '@/data';
import { cn } from '@/lib/cn';

interface PortfolioGalleryProps {
  /** Server-resolved `projectId -> image src` map (missing = placeholder). */
  media?: Record<string, string | undefined>;
}

export function PortfolioGallery({ media }: PortfolioGalleryProps) {
  const t = useTranslations('portfolio');
  const lc = useLocale();
  const [active, setActive] = useState(0);

  const projLabel = pick(lc, projectLabelAr, projectLabelEn);
  const counts = projectCategories.map((c) =>
    c.key === 'all' ? projects.length : projects.filter((p) => p.category === c.key).length,
  );
  const activeKey = projectCategories[active].key;
  const shown = activeKey === 'all' ? projects : projects.filter((p) => p.category === activeKey);

  const longLabel = (key: string) => {
    const c = projectCategories.find((pc) => pc.key === key);
    return c ? pick(lc, c.labelAr, c.labelEn) : '';
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-[var(--space-7)]">
        {projectCategories.map((c, i) => (
          <FilterTag key={c.key} active={active === i} count={counts[i]} onClick={() => setActive(i)}>
            {pick(lc, c.shortAr, c.shortEn)}
          </FilterTag>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[170px] gap-3.5">
        {shown.map((p, i) => (
          <MediaFrame
            key={p.id}
            className={cn(p.featured && 'lg:col-span-2 lg:row-span-2')}
            label={longLabel(p.category)}
            caption={`${projLabel} ${String(i + 1).padStart(2, '0')}`}
            icon={p.icon as IconName}
            ratio="auto"
            src={media?.[p.id]}
            alt={pick(lc, p.titleAr, p.titleEn)}
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        ))}
      </div>

      {/* Before / after */}
      <div className="mt-[var(--space-10)]">
        <Reveal>
          <SectionHeading eyebrow={t('beforeAfterEyebrow')} title={t('beforeAfterTitle')} />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-[var(--space-6)]">
          <MediaFrame label={t('beforeRaw')} caption={t('before')} icon="square" ratio="16 / 9" />
          <MediaFrame
            label={t('afterFinished')}
            caption={t('after')}
            icon="check-check"
            ratio="16 / 9"
          />
        </div>
      </div>
    </div>
  );
}
