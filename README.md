# High Tech — Industrial Marketing Website

Production B2B marketing site for **High Tech** (CNC machining, laser cutting, CNC spare
parts and metal fabrication). The single goal is **lead generation via WhatsApp quote
requests** — there is no login, dashboard, database or e-commerce.

Built from the **High Tech Design System** (`claude.ai/design`) — industrial Red / White /
Steel-black, Arabic-first and bilingual.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — theme tokens map 1:1 to the design system's CSS variables
- **Framer Motion** — subtle, no-bounce scroll reveals (disabled under `prefers-reduced-motion`)
- **next-intl** — Arabic (default) / English with `/ar` and `/en` routes and full RTL
- **lucide-react** — line iconography

## Pages

`/[locale]` Home · `/about` · `/services` · `/portfolio` · `/quote` · `/contact`

Every page keeps a **Request a Quote + WhatsApp** call-to-action visible.

## Lead generation

- **Quote form** (`src/components/quote/QuoteForm.tsx`) — client-side validation, CAD file
  upload (DXF · DWG · PDF · STEP · IGES · images). On submit it composes a formatted message
  and opens **WhatsApp** (`wa.me`). No data is stored on any server.
- **WhatsApp utility** (`src/lib/whatsapp.ts`) — `buildWhatsAppUrl` / `buildQuoteMessage`.
  > `wa.me` deep links carry text only, so uploaded **file names** are listed in the message
  > for the customer to attach in the chat.
- **Floating WhatsApp button** (`src/components/layout/WhatsAppFab.tsx`) on mobile/tablet.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /ar
npm run build    # production build
npm run start    # serve the production build
```

## Content layer — edit content without touching components

All domain content lives in **`src/data/`** as typed, bilingual modules (the single
source of truth). Components read from these via the `pick(locale, ar, en)` helper, so
**updating content means editing data files only — no component changes.**

| File | Owns |
|------|------|
| `company.ts` | name, description, mission, vision, social links, industries served |
| `contact.ts` | phone, WhatsApp number, email, address, working hours, Google Maps URL |
| `statistics.ts` | years of experience, completed projects, happy clients, machines installed, hero KPI cards |
| `services.ts` | services catalogue (title, description, icon, image, spec chips) — also feeds the quote dropdown |
| `machineCategories.ts` | reusable machine categories |
| `machines.ts` | machines (name, category, specs, features, gallery, status) |
| `projects.ts` | portfolio projects + categories |
| `clients.ts` | client / partner logos |
| `index.ts` | barrel — `import { services, company, pick } from '@/data'` |

Each translatable field is an explicit `*Ar` / `*En` pair (e.g. `titleAr` / `titleEn`).
Pure UI strings (nav, buttons, form labels, section eyebrows, SEO meta) stay in
`messages/*.json` and are handled by next-intl.

> `machines.ts` / `machineCategories.ts` are seeded and ready but not yet rendered by any
> page (the current design has no machines page) — a future machines page only needs to
> consume this data.

Business details previously in `src/config/site.ts` now live in `contact.ts` /
`company.ts`; `site.ts` keeps only the app name, domain and route map.

## Project structure

```
messages/                 ar.json · en.json — UI strings (next-intl)
public/                   logo.svg · logo-invert.svg · monogram.svg
src/
  data/                   CONTENT LAYER — company, contact, statistics, services,
                          machines, machineCategories, projects, clients, types, index
  app/[locale]/           layout + the six pages + localized not-found
  components/
    ui/                   Button, WhatsAppButton, Badge, Card, ServiceCard, StatCard,
                          FilterTag, SectionHeading, Section, MediaFrame, Reveal, Icon
    ui/form/              Input, Textarea, Select, FileUpload, FieldLabel
    layout/               Navbar, Footer, WhatsAppFab, LangSwitch
    sections/             Hero, FinalCta, PageHeader
    portfolio/            PortfolioGallery (filterable)
    quote/                QuoteForm
  config/site.ts          app name, domain + route map
  i18n/                   next-intl routing, navigation, request config
  lib/                    whatsapp.ts, cn.ts
  app/globals.css         design tokens (CSS variables) + base styles
```

## Imagery — drop-in, no code edits

Every image slot renders the **`MediaFrame`** component. When a real file exists at the
path defined in the data, `MediaFrame` shows it as an optimized `next/image`; otherwise it
falls back to the brushed-steel placeholder (dark field, red kerf line, caption). The check
runs server-side (`src/lib/media.ts → resolveMedia`), so **there are no broken images and no
404s** — and adding a photo means just dropping the file in + rebuilding.

See **`public/images/README.md`** for the exact path of every image (hero, services,
projects, machines, machine categories, client logos). Keep imagery dark and cool so the red
CTAs and amber sparks pop.

## Notes

- Default language is **Arabic** (`/` → `/ar`, `dir="rtl"`); English is a toggle in the navbar.
- The design system uses placeholder business details (`+966 50 000 0000`, `sales@hightech.sa`,
  Riyadh) — update them in `src/config/site.ts` and `messages/*.json` before launch.
