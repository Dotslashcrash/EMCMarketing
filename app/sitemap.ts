import type { MetadataRoute } from 'next';
import { publicPages, siteUrl } from '@/lib/site-data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPages.map((page) => ({
    url: new URL(page.href, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority
  }));
}
