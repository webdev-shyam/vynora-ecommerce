import { mockProducts, mockCategories } from "./mockData";
import { getPrismaClient } from "./prisma";

const hasDatabase = !!process.env.DATABASE_URL;

// ── DB helpers ──────────────────────────────────────────────────────
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

      const cats = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { products: true } } },
      });

      // Count products that match by category string but aren't FK-linked
      // This handles legacy data where categoryId is null
      const enrichedCats = await Promise.all(
        cats.map(async (cat) => {
          // Count products where category string matches AND categoryId is NOT this category
          // (includes null categoryId and other categoryIds)
          const stringMatchCount = await prisma.product.count({
            where: {
              isActive: true,
              category: { equals: cat.name, mode: "insensitive" },
              OR: [
                { categoryId: null },
                { categoryId: { not: cat.id } },
              ],
            },
          });
          return {
            ...cat,
            _count: {
              products: cat._count.products + stringMatchCount,
            },
          };
        })
      );

      return enrichedCats;
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

    // Category filter — match by categoryId FK OR category string name
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
        // Match products linked by FK OR by category string matching the category name
        const catOrConditions: any[] = [
          { categoryId: matchingCat.id },
          { category: { equals: matchingCat.name, mode: "insensitive" } },
        ];
        where.OR = where.OR ? [...where.OR, ...catOrConditions] : catOrConditions;
      } else {
        // No matching category record — try contains on the category string directly
        where.category = { contains: category, mode: "insensitive" };
      }
    }

    if (niche) {
      where.niche = { contains: niche, mode: "insensitive" };
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

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

  if (dbProducts.length > 0 || hasDatabase) {
    // Enrich products with proper category name from Category relation
    return dbProducts.map((p: any) => ({
      ...p,
      category: p.Category?.name || p.category,
    }));
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
  const product = await tryDb(
    async () => {
      const prisma = getPrismaClient();
      if (!prisma) throw new Error("No prisma");
      const p = await prisma.product.findUnique({
        where: { slug },
        include: { Category: true },
      });
      if (!p) throw new Error("Product not found");
      return p;
    },
    mockProducts.find((p) => p.slug === slug) as any,
  );

  if (product && (product as any).Category) {
    return {
      ...product,
      category: (product as any).Category?.name || product.category,
    };
  }
  return product;
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

    const matchingCat = await prisma.category.findFirst({
      where: {
        OR: [
          { name: { equals: category, mode: "insensitive" } },
          { slug: { equals: category, mode: "insensitive" } },
        ],
      },
      select: { id: true, name: true },
    });

    const where: any = {
      isActive: true,
      slug: { not: currentSlug },
    };

    if (matchingCat) {
      where.OR = [
        { categoryId: matchingCat.id },
        { category: { equals: matchingCat.name, mode: "insensitive" } },
      ];
    } else {
      where.category = { contains: category, mode: "insensitive" };
    }

    return prisma.product.findMany({
      where,
      take,
      orderBy: { rating: "desc" },
      include: { Category: true },
    });
  });

  if (products.length > 0 || hasDatabase) {
    return products.map((p: any) => ({
      ...p,
      category: p.Category?.name || p.category,
    }));
  }

  return mockProducts
    .filter((p) => p.slug !== currentSlug && p.category === category)
    .slice(0, take) as any;
}

export async function searchProducts(query: string) {
  return getProducts({ q: query, take: 50 });
}
