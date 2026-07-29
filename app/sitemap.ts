import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vynoramarket.me';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/shop',
    '/categories',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/cookies',
    '/refund',
    '/cart',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/shop' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = (await getProducts({ take: 100 })) as any[];
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));
  } catch {
    // fallback if error
  }

  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = (await getCategories()) as any[];
    categoryRoutes = categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch {
    // fallback if error
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
