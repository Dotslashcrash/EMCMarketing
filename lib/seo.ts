import type { Metadata } from 'next';
import { business, faqs, navItems, reviews, services, siteUrl, socials, videoFaqs, videos } from './site-data';

export function pageMeta({
  title,
  description,
  path = '/',
  keywords = []
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = new URL(path, siteUrl).toString();
  return {
    title,
    description,
    keywords,
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
  const videosUrl = new URL('/videos/', siteUrl).toString();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${videosUrl}#collection`,
        url: videosUrl,
        name: 'EMC Marketing Videos and Shorts',
        description:
          'EMC Social Club videos and Shorts from EMC Marketing covering social media strategy, paid content, brand identity, marketing mistakes, and content creation.',
        isPartOf: { '@id': `${siteUrl}/#website` },
        publisher: { '@id': `${siteUrl}/#organization` },
        mainEntity: { '@id': `${videosUrl}#videos` },
        about: [
          'social media marketing',
          'content strategy',
          'brand identity',
          'paid social content',
          'YouTube Shorts',
          'Fayetteville marketing agency'
        ]
      },
      {
        '@type': 'ItemList',
        '@id': `${videosUrl}#videos`,
        name: 'EMC Social Club Videos and Shorts',
        itemListElement: videos.map((video, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'VideoObject',
            '@id': `${videosUrl}#${video.videoId}`,
            name: video.title,
            description: `${video.description} Topic: ${video.title}.`,
            contentUrl: video.watchUrl,
            embedUrl: video.embedUrl,
            thumbnailUrl: video.thumbnail,
            genre: video.category === 'Shorts' ? 'YouTube Shorts' : 'Marketing education video',
            isFamilyFriendly: true,
            inLanguage: 'en-US',
            publisher: { '@id': `${siteUrl}/#organization` }
          }
        }))
      }
    ]
  };
}

export function videoFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${new URL('/videos/', siteUrl).toString()}#faq`,
    mainEntity: videoFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
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
      reviewBody: review.body,
      publisher: { '@type': 'Organization', name: 'Google' }
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
