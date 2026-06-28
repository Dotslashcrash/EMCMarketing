import { JsonLd } from '@/components/json-ld';
import { ResultsReviewsPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta, reviewSchemaIfVerified } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Results & Google Reviews',
  description:
    'EMC Marketing reviews and proof page. Review schema is enabled only when verified Google review text is added.',
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
