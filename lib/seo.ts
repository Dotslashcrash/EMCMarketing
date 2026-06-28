import type { Metadata } from 'next';
import { business, faqs, navItems, reviews, services, siteUrl, socials, videos } from './site-data';

export function pageMeta({
  title,
  description,
  path = '/'
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: business.name,
      title,
      description,
      images: [{ url: '/images/emc-logo.svg', width: 1200, height: 630, alt: 'EMC Marketing logo' }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/emc-logo.svg']
    }
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
        '@id': `${siteUrl}/#organization`,
        name: business.name,
        url: siteUrl,
        logo: `${siteUrl}/images/emc-logo.svg`,
        image: `${siteUrl}/images/emc-logo.svg`,
        description:
          'Fayetteville marketing agency for social media strategy, paid ads, brand identity, content production, website design, SEO, AEO, Google Business support, audits, and consultation.',
        email: business.email,
        telephone: '+1-479-445-3632',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Fayetteville',
          addressRegion: 'AR',
          addressCountry: 'US'
        },
        areaServed: business.areaServed,
        sameAs: socials.map((social) => social.href),
        priceRange: '$$'
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: business.name,
        publisher: { '@id': `${siteUrl}/#organization` },
        inLanguage: 'en-US'
      }
    ]
  };
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };
}

export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.body,
        provider: { '@id': `${siteUrl}/#organization` },
        areaServed: business.areaServed
      }
    }))
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString()
    }))
  };
}

export function videoSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: videos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        contentUrl: video.watchUrl,
        embedUrl: video.embedUrl,
        thumbnailUrl: video.thumbnail,
        publisher: { '@id': `${siteUrl}/#organization` }
      }
    }))
  };
}

export function reviewSchemaIfVerified() {
  const verified = reviews.filter((review) => review.verified);
  if (!verified.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    review: verified.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5 },
      reviewBody: review.body
    }))
  };
}

export function navSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: navItems.map((item) => item.label),
    url: navItems.map((item) => new URL(item.href, siteUrl).toString())
  };
}
