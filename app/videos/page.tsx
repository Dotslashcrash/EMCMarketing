import { JsonLd } from '@/components/json-ld';
import { VideosPageContent } from '@/components/sections';
import { breadcrumbSchema, faqPageSchema, pageAnswers, pageMeta, videoFaqSchema, videoSchema, webPageSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'EMC Marketing Videos',
  description:
    'Subscribe to EMC Social Club for EMC Marketing videos, Shorts, and sharp marketing perspective from Elizabeth.',
  path: '/videos/',
  keywords: [
    'EMC Social Club',
    'EMC Marketing videos',
    'EMC Marketing Shorts',
    'Fayetteville marketing agency videos',
    'social media strategy videos',
    'paid social content',
    'brand marketing tips',
    'content strategy YouTube Shorts',
    'Elizabeth Renae marketing'
  ]
});

export default function VideosPage() {
  return (
    <>
      <VideosPageContent />
      <JsonLd data={webPageSchema({ path: '/videos/', name: 'EMC Marketing Videos', description: metadata.description as string, type: 'CollectionPage', questions: pageAnswers.videos })} />
      <JsonLd data={videoSchema()} />
      <JsonLd data={videoFaqSchema()} />
      <JsonLd data={faqPageSchema(pageAnswers.videos, '/videos/')} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Videos', path: '/videos/' }])} />
    </>
  );
}
