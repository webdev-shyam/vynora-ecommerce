import { mockProducts, mockCategories } from "./mockData";
import { getPrismaClient } from "./prisma";

const hasDatabase = !!process.env.DATABASE_URL;

// ── DB helpers ──────────────────────────────────────────────────────
// Only use mock fallback when DB is completely unavailable or connection fails.
// NEVER fall back to mock just because a query returned 0 results.

async function tryDb<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase) return fallback;
  const prisma = getPrismaClient();
  if (!prisma) return fallback;
  try {
    return await fn();
  } catch (e) {
    console.warn("DB query failed, using mock fallback", e);
    return fallback;
  }
}

// Try DB but return empty array on failure (for list queries where 0 results is valid)
async function tryDbList<T>(fn: () => Promise<T[]>, fallback: T[] = []): Promise<T[]> {
  if (!hasDatabase) return fallback;
  const prisma = getPrismaClient();
  if (!prisma) return fallback;
  try {
    return await fn();
  } catch (e) {
    console.warn("DB query failed, returning empty list", e);
    return [];
  }
}

// ── Categories ──────────────────────────────────────────────────────

export async function getCategories() {
  return tryDb(
    async () => {
      const prisma = getPrismaClient();
      if (!prisma) throw new Error("No prisma");
      return prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { products: true } } },
      });
    },
    mockCategories.map((c) => ({
      ...c,
      _count: {
        products: mockProducts.filter((p) => p.categoryId === c.id).length,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as any,
  );
}

export async function getCategoryBySlug(slug: string) {
  return tryDb(
    async () => {
      const prisma = getPrismaClient();
      if (!prisma) throw new Error("No prisma");
      return prisma.category.findUnique({ where: { slug } });
    },
    mockCategories.find((c) => c.slug === slug) as any,
  );
}

// ── Products ────────────────────────────────────────────────────────

export type ProductFilters = {
  q?: string;
  category?: string;
  niche?: string;
  featured?: boolean;
  sort?: "newest" | "price-low" | "price-high" | "rating" | "commission";
  take?: number;
};

export async function getProducts(filters: ProductFilters = {}): Promise<any[]> {
  const { q, category, niche, featured, sort = "newest", take } = filters;

  // ── DB query ──────────────────────────────────────────────────────
  const dbProducts = await tryDbList(async () => {
    const prisma = getPrismaClient();
    if (!prisma) throw new Error("No prisma");

    const where: any = { isActive: true };

    // Text search
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { niche: { contains: q, mode: "insensitive" } },
        { category: { contains: q, mode: "insensitive" } },
        { tags: { hasSome: [q] } },
      ];
    }

    // Category filter — look up the category record to get both id and name,
    // then match products by categoryId (FK) OR category string field
    if (category) {
      const matchingCat = await prisma.category.findFirst({
        where: {
          OR: [
            { slug: { equals: category, mode: "insensitive" } },
            { name: { equals: category, mode: "insensitive" } },
          ],
        },
        select: { id: true, name: true },
      });

      if (matchingCat) {
        // Match by FK relation OR denormalized category name string
        const catConditions = [
          { categoryId: matchingCat.id },
          { category: { equals: matchingCat.name, mode: "insensitive" } },
          { category: { contains: matchingCat.name, mode: "insensitive" } },
        ];
        where.OR = where.OR ? [...where.OR, ...catConditions] : catConditions;
      } else {
        // No matching category record — try contains on the category string
        where.category = { contains: category, mode: "insensitive" };
      }
    }

    // Niche filter
    if (niche) {
      where.niche = { contains: niche, mode: "insensitive" };
    }

    // Featured filter
    if (featured !== undefined) {
      where.featured = featured;
    }

    // Sort
    let orderBy: any = { createdAt: "desc" };
    switch (sort) {
      case "price-low":  orderBy = { price: "asc" }; break;
      case "price-high": orderBy = { price: "desc" }; break;
      case "rating":     orderBy = { rating: "desc" }; break;
      case "commission": orderBy = { commission: "desc" }; break;
    }

    return prisma.product.findMany({
      where,
      orderBy,
      take: take || undefined,
      include: { Category: true },
    });
  });

  // If DB returned results, use them (even if empty array from a valid query)
  if (dbProducts.length > 0 || hasDatabase) {
    return dbProducts;
  }

  // ── Mock fallback (only when DB is unavailable) ───────────────────
  let filtered = [...mockProducts] as any[];

  if (q) {
    const lower = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.niche.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some((t: string) => t.toLowerCase().includes(lower)),
    );
  }
  if (category) {
    const catLower = category.toLowerCase();
    const mockCat = mockCategories.find(
      (c) => c.slug.toLowerCase() === catLower || c.name.toLowerCase() === catLower
    );
    const catName = mockCat?.name || category;
    filtered = filtered.filter(
      (p) =>
        p.category.toLowerCase() === catName.toLowerCase() ||
        p.categoryId === category ||
        mockCat?.id === p.categoryId,
    );
  }
  if (niche) {
    filtered = filtered.filter((p) =>
      p.niche.toLowerCase().includes(niche.toLowerCase()),
    );
  }
  if (featured !== undefined) {
    filtered = filtered.filter((p) => p.featured === featured);
  }

  switch (sort) {
    case "price-low":  filtered.sort((a, b) => a.price - b.price); break;
    case "price-high": filtered.sort((a, b) => b.price - a.price); break;
    case "rating":     filtered.sort((a, b) => b.rating - a.rating); break;
    case "commission": filtered.sort((a, b) => b.commission - a.commission); break;
    default:           filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  if (take) filtered = filtered.slice(0, take);
  return filtered;
}

export async function getProductBySlug(slug: string) {
  return tryDb(
    async () => {
      const prisma = getPrismaClient();
      if (!prisma) throw new Error("No prisma");
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { Category: true },
      });
      if (!product) throw new Error("Product not found");
      return product;
    },
    mockProducts.find((p) => p.slug === slug) as any,
  );
}

export async function getFeaturedProducts(take = 8) {
  return getProducts({ featured: true, take });
}

export async function getRelatedProducts(
  currentSlug: string,
  category: string,
  take = 4,
) {
  const products = await tryDbList(async () => {
    const prisma = getPrismaClient();
    if (!prisma) throw new Error("No prisma");
    return prisma.product.findMany({
      where: {
        isActive: true,
        slug: { not: currentSlug },
        category: { contains: category, mode: "insensitive" },
      },
      take,
      orderBy: { rating: "desc" },
    });
  });

  if (products.length > 0 || hasDatabase) return products;

  // Mock fallback
  return mockProducts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, take) as any;
}

export async function searchProducts(query: string) {
  return getProducts({ q: query, take: 50 });
}
