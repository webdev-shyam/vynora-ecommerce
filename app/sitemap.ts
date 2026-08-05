import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.vynoramarket.me';
  const now = new Date();

  // ── Static routes with fine-grained priorities & frequencies ──────
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '',            priority: 1.0, changeFrequency: 'daily'   },
    { path: '/shop',       priority: 0.9, changeFrequency: 'daily'   },
    { path: '/categories', priority: 0.8, changeFrequency: 'weekly'  },
    { path: '/deals',      priority: 0.8, changeFrequency: 'daily'   },
    { path: '/about',      priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contact',    priority: 0.5, changeFrequency: 'monthly' },
    { path: '/faq',        priority: 0.4, changeFrequency: 'monthly' },
    { path: '/privacy',    priority: 0.3, changeFrequency: 'yearly'  },
    { path: '/terms',      priority: 0.3, changeFrequency: 'yearly'  },
    { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies',    priority: 0.3, changeFrequency: 'yearly'  },
    { path: '/refund',     priority: 0.3, changeFrequency: 'yearly'  },
    { path: '/refund-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cart',       priority: 0.6, changeFrequency: 'always'  },
    { path: '/checkout',   priority: 0.6, changeFrequency: 'always'  },
    { path: '/account',    priority: 0.5, changeFrequency: 'always'  },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // ── Dynamic product routes ────────────────────────────────────────
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = (await getProducts({ take: 500 })) as any[];
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(product.updatedAt || product.createdAt || now),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // graceful fallback if DB unavailable
  }

  // ── Dynamic category routes ───────────────────────────────────────
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = (await getCategories()) as any[];
    categoryRoutes = categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    }));
  } catch {
    // graceful fallback if DB unavailable
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}
