import { getPrismaClient } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function stringify(obj: any): string {
  return JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? Number(v) : v));
}

// Mapping from niche/tags/title keywords → category name
const NICHE_TO_CATEGORY: Record<string, string> = {
  health: 'Health & Fitness', fitness: 'Health & Fitness', nutrition: 'Health & Fitness',
  yoga: 'Health & Fitness', keto: 'Health & Fitness', weight: 'Health & Fitness',
  biohacking: 'Health & Fitness', diet: 'Health & Fitness', wellness: 'Health & Fitness',
  body: 'Health & Fitness',
  finance: 'Finance & Investing', investing: 'Finance & Investing', crypto: 'Finance & Investing',
  wealth: 'Finance & Investing', money: 'Finance & Investing', trading: 'Finance & Investing',
  bitcoin: 'Finance & Investing', stock: 'Finance & Investing',
  business: 'Business & Marketing', marketing: 'Business & Marketing', affiliate: 'Business & Marketing',
  agency: 'Business & Marketing', smma: 'Business & Marketing', ecommerce: 'Business & Marketing',
  sales: 'Business & Marketing', funnel: 'Business & Marketing', advertising: 'Business & Marketing',
  mindset: 'Mindset & Spirituality', spirituality: 'Mindset & Spirituality',
  manifestation: 'Mindset & Spirituality', meditation: 'Mindset & Spirituality',
  abundance: 'Mindset & Spirituality',
  relationship: 'Relationships', dating: 'Relationships', love: 'Relationships',
  men: 'Relationships', women: 'Relationships',
  education: 'Education & Skills', skills: 'Education & Skills', coding: 'Education & Skills',
  python: 'Education & Skills', ai: 'Education & Skills', chatgpt: 'Education & Skills',
  scrum: 'Education & Skills', course: 'Education & Skills', training: 'Education & Skills',
  plr: 'Education & Skills', expertise: 'Education & Skills', prompts: 'Education & Skills',
};

function classifyProduct(product: { title: string; niche: string; tags: string[]; category: string }): string | null {
  // Try niche first (most reliable)
  for (const [keyword, category] of Object.entries(NICHE_TO_CATEGORY)) {
    if (product.niche.toLowerCase().includes(keyword)) return category;
  }
  // Try tags
  for (const tag of product.tags) {
    for (const [keyword, category] of Object.entries(NICHE_TO_CATEGORY)) {
      if (tag.toLowerCase().includes(keyword)) return category;
    }
  }
  // Try title + niche combined
  const text = `${product.niche} ${product.title} ${product.tags.join(' ')}`.toLowerCase();
  for (const [keyword, category] of Object.entries(NICHE_TO_CATEGORY)) {
    if (text.includes(keyword)) return category;
  }
  return null;
}

export async function GET(request: Request) {
  const prisma = getPrismaClient();
  if (!prisma) {
    return new Response(stringify({ error: 'No database connection' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // If ?action=reclassify, do the reclassification
  const url = new URL(request.url);
  const action = url.searchParams.get('action');

  if (action === 'reclassify') {
    try {
      const products = await prisma.product.findMany({
        where: { category: 'General E-Commerce' },
        select: { id: true, title: true, niche: true, tags: true, category: true },
      });

      const categories = await prisma.category.findMany();
      const catMap = new Map<string, any>();
      for (const cat of categories) catMap.set(cat.name, cat);

      const results: any[] = [];
      const unmatched: string[] = [];

      for (const product of products) {
        const matchedCatName = classifyProduct(product);
        if (matchedCatName && catMap.has(matchedCatName)) {
          const cat = catMap.get(matchedCatName)!;
          await prisma.product.update({
            where: { id: product.id },
            data: { category: matchedCatName, categoryId: cat.id },
          });
          results.push({ title: product.title.slice(0, 50), newCat: matchedCatName });
        } else {
          unmatched.push(product.title.slice(0, 50));
        }
      }

      // Also link products with non-General category but null categoryId
      const unlinked = await prisma.product.findMany({
        where: { categoryId: null, NOT: { category: 'General E-Commerce' } },
        select: { id: true, category: true },
      });
      let linkedCount = 0;
      for (const p of unlinked) {
        const cat = categories.find((c: any) =>
          c.name.toLowerCase() === p.category.toLowerCase() ||
          p.category.toLowerCase().includes(c.name.toLowerCase())
        );
        if (cat) {
          await prisma.product.update({ where: { id: p.id }, data: { categoryId: cat.id } });
          linkedCount++;
        }
      }

      // Final counts
      const finalCounts = await prisma.$queryRaw`
        SELECT c.name, c.slug, COUNT(p.id) as count
        FROM categories c
        LEFT JOIN products p ON (p.category_id = c.id OR p.category ILIKE c.name) AND p.is_active = true
        GROUP BY c.name, c.slug
        ORDER BY c.name ASC
      `;

      return new Response(stringify({
        reclassified: results.length,
        unmatched: unmatched.length,
        unmatchedTitles: unmatched,
        linkedExisting: linkedCount,
        results,
        finalCounts,
      }), { headers: { 'Content-Type': 'application/json' } });
    } catch (e: any) {
      return new Response(stringify({ error: e.message }), {
        status: 500, headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Default: diagnostic info
  try {
    const productCategoryStrings = await prisma.$queryRaw`
      SELECT category, COUNT(*) as count FROM products WHERE is_active = true
      GROUP BY category ORDER BY count DESC
    `;
    const categoriesTable = await prisma.$queryRaw`
      SELECT id, name, slug FROM categories ORDER BY name ASC
    `;
    const samples = await prisma.$queryRaw`
      SELECT id, title, category, category_id, niche FROM products WHERE is_active = true LIMIT 10
    `;
    return new Response(stringify({ productCategoryStrings, categoriesTable, samples }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(stringify({ error: e.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' },
    });
  }
}
