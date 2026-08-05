import { getPrismaClient } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// Custom replacer for BigInt
function stringify(obj: any): string {
  return JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? Number(v) : v));
}

export async function GET() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return new Response(stringify({ error: 'No database connection' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const productCategoryStrings = await prisma.$queryRaw`
      SELECT category, COUNT(*) as count
      FROM products
      WHERE is_active = true
      GROUP BY category
      ORDER BY count DESC
    `;

    const categoriesTable = await prisma.$queryRaw`
      SELECT id, name, slug
      FROM categories
      ORDER BY name ASC
    `;

    const fkCounts = await prisma.$queryRaw`
      SELECT c.id, c.name, c.slug, COUNT(p.id) as fk_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = true
      GROUP BY c.id, c.name, c.slug
      ORDER BY c.name ASC
    `;

    const samples = await prisma.$queryRaw`
      SELECT id, title, category, category_id
      FROM products
      WHERE is_active = true
      LIMIT 10
    `;

    return new Response(stringify({
      productCategoryStrings,
      categoriesTable,
      fkCounts,
      samples,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(stringify({ error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
