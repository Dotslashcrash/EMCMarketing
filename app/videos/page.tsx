import { JsonLd } from '@/components/json-ld';
import { VideosPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta, videoSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'EMC Marketing Videos',
  description:
    'Subscribe to EMC Social Club for EMC Marketing videos, Shorts, and sharp marketing perspective from Elizabeth.',
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
