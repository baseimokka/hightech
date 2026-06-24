import { type CSSProperties } from 'react';
import Image from 'next/image';
import { Icon, type IconName } from './Icon';

/**
 * Media slot for CNC / laser / steel photography and video.
 *
 * - With a resolved `src` it renders the real image (object-cover) behind the
 *   signature red kerf edge.
 * - Without `src` it renders the brushed-steel placeholder — a dark field with a
 *   red kerf line, grain, spark dot, icon + mono caption describing what belongs
 *   there.
 *
 * Resolve `src` on the server with `resolveMedia()` so missing files fall back to
 * the placeholder (no broken images). See `src/lib/media.ts`.
 */
interface MediaFrameProps {
  label?: string;
  caption?: string;
  icon?: IconName;
  video?: boolean;
  ratio?: string;
  radius?: string;
  className?: string;
  style?: CSSProperties;
  /** Resolved public image path (verified to exist by the server). */
  src?: string;
  /** Alt text for the real image; falls back to label / caption. */
  alt?: string;
  /** next/image sizes hint. */
  sizes?: string;
}

export function MediaFrame({
  label,
  caption,
  icon = 'image',
  video = false,
  ratio = '16 / 10',
  radius = 'var(--radius-md)',
  className,
  style,
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, 33vw',
}: MediaFrameProps) {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #15191e 0%, #0c0f12 55%, #1c2126 100%)',
        border: '1px solid var(--border-dark)',
        ...style,
      }}
    >
      {src ? (
        /* ── Real image ── */
        <>
          <Image src={src} alt={alt ?? label ?? caption ?? ''} fill sizes={sizes} className="object-cover" />
          <div
            style={{
              position: 'absolute',
              insetInlineStart: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: 'var(--brand)',
              zIndex: 1,
            }}
          />
        </>
      ) : (
        /* ── Brushed-steel placeholder ── */
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 7px)',
              opacity: 0.6,
            }}
          />
          <div
            style={{
              position: 'absolute',
              insetInlineStart: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: 'var(--brand)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              insetInlineEnd: 18,
              top: 18,
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--amber-400)',
              boxShadow: '0 0 14px 3px rgba(255,178,46,0.6)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              color: 'var(--steel-400)',
            }}
          >
            {video ? (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(225,6,0,0.92)',
                  boxShadow: '0 10px 30px rgba(225,6,0,0.4)',
                }}
              >
                <Icon name="play" size={26} className="text-white ms-[3px]" />
              </span>
            ) : (
              <Icon name={icon} size={30} className="text-steel-500" />
            )}
            {caption && (
              <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-steel-500">
                {caption}
              </span>
            )}
          </div>
          {label && (
            <span
              className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-steel-300"
              style={{ position: 'absolute', insetInlineStart: 16, bottom: 14 }}
            >
              {label}
            </span>
          )}
        </>
      )}
    </div>
  );
}
