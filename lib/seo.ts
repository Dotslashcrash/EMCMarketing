import type { Metadata } from 'next';
import { business, faqs, navItems, pageAnswers, publicPages, reviews, services, siteUrl, socials, videoFaqs, videos } from './site-data';

export function pageMeta({
  title,
  description,
  path = '/',
  keywords = [],
  index = true
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  index?: boolean;
}): Metadata {
  const url = new URL(path, siteUrl).toString();
  const image = '/images/emc-logo.svg';
  return {
    title,
    description,
    keywords: [
      'EMC Marketing',
      'Fayetteville marketing agency',
      'Northwest Arkansas marketing',
      'social media strategy',
      'paid ads',
      'SEO',
      'AEO',
      ...keywords
    ],
    applicationName: business.name,
    authors: [{ name: business.name, url: siteUrl }],
    creator: business.name,
    publisher: business.name,
    category: 'Marketing',
    alternates: { canonical: url },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1
      }
    },
    openGraph: {
      type: 'website',
      url,
      siteName: business.name,
      title,
      description,
      locale: 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt: 'EMC Marketing logo' }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

export function webPageSchema({
  path,
  name,
  description,
  type = 'WebPage',
  questions = []
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
  questions?: ReadonlyArray<{ q: string; a: string }>;
}) {
  const url = new URL(path, siteUrl).toString();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        publisher: { '@id': `${siteUrl}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/emc-logo.svg`
        },
        inLanguage: 'en-US',
        mainEntity: questions.length
          ? questions.map((question) => ({
              '@type': 'Question',
              name: question.q,
              acceptedAnswer: { '@type': 'Answer', text: question.a }
            }))
          : undefined
      }
    ]
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
        priceRange: '$$',
        knowsAbout: [
          'social media marketing',
          'paid advertising',
          'brand identity',
          'content production',
          'website design',
          'local SEO',
          'answer engine optimization',
          'Google Business Profile optimization',
          'marketing audits'
        ],
        slogan: business.tagline
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
  const servicesUrl = new URL('/services/', siteUrl).toString();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        '@id': `${servicesUrl}#offer-catalog`,
        name: 'EMC Marketing Services',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            '@id': `${servicesUrl}#${service.slug}`,
            name: service.title,
            description: service.body,
            provider: { '@id': `${siteUrl}/#organization` },
            areaServed: business.areaServed,
            serviceType: service.includes
          }
        }))
      },
      {
        '@type': 'ItemList',
        '@id': `${servicesUrl}#services`,
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': `${servicesUrl}#${service.slug}` }
        }))
      }
    ]
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

export function faqPageSchema(questions: ReadonlyArray<{ q: string; a: string }>, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${new URL(path, siteUrl).toString()}#faq`,
    mainEntity: questions.map((question) => ({
      '@type': 'Question',
      name: question.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: question.a
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

export function publicPageListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteUrl}/#public-pages`,
    itemListElement: publicPages.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.label,
      url: new URL(page.href, siteUrl).toString()
    }))
  };
}

export { pageAnswers };
