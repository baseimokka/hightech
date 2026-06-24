import type { Config } from 'tailwindcss';

/**
 * High Tech — Tailwind theme.
 * Every token points at a CSS variable defined in src/app/globals.css, so the
 * design system stays the single source of truth and theming stays live.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--brand)',
          hover: 'var(--brand-hover)',
          pressed: 'var(--brand-pressed)',
          tint: 'var(--brand-tint)',
        },
        red: {
          50: 'var(--red-50)',
          100: 'var(--red-100)',
          200: 'var(--red-200)',
          300: 'var(--red-300)',
          400: 'var(--red-400)',
          500: 'var(--red-500)',
          600: 'var(--red-600)',
          700: 'var(--red-700)',
          800: 'var(--red-800)',
        },
        steel: {
          0: 'var(--steel-0)',
          25: 'var(--steel-25)',
          50: 'var(--steel-50)',
          100: 'var(--steel-100)',
          200: 'var(--steel-200)',
          300: 'var(--steel-300)',
          400: 'var(--steel-400)',
          500: 'var(--steel-500)',
          600: 'var(--steel-600)',
          700: 'var(--steel-700)',
          800: 'var(--steel-800)',
          900: 'var(--steel-900)',
          950: 'var(--steel-950)',
        },
        amber: {
          400: 'var(--amber-400)',
          500: 'var(--amber-500)',
        },
        whatsapp: {
          DEFAULT: 'var(--whatsapp)',
          dark: 'var(--whatsapp-700)',
        },
        ok: 'var(--green-500)',
        // semantic aliases
        'bg-base': 'var(--bg-base)',
        'bg-subtle': 'var(--bg-subtle)',
        'bg-dark': 'var(--bg-dark)',
        'surface-card': 'var(--surface-card)',
        'surface-inset': 'var(--surface-inset)',
        'surface-dark': 'var(--surface-dark)',
        hairline: 'var(--border)',
        'hairline-strong': 'var(--border-strong)',
        'hairline-dark': 'var(--border-dark)',
        ink: {
          strong: 'var(--text-strong)',
          body: 'var(--text-body)',
          muted: 'var(--text-muted)',
          faint: 'var(--text-faint)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        eyebrow: ['var(--fs-eyebrow)', { letterSpacing: '0.18em' }],
        'display-1': ['var(--fs-display-1)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-2': ['var(--fs-display-2)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-3': ['var(--fs-display-3)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        tighter2: '-0.03em',
        eyebrow: '0.18em',
        wide2: '0.06em',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        brand: 'var(--shadow-brand)',
      },
      maxWidth: {
        container: 'var(--container)',
        'container-narrow': 'var(--container-narrow)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
