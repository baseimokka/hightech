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
      {/* Mobile (<640px): the WHOLE photo (no crop) is pinned to the top as a 12:5 banner,
          positioned absolutely so the hero text can overlay its lower half. Desktop/tablet
          (>=640px): original absolute full-bleed background — unchanged. */}
      <div className="absolute top-0 left-0 w-full aspect-[12/5] sm:inset-0 sm:aspect-auto sm:w-auto">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Desktop / tablet (>=640px): horizontal gradient over the full-bleed image — unchanged. */}
        <div className="absolute inset-0 hidden sm:block" style={{ background: overlay }} />
        {/* Mobile only: fade the lower part of the photo into the dark background so the
            overlaid headline stays readable, while the full image is still visible up top. */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,12,15,0) 0%, rgba(10,12,15,0) 30%, rgba(10,12,15,0.5) 62%, rgba(10,12,15,0.97) 100%)',
          }}
        />
      </div>

      {/* On mobile the content overlays the lower half of the photo: pt-[27vw] pushes the
          text down over the banner (vw scales with the 12:5 banner height), z-10 keeps it
          above the image. Tablet/desktop keep the original clamp padding untouched. */}
      <div className="container-page relative z-10 max-sm:!pt-[27vw] max-sm:!pb-12" style={{ paddingBlock: 'clamp(4rem,3rem+6vw,7.5rem)' }}>
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
