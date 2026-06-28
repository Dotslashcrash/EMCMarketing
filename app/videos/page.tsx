import { JsonLd } from '@/components/json-ld';
import { VideosPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta, videoSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'EMC Marketing Videos',
  description:
    'Watch EMC Marketing video content organized by tips, client wins, behind the scenes, and marketing education.',
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
