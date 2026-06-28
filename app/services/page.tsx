import { JsonLd } from '@/components/json-ld';
import { ServicesPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta, servicesSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Marketing Services in Fayetteville, AR',
  description:
    'Social media strategy, paid ads, brand identity, content production, websites, SEO, AEO, Google Business support, audits, and consultation from EMC Marketing.',
  path: '/services/'
});

export default function ServicesPage() {
  return (
    <>
      <ServicesPageContent />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }])} />
    </>
  );
}
