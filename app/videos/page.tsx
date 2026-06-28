import { JsonLd } from '@/components/json-ld';
import { VideosPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta, videoSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'EMC Marketing Videos',
  description:
    'Watch EMC Social Club YouTube videos and Shorts from EMC Marketing, separated by format for easy browsing.',
  path: '/videos/'
});

export default function VideosPage() {
  return (
    <>
      <VideosPageContent />
      <JsonLd data={videoSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Videos', path: '/videos/' }])} />
    </>
  );
}
