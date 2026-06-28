import { JsonLd } from '@/components/json-ld';
import { ResultsReviewsPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta, reviewSchemaIfVerified } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Results & Google Reviews',
  description:
    'Read verified EMC Marketing Google reviews and see how EMC approaches strategy, creative, content, and conversion.',
  path: '/results-reviews/'
});

export default function ResultsReviewsPage() {
  return (
    <>
      <ResultsReviewsPageContent />
      <JsonLd data={reviewSchemaIfVerified()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Results & Reviews', path: '/results-reviews/' }])} />
    </>
  );
}
