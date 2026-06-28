import { JsonLd } from '@/components/json-ld';
import { ContactPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact EMC Marketing',
  description:
    'Contact EMC Marketing in Fayetteville, Arkansas. Email info@emcmarketing.co, call 479-445-3632, or book a marketing consultation.',
  path: '/contact/'
});

export default function ContactPage() {
  return (
    <>
      <ContactPageContent />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])} />
    </>
  );
}
