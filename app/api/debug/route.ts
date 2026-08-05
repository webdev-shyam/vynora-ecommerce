import { NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function stringify(obj: any): string {
  return JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? Number(v) : v));
}

// Mapping from niche/tags/title keywords → category name
const NICHE_TO_CATEGORY: Record<string, string> = {
  // Health
  health: 'Health & Fitness',
  fitness: 'Health & Fitness',
  nutrition: 'Health & Fitness',
  yoga: 'Health & Fitness',
  keto: 'Health & Fitness',
  weight: 'Health & Fitness',
  biohacking: 'Health & Fitness',
  diet: 'Health & Fitness',
  wellness: 'Health & Fitness',
  body: 'Health & Fitness',
  
  // Finance
  finance: 'Finance & Investing',
  investing: 'Finance & Investing',
  crypto: 'Finance & Investing',
  wealth: 'Finance & Investing',
  money: 'Finance & Investing',
  trading: 'Finance & Investing',
  bitcoin: 'Finance & Investing',
  stock: 'Finance & Investing',
  
  // Business
  business: 'Business & Marketing',
  marketing: 'Business & Marketing',
  affiliate: 'Business & Marketing',
  agency: 'Business & Marketing',
  smma: 'Business & Marketing',
  ecommerce: 'Business & Marketing',
  sales: 'Business & Marketing',
  funnel: 'Business & Marketing',
  
  // Mindset
  mindset: 'Mindset & Spirituality',
  spirituality: 'Mindset & Spirituality',
  manifestation: 'Mindset & Spirituality',
  meditation: 'Mindset & Spirituality',
  abundance: 'Mindset & Spirituality',
  law: 'Mindset & Spirituality',
  
  // Relationships
  relationship: 'Relationships',
  dating: 'Relationships',
  love: 'Relationships',
  text: 'Relationships',
  men: 'Relationships',
  women: 'Relationships',
  
  // Education
  education: 'Education & Skills',
  skills: 'Education & Skills',
  coding: 'Education & Skills',
  python: 'Education & Skills',
  ai: 'Education & Skills',
  chatgpt: 'Education & Skills',
  scrum: 'Education & Skills',
  course: 'Education & Skills',
  training: 'Education & Skills',
  plr: 'Education & Skills',
};

function classifyProduct(product: { title: string; niche: string; tags: string[]; category: string }): string | null {
  const text = `${product.niche} ${product.title} ${product.tags.join(' ')}`.toLowerCase();
  
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
  
  // Try title
  for (const [keyword, category] of Object.entries(NICHE_TO_CATEGORY)) {
    if (text.includes(keyword)) return category;
  }
  
  return null;
}

export async function POST() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return new Response(stringify({ error: 'No database connection' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 1. Get all products with "General E-Commerce" category
    const products = await prisma.product.findMany({
      where: { category: 'General E-Commerce' },
      select: { id: true, title: true, niche: true, tags: true, category: true },
    });

    // 2. Get all categories
    const categories = await prisma.category.findMany();
    const catMap = new Map<string, any>();
    for (const cat of categories) {
      catMap.set(cat.name, cat);
    }

    // 3. Classify and update each product
    const results: { title: string; oldCat: string; newCat: string; catId: string }[] = [];
    const unmatched: string[] = [];

    for (const product of products) {
      const matchedCatName = classifyProduct(product);
      
      if (matchedCatName && catMap.has(matchedCatName)) {
        const cat = catMap.get(matchedCatName)!;
        await prisma.product.update({
          where: { id: product.id },
          data: { 
            category: matchedCatName,
            categoryId: cat.id,
          },
        });
        results.push({
          title: product.title.slice(0, 60),
          oldCat: product.category,
          newCat: matchedCatName,
          catId: cat.id,
        });
      } else {
        unmatched.push(product.title);
        // Still link to a general category if exists
        // Keep as "General E-Commerce" but at least try to set categoryId
      }
    }

    // 4. Also update products that already have a non-"General E-Commerce" category string but null categoryId
    const unlinkedProducts = await prisma.product.findMany({
      where: { 
        categoryId: null, 
        NOT: { category: 'General E-Commerce' } 
      },
      select: { id: true, category: true },
    });

    let linkedCount = 0;
    for (const p of unlinkedProducts) {
      const cat = categories.find((c: any) => 
        c.name.toLowerCase() === p.category.toLowerCase() ||
        p.category.toLowerCase().includes(c.name.toLowerCase())
      );
      if (cat) {
        await prisma.product.update({
          where: { id: p.id },
          data: { categoryId: cat.id },
        });
        linkedCount++;
      }
    }

    // 5. Get final counts
    const finalCounts = await prisma.$queryRaw`
      SELECT c.name, c.slug, COUNT(p.id) as count
      FROM categories c
      LEFT JOIN products p ON (p.category_id = c.id OR p.category ILIKE c.name) AND p.is_active = true
      GROUP BY c.name, c.slug
      ORDER BY c.name ASC
    `;

    return new Response(stringify({
      totalProducts: products.length,
      reclassified: results.length,
      unmatched: unmatched.length,
      unmatchedTitles: unmatched.slice(0, 20),
      linkedExisting: linkedCount,
      results: results.slice(0, 30),
      finalCounts,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(stringify({ error: e.message, stack: e.stack?.slice(0, 500) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
