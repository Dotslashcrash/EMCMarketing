import { JsonLd } from '@/components/json-ld';
import { HomePage } from '@/components/sections';
import { breadcrumbSchema, pageAnswers, pageMeta, servicesSchema, webPageSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'EMC Marketing | Fayetteville Marketing Agency With a Pulse',
  description:
    'Bold Fayetteville marketing agency for social media, paid ads, content, websites, SEO, AEO, and conversion-focused strategy.',
  path: '/',
  keywords: [
    'Fayetteville social media marketing',
    'Northwest Arkansas marketing agency',
    'marketing strategy consultation',
    'content marketing Fayetteville',
    'small business marketing Arkansas'
  ]
});

export default function Page() {
  return (
    <>
      <HomePage />
      <JsonLd data={webPageSchema({ path: '/', name: 'EMC Marketing', description: metadata.description as string, questions: pageAnswers.home })} />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />
    </>
  );
}
