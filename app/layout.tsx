import type { Metadata, Viewport } from 'next';
import './globals.css';

const siteUrl = 'https://yellow-glacier-039e21b10.7.azurestaticapps.net';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#33D95C'
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'EMC Marketing | Fayetteville Social Media, Branding, Web Design & Paid Ads',
    template: '%s | EMC Marketing'
  },
  description: 'EMC Marketing is a Fayetteville, Arkansas marketing agency for social media strategy, paid ads, brand identity, content production, website design, SEO, AIO and Google Business optimization.',
  keywords: [
    'EMC Marketing',
    'Fayetteville marketing agency',
    'social media marketing Fayetteville AR',
    'paid ads agency',
    'brand identity',
    'website design',
    'SEO',
    'AIO',
    'Google Business optimization',
    'content production'
  ],
  authors: [{ name: 'EMC Marketing' }],
  creator: 'EMC Marketing',
  publisher: 'EMC Marketing',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'EMC Marketing',
    title: 'EMC Marketing | Your Marketing Sucks Less Now',
    description: 'Fayetteville marketing agency for social media, paid ads, branding, content, web design, SEO, AIO and Google Business optimization.',
    images: [{ url: '/images/emc-logo.svg', width: 1200, height: 630, alt: 'EMC Marketing' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMC Marketing | Fayetteville Marketing Agency',
    description: 'Social media, paid ads, branding, content, web design, SEO, AIO and Google Business optimization.',
    images: ['/images/emc-logo.svg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  }
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': `${siteUrl}/#business`,
      name: 'EMC Marketing',
      url: siteUrl,
      logo: `${siteUrl}/images/emc-logo.svg`,
      image: `${siteUrl}/images/emc-logo.svg`,
      description: 'A Fayetteville, Arkansas marketing agency offering social media strategy, paid media, brand identity, content production, website design, SEO, AIO and Google Business optimization.',
      slogan: 'Your marketing sucks less now.',
      email: 'info@emcmarketing.co',
      telephone: '+1-479-445-3632',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Fayetteville',
        addressRegion: 'AR',
        addressCountry: 'US'
      },
      areaServed: ['Fayetteville', 'Northwest Arkansas', 'United States'],
      sameAs: [
        'https://www.facebook.com/profile.php?id=100095202204919',
        'https://www.instagram.com/elizabethsmediacreations/',
        'https://www.linkedin.com/in/elizabethrenae/',
        'https://www.youtube.com/@EMCSocialClub'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'EMC Marketing',
      publisher: { '@id': `${siteUrl}/#business` },
      inLanguage: 'en-US'
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
