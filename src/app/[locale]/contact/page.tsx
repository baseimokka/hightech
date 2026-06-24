import type { Metadata } from 'next';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/sections/PageHeader';
import { Section } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Icon, type IconName } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { contact, pick } from '@/data';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.contact' });
  return { title: t('title'), description: t('description') };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = useTranslations();
  const lc = useLocale();

  const items: Array<{ icon: IconName; label: string; value: string; href: string }> = [
    { icon: 'phone', label: t('contact.phone'), value: contact.phone, href: `tel:+${contact.whatsapp}` },
    { icon: 'mail', label: t('contact.email'), value: contact.email, href: `mailto:${contact.email}` },
    {
      icon: 'map-pin',
      label: t('contact.address'),
      value: pick(lc, contact.addressAr, contact.addressEn),
      href: contact.googleMapsUrl,
    },
    { icon: 'clock', label: t('contact.hours'), value: pick(lc, contact.hoursAr, contact.hoursEn), href: '#' },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        description={t('contact.sub')}
      />
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-start">
          <div className="flex flex-col gap-4">
            <div className="bg-steel-950 rounded-md p-7 flex flex-col gap-3.5">
              <Badge variant="success" dot>
                {t('contact.online')}
              </Badge>
              <h2 className="m-0 font-display text-[21px] font-bold text-white">
                {t('contact.whatsapp')}
              </h2>
              <WhatsAppButton block size="lg">
                {t('cta.whatsapp')}
              </WhatsAppButton>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {items.map((it) => (
                <a
                  key={it.label}
                  href={it.href}
                  className="flex flex-col gap-2 p-5 bg-surface-card border border-hairline rounded-sm no-underline hover:shadow-sm transition-shadow"
                >
                  <Icon name={it.icon} size={20} className="text-brand" />
                  <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-faint">
                    {it.label}
                  </span>
                  <span className="text-[14px] font-medium text-ink-strong leading-[1.4]">
                    {it.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <Reveal delay={0.05}>
            <div
              className="relative overflow-hidden rounded-md border border-hairline min-h-[440px]"
              style={{ background: 'linear-gradient(135deg,#e9edf1,#dfe4ea)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, rgba(120,131,143,0.18) 0 1px, transparent 1px 44px), repeating-linear-gradient(90deg, rgba(120,131,143,0.18) 0 1px, transparent 1px 44px)',
                }}
              />
              <div
                className="absolute flex flex-col items-center gap-1"
                style={{ top: '46%', insetInlineStart: '40%' }}
              >
                <Icon name="map-pin" size={40} className="text-brand" />
                <span className="font-mono text-[11px] bg-steel-950 text-white px-2 py-1 rounded tracking-[0.1em]">
                  HIGH TECH
                </span>
              </div>
              <span
                className="absolute font-mono text-[11px] tracking-[0.14em] uppercase text-steel-500"
                style={{ insetInlineStart: 16, bottom: 14 }}
              >
                {t('contact.mapCaption')}
              </span>
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
