import { AdminPortal } from '@/components/brand-portals';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Admin Brand Portal',
  description: 'Owner-only portal for uploading protected EMC Marketing brand material and generating one-time client access.',
  path: '/admin/',
  index: false
});

export default function Page() {
  return <AdminPortal />;
}
