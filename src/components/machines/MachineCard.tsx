import { Link } from '@/i18n/navigation';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { Badge } from '@/components/ui/Badge';
import { type IconName } from '@/components/ui/Icon';
import { getMachineCategory, pick, type Machine } from '@/data';

interface MachineCardProps {
  machine: Machine;
  locale: string;
  labels: { viewDetails: string; available: string; unavailable: string };
  /** Server-resolved image src (missing = placeholder). */
  src?: string;
}

/** Catalogue tile linking to a machine detail page. */
export function MachineCard({ machine, locale, labels, src }: MachineCardProps) {
  const category = getMachineCategory(machine.category);
  const icon = (category?.icon ?? 'cog') as IconName;
  const categoryLabel = category ? pick(locale, category.titleAr, category.titleEn) : '';
  const name = pick(locale, machine.nameAr, machine.nameEn);
  const specLine = machine.specifications
    .slice(0, 3)
    .map((s) => pick(locale, s.valueAr, s.valueEn))
    .join(' · ');
  const active = machine.status === 'active';

  return (
    <Link
      href={`/machines/${machine.slug}`}
      className="group flex h-full flex-col overflow-hidden no-underline bg-surface-card border border-hairline border-t-[3px] border-t-steel-200 rounded-md shadow-sm transition-[box-shadow,transform,border-color] duration-200 ease-out hover:shadow-lg hover:-translate-y-[3px] hover:border-t-brand"
    >
      <MediaFrame
        icon={icon}
        caption={categoryLabel}
        ratio="4 / 3"
        radius="0"
        style={{ border: 'none', borderRadius: 0 }}
        src={src}
        alt={name}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="m-0 font-display text-[1.15rem] font-semibold tracking-tight text-ink-strong">
          {name}
        </h3>
        {specLine && <p className="m-0 font-mono text-[12px] text-ink-faint">{specLine}</p>}
        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <Badge variant={active ? 'success' : 'outline'} dot={active}>
            {active ? labels.available : labels.unavailable}
          </Badge>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide2 uppercase text-ink-faint group-hover:text-brand transition-colors">
            {labels.viewDetails}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-[3px] rtl:rotate-180 rtl:group-hover:-translate-x-[3px]"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
