import { BrandPortal } from '@/components/brand-portals';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Brand Portal',
  description: 'Protected client viewing portal for EMC Marketing brand materials.',
  path: '/brand-portal/',
  index: false
});

export default function Page() {
  return <BrandPortal />;
}
