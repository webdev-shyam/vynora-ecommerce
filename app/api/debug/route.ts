import { NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return NextResponse.json({ error: 'No database connection' });
  }

  try {
    // Raw SQL: get ALL distinct category strings and their counts from products table
    const productCategoryStrings: any = await prisma.$queryRaw`
      SELECT category, COUNT(*) as count
      FROM products
      WHERE is_active = true
      GROUP BY category
      ORDER BY count DESC
    `;

    // Raw SQL: get all categories from categories table
    const categoriesTable: any = await prisma.$queryRaw`
      SELECT id, name, slug
      FROM categories
      ORDER BY name ASC
    `;

    // Raw SQL: count products linked by category_id FK per category
    const fkCounts: any = await prisma.$queryRaw`
      SELECT c.id, c.name, c.slug, COUNT(p.id) as fk_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.is_active = true
      GROUP BY c.id, c.name, c.slug
      ORDER BY c.name ASC
    `;

    // Sample products to see their actual data
    const samples: any = await prisma.$queryRaw`
      SELECT id, title, category, category_id
      FROM products
      WHERE is_active = true
      LIMIT 10
    `;

    return NextResponse.json({
      productCategoryStrings,
      categoriesTable,
      fkCounts,
      samples,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stack: e.stack?.slice(0, 500) }, { status: 500 });
  }
}
