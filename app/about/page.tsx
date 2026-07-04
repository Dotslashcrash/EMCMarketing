import { JsonLd } from '@/components/json-ld';
import { AboutPageContent } from '@/components/sections';
import { breadcrumbSchema, pageAnswers, pageMeta, webPageSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About EMC Marketing',
  description:
    'Meet EMC Marketing, a Fayetteville agency built by Elizabeth for brands that need clearer strategy, louder creative, and more human marketing.',
  path: '/about/',
  keywords: ['Elizabeth EMC Marketing', 'Fayetteville marketing consultant', 'human marketing agency', 'brand strategy Fayetteville']
});

export default function AboutPage() {
  return (
    <>
      <AboutPageContent />
      <JsonLd data={webPageSchema({ path: '/about/', name: 'About EMC Marketing', description: metadata.description as string, type: 'AboutPage', questions: pageAnswers.about })} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])} />
    </>
  );
}
