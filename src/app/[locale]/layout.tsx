import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { IBM_Plex_Sans_Arabic, IBM_Plex_Mono } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';
import { JsonLd } from '@/components/seo/JsonLd';
import { organizationSchema } from '@/lib/jsonld';
import {
  DEFAULT_OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  OG_LOCALE,
  localePath,
} from '@/lib/seo';
import { site } from '@/config/site';
import '../globals.css';

const sans = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#0a0c0f',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  const title = t('title');
  const description = t('description');
  const keywords = t.raw('keywords') as string[];
  const url = localePath('/', locale);

  return {
    metadataBase: new URL(site.domain),
    title: { default: title, template: `%s — ${site.name}` },
    description,
    keywords,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.domain }],
    creator: site.name,
    publisher: site.name,
    category: 'Industrial Machinery',
    formatDetection: { telephone: false },
    alternates: {
      canonical: url,
      languages: {
        ar: localePath('/', 'ar'),
        en: localePath('/', 'en'),
        'x-default': localePath('/', routing.defaultLocale),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
      shortcut: '/favicon.svg',
      apple: [{ url: '/favicon.svg' }],
    },
    manifest: '/manifest.webmanifest',
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title,
      description,
      locale: OG_LOCALE[locale] ?? locale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l] ?? l),
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'a11y' });
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${sans.variable} ${mono.variable}`}>
      <body>
        <JsonLd data={organizationSchema(locale)} />
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-3 focus:start-3 focus:rounded-sm focus:bg-brand focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
          >
            {t('skipToContent')}
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
