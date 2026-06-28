import { JsonLd } from '@/components/json-ld';
import { HomePage } from '@/components/sections';
import { breadcrumbSchema, pageMeta, servicesSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'EMC Marketing | Fayetteville Marketing Agency With a Pulse',
  description:
    'Bold Fayetteville marketing agency for social media, paid ads, content, websites, SEO, AEO, and conversion-focused strategy.',
  path: '/'
});

export default function Page() {
  return (
    <>
      <HomePage />
      <JsonLd data={servicesSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />
    </>
  );
}
