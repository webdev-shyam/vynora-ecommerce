import { mockProducts, mockCategories } from "./mockData";
import { getPrismaClient } from "./prisma";

const hasDatabase = !!process.env.DATABASE_URL;

// Helper to check if DB is reachable
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

// Resolve a category slug (or name) to the actual category name for DB queries
function resolveCategoryName(categoryInput: string): string | null {
  // Check if it's a slug from mock data
  const mockCat = mockCategories.find(
    (c) =>
      c.slug.toLowerCase() === categoryInput.toLowerCase() ||
      c.name.toLowerCase() === categoryInput.toLowerCase()
  );
  return mockCat ? mockCat.name : categoryInput;
}

// Categories
export async function getCategories() {
  return tryDb(
    async () => {
      const prisma = getPrismaClient();
      if (!prisma) throw new Error("No prisma");
      const cats = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { products: true } } },
      });
      if (!cats || cats.length === 0) {
        throw new Error("Empty categories in Supabase DB, falling back to mock");
      }
      return cats;
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
      const cat = await prisma.category.findUnique({ where: { slug } });
      if (!cat) {
        throw new Error("Category not found in Supabase DB, falling back to mock");
      }
      return cat;
    },
    mockCategories.find((c) => c.slug === slug) as any,
  );
}

// Products
export type ProductFilters = {
  q?: string;
  category?: string;
  niche?: string;
  featured?: boolean;
  sort?: "newest" | "price-low" | "price-high" | "rating" | "commission";
  take?: number;
};

export async function getProducts(filters: ProductFilters = {}) {
  const { q, category, niche, featured, sort = "newest", take } = filters;

  // Resolve category: accept slug OR name, normalize for DB query
  const resolvedCategory = category ? resolveCategoryName(category) : null;

  return tryDb(
    async () => {
      const prisma = getPrismaClient();
      if (!prisma) throw new Error("No prisma");
      const where: any = { isActive: true };

      if (q) {
        where.OR = [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
          { niche: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
          { tags: { hasSome: [q] } },
        ];
      }

      if (resolvedCategory) {
        // Try both: match by categoryId (FK) OR by category name (denormalized string)
        const matchingCategory = await prisma.category.findFirst({
          where: {
            OR: [
              { slug: { equals: category, mode: "insensitive" } },
              { name: { equals: resolvedCategory, mode: "insensitive" } },
            ],
          },
          select: { id: true },
        });

        if (matchingCategory) {
          // Use categoryId relation for accurate matching
          where.OR = where.OR
            ? [
                ...where.OR,
                { categoryId: matchingCategory.id },
                { category: { contains: resolvedCategory, mode: "insensitive" } },
              ]
            : [
                { categoryId: matchingCategory.id },
                { category: { contains: resolvedCategory, mode: "insensitive" } },
              ];
          // Remove the simple where.category if we're using OR
        } else {
          // Fallback to name-based contains search
          where.category = { contains: resolvedCategory, mode: "insensitive" };
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
        case "price-low":
          orderBy = { price: "asc" };
          break;
        case "price-high":
          orderBy = { price: "desc" };
          break;
        case "rating":
          orderBy = { rating: "desc" };
          break;
        case "commission":
          orderBy = { commission: "desc" };
          break;
        case "newest":
        default:
          orderBy = { createdAt: "desc" };
      }

      const products = await prisma.product.findMany({
        where,
        orderBy,
        take: take || undefined,
        include: { Category: true },
      });
      if (!products || products.length === 0) {
        throw new Error("Empty products in Supabase DB, falling back to mock");
      }
      return products;
    },
    (() => {
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
        // Resolve slug to name for mock matching
        const catName = resolveCategoryName(category);
        filtered = filtered.filter(
          (p) =>
            p.category.toLowerCase() === (catName || category).toLowerCase() ||
            p.categoryId === category ||
            p.category.toLowerCase().includes(catLower) ||
            mockCategories.find((c) => c.slug === category)?.name ===
              p.category ||
            mockCategories
              .find((c) => c.slug.toLowerCase() === catLower)
              ?.name.toLowerCase() === p.category.toLowerCase(),
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
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "commission":
          filtered.sort((a, b) => b.commission - a.commission);
          break;
        default:
          filtered.sort(
            (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
          );
      }

      if (take) filtered = filtered.slice(0, take);

      return filtered;
    })(),
  );
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
      if (!product) {
        throw new Error("Product not found in Supabase DB, falling back to mock");
      }
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
  return tryDb(
    async () => {
      const prisma = getPrismaClient();
      if (!prisma) throw new Error("No prisma");
      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          slug: { not: currentSlug },
          category: { contains: category, mode: "insensitive" },
        },
        take,
        orderBy: { rating: "desc" },
      });
      if (!products || products.length === 0) {
        throw new Error("Empty related products in Supabase DB, falling back to mock");
      }
      return products;
    },
    mockProducts
      .filter((p) => p.slug !== currentSlug && p.category === category)
      .slice(0, take) as any,
  );
}

export async function searchProducts(query: string) {
  return getProducts({ q: query, take: 50 });
}
