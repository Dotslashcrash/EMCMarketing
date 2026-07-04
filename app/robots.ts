import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-data';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/brand-portal/', '/brand-sample/']
      }
    ],
    sitemap: new URL('/sitemap.xml', siteUrl).toString()
  };
}
