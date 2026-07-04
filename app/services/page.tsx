import { JsonLd } from '@/components/json-ld';
import { ServicesPageContent } from '@/components/sections';
import { breadcrumbSchema, faqPageSchema, pageAnswers, pageMeta, servicesSchema, webPageSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Marketing Services in Fayetteville, AR',
  description:
    'Social media strategy, paid ads, brand identity, content production, websites, SEO, AEO, Google Business support, audits, and consultation from EMC Marketing.',
  path: '/services/',
  keywords: [
    'social media strategy Fayetteville',
    'paid ads management Arkansas',
    'SEO and AEO services',
    'Google Business Profile optimization',
    'brand identity marketing',
    'content production Northwest Arkansas'
  ]
});

export default function ServicesPage() {
  return (
    <>
      <ServicesPageContent />
      <JsonLd data={webPageSchema({ path: '/services/', name: 'Marketing Services in Fayetteville, AR', description: metadata.description as string, type: 'ServicePage', questions: pageAnswers.services })} />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={faqPageSchema(pageAnswers.services, '/services/')} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }])} />
    </>
  );
}
