import { JsonLd } from '@/components/json-ld';
import { ResultsReviewsPageContent } from '@/components/sections';
import { breadcrumbSchema, pageMeta, reviewSchemaIfVerified } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Results, Reviews & Marketing Budget Tiers',
  description:
    'Read EMC Marketing reviews and compare startup, small business, medium business, and enterprise marketing budget tiers with estimated tactics and cost analysis.',
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
