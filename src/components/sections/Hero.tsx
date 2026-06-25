import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/StatCard';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { routes } from '@/config/site';
import { statistics, pick } from '@/data';

export function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const badges = t.raw('hero.badges') as string[];
  // Keep the dark side of the overlay on the text (inline-start) side.
  const overlay =
    locale === 'ar'
      ? 'linear-gradient(270deg, rgba(10,12,15,0.94) 0%, rgba(10,12,15,0.78) 45%, rgba(10,12,15,0.35) 100%)'
      : 'linear-gradient(90deg, rgba(10,12,15,0.94) 0%, rgba(10,12,15,0.78) 45%, rgba(10,12,15,0.35) 100%)';

  return (
    <div className="relative overflow-hidden bg-bg-dark">
      <div className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Desktop / tablet (>=640px): original horizontal gradient — unchanged. */}
        <div className="absolute inset-0 hidden sm:block" style={{ background: overlay }} />
        {/* Mobile only (<640px): vertical scrim. The full-width text/buttons sit over a
            darker base so they stay legible, while the laser & sparks glow through the
            lighter top. Same brand color (10,12,15) as desktop — only the direction differs. */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,12,15,0.62) 0%, rgba(10,12,15,0.82) 58%, rgba(10,12,15,0.96) 100%)',
          }}
        />
      </div>

      {/* max-sm:!py-14 trims the oversized mobile padding (the inline clamp still drives
          tablet/desktop unchanged). max-sm: centers the column content on phones only. */}
      <div className="container-page relative max-sm:!py-14" style={{ paddingBlock: 'clamp(4rem,3rem+6vw,7.5rem)' }}>
        <div className="flex max-w-[680px] flex-col gap-[26px] max-sm:gap-6 max-sm:text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 font-mono text-[13px] tracking-eyebrow uppercase text-white">
              <span className="w-[26px] h-0.5 bg-brand" />
              {t('hero.eyebrow')}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="m-0 font-display text-display-1 font-bold leading-[1.02] tracking-tighter2 text-white text-balance">
              {t('hero.title')}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="m-0 max-w-[560px] max-sm:mx-auto text-[var(--fs-lg)] leading-[1.6] text-steel-200 text-pretty">
              {t('hero.sub')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-3.5 mt-1 max-sm:flex-col">
              <Button
                href={routes.quote}
                variant="primary"
                size="lg"
                className="max-sm:w-full max-sm:flex"
                iconRight={<Icon name="arrow-right" size={18} className="rtl:rotate-180" />}
              >
                {t('cta.quote')}
              </Button>
              <WhatsAppButton size="lg" message={t('hero.title')} className="max-sm:w-full max-sm:flex">
                {t('cta.whatsapp')}
              </WhatsAppButton>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2.5 mt-1.5 max-sm:justify-center">
              {badges.map((b) => (
                <Badge key={b} variant="outline" className="text-steel-200 border-hairline-dark">
                  {b}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-hairline-dark bg-black/40">
        <div className="container-page py-[26px] grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics.cards.map((c, i) => (
            <StatCard
              key={i}
              invert
              value={c.value}
              suffix={pick(locale, c.suffixAr, c.suffixEn)}
              label={pick(locale, c.labelAr, c.labelEn)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
