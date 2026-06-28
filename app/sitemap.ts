import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/about/', '/services/', '/results-reviews/', '/videos/', '/contact/'];
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8
  }));
}
