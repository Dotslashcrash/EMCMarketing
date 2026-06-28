import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteShell } from '@/components/site-shell';
import { JsonLd } from '@/components/json-ld';
import { faqSchema, navSchema, organizationSchema } from '@/lib/seo';
import { business, siteUrl } from '@/lib/site-data';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#b8ff00'
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EMC Marketing | Fayetteville Marketing Agency With a Pulse',
    template: '%s | EMC Marketing'
  },
  description:
    'EMC Marketing is a Fayetteville, Arkansas marketing agency for social media, paid ads, branding, content, websites, SEO, AEO, and Google Business support.',
  keywords: [
    'EMC Marketing',
    'Fayetteville marketing agency',
    'Northwest Arkansas marketing',
    'social media marketing Fayetteville',
    'paid ads agency',
    'website design Fayetteville AR',
    'local SEO',
    'AEO marketing',
    'Google Business optimization'
  ],
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={faqSchema()} />
        <JsonLd data={navSchema()} />
      </body>
    </html>
  );
}
