import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/', '/api/auth/', '/cart', '/checkout', '/account'],
      },
    ],
    sitemap: 'https://www.vynoramarket.me/sitemap.xml',
    host: 'https://www.vynoramarket.me',
  };
}
