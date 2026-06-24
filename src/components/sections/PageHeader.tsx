import { SectionHeading } from '@/components/ui/SectionHeading';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Dark "factory-floor" header band used at the top of inner pages. */
export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="bg-bg-dark" style={{ paddingBlock: 'var(--section-y-tight)', paddingInline: 'var(--gutter)' }}>
      <div className="mx-auto w-full max-w-container">
        <SectionHeading as="h1" invert eyebrow={eyebrow} title={title} description={description} />
      </div>
    </div>
  );
}
