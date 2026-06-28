import { JsonLd } from '@/components/json-ld';
import { AboutPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About EMC Marketing',
  description:
    'Meet EMC Marketing, a Fayetteville agency built by Elizabeth for brands that need clearer strategy, louder creative, and more human marketing.',
  path: '/about/'
});

export default function AboutPage() {
  return (
    <>
      <AboutPageContent />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }])} />
    </>
  );
}
