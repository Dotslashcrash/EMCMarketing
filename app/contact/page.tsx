import { JsonLd } from '@/components/json-ld';
import { ContactPageContent } from '@/components/sections';
import { breadcrumbSchema, faqPageSchema, pageAnswers, pageMeta, webPageSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact EMC Marketing',
  description:
    'Contact EMC Marketing in Fayetteville, Arkansas. Email info@emcmarketing.co, call 479-445-3632, or book a marketing consultation.',
  path: '/contact/',
  keywords: ['contact EMC Marketing', 'book marketing consultation', 'Fayetteville marketing consultation', 'marketing audit call']
});

export default function ContactPage() {
  return (
    <>
      <ContactPageContent />
      <JsonLd data={webPageSchema({ path: '/contact/', name: 'Contact EMC Marketing', description: metadata.description as string, type: 'ContactPage', questions: pageAnswers.contact })} />
      <JsonLd data={faqPageSchema(pageAnswers.contact, '/contact/')} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }])} />
    </>
  );
}
