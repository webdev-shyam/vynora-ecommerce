import { mockProducts, mockCategories } from './mockData';
import { getPrismaClient } from './prisma';

const hasDatabase = !!process.env.DATABASE_URL;

// Helper to check if DB is reachable
async function tryDb<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase) return fallback;
  const prisma = getPrismaClient();
  if (!prisma) return fallback;
  try {
    return await fn();
  } catch (e) {
    console.warn('DB query failed, using mock fallback', e);
    return fallback;
  }
}

// Categories
export async function getCategories() {
  return tryDb(async () => {
    const prisma = getPrismaClient();
    if (!prisma) throw new Error('No prisma');
    const cats = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    });
    return cats;
  }, mockCategories.map(c => ({
    ...c,
    _count: { products: mockProducts.filter(p => p.categoryId === c.id).length },
    createdAt: new Date(),
    updatedAt: new Date(),
  })) as any);
}

export async function getCategoryBySlug(slug: string) {
  return tryDb(async () => {
    const prisma = getPrismaClient();
    if (!prisma) throw new Error('No prisma');
    return await prisma.category.findUnique({ where: { slug } });
  }, mockCategories.find(c => c.slug === slug) as any);
}

// Products
export type ProductFilters = {
  q?: string;
  category?: string;
  niche?: string;
  featured?: boolean;
  sort?: 'newest' | 'price-low' | 'price-high' | 'rating' | 'commission';
  take?: number;
};

export async function getProducts(filters: ProductFilters = {}) {
  const { q, category, niche, featured, sort = 'newest', take } = filters;

  return tryDb(async () => {
    const prisma = getPrismaClient();
    if (!prisma) throw new Error('No prisma');
    const where: any = { isActive: true };

    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { niche: { contains: q, mode: 'insensitive' } },
        { category: { contains: q, mode: 'insensitive' } },
        { tags: { hasSome: [q] } },
      ];
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (niche) {
      where.niche = { contains: niche, mode: 'insensitive' };
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    let orderBy: any = { createdAt: 'desc' };
    switch (sort) {
      case 'price-low':
        orderBy = { price: 'asc' };
        break;
      case 'price-high':
        orderBy = { price: 'desc' };
        break;
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'commission':
        orderBy = { commission: 'desc' };
        break;
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: take || undefined,
      include: { Category: true },
    });

    return products;
  }, (() => {
    let filtered = [...mockProducts] as any[];

    if (q) {
      const lower = q.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.niche.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some((t: string) => t.toLowerCase().includes(lower))
      );
    }
    if (category) {
      const catLower = category.toLowerCase();
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes(catLower) || 
        p.categoryId === category || 
        mockCategories.find(c => c.slug === category)?.name === p.category ||
        mockCategories.find(c => c.slug.toLowerCase() === catLower)?.name.toLowerCase() === p.category.toLowerCase()
      );
    }
    if (niche) {
      filtered = filtered.filter(p => p.niche.toLowerCase().includes(niche.toLowerCase()));
    }
    if (featured !== undefined) {
      filtered = filtered.filter(p => p.featured === featured);
    }

    switch (sort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'commission':
        filtered.sort((a, b) => b.commission - a.commission);
        break;
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    if (take) filtered = filtered.slice(0, take);

    return filtered;
  })());
}

export async function getProductBySlug(slug: string) {
  return tryDb(async () => {
    const prisma = getPrismaClient();
    if (!prisma) throw new Error('No prisma');
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { Category: true },
    });
    return product;
  }, mockProducts.find(p => p.slug === slug) as any);
}

export async function getFeaturedProducts(take = 8) {
  return getProducts({ featured: true, take });
}

export async function getRelatedProducts(currentSlug: string, category: string, take = 4) {
  return tryDb(async () => {
    const prisma = getPrismaClient();
    if (!prisma) throw new Error('No prisma');
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        slug: { not: currentSlug },
        category: { contains: category, mode: 'insensitive' },
      },
      take,
      orderBy: { rating: 'desc' },
    });
    return products;
  }, mockProducts.filter(p => p.slug !== currentSlug && p.category === category).slice(0, take) as any);
}

export async function searchProducts(query: string) {
  return getProducts({ q: query, take: 50 });
}
