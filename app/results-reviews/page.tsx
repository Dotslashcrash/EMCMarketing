import { JsonLd } from '@/components/json-ld';
import { ResultsReviewsPageContent } from '@/components/sections';
import { breadcrumbSchema, faqPageSchema, pageAnswers, pageMeta, reviewSchemaIfVerified, webPageSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Results, Reviews & Marketing Budget Tiers',
  description:
    'Read EMC Marketing reviews and compare startup, small business, medium business, and enterprise marketing budget tiers with estimated tactics and cost analysis.',
  path: '/results-reviews/',
  keywords: [
    'marketing budget tiers',
    'small business marketing budget',
    'startup marketing cost',
    'enterprise marketing budget',
    'marketing cost analysis',
    'EMC Marketing reviews'
  ]
});

export default function ResultsReviewsPage() {
  return (
    <>
      <ResultsReviewsPageContent />
      <JsonLd data={webPageSchema({ path: '/results-reviews/', name: 'Results, Reviews & Marketing Budget Tiers', description: metadata.description as string, questions: pageAnswers.results })} />
      <JsonLd data={faqPageSchema(pageAnswers.results, '/results-reviews/')} />
      <JsonLd data={reviewSchemaIfVerified()} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Results & Reviews', path: '/results-reviews/' }])} />
    </>
  );
}
