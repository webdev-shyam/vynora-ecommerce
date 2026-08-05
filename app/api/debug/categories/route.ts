import { NextResponse } from 'next/server';
import { getPrismaClient } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const prisma = getPrismaClient();
  if (!prisma) {
    return NextResponse.json({ error: 'No database connection' });
  }

  try {
    // 1. Get all categories with FK-linked product count
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    });

    // 2. Get distinct category strings from products
    const categoryStrings = await prisma.product.findMany({
      where: { isActive: true },
      select: { category: true, categoryId: true },
      distinct: ['category'],
    });

    // 3. Get a sample of products to see their category values
    const sampleProducts = await prisma.product.findMany({
      where: { isActive: true },
      take: 5,
      select: {
        id: true,
        title: true,
        category: true,
        categoryId: true,
      },
    });

    // 4. Count products per category string
    const categoryCounts = await prisma.$queryRaw`
      SELECT category, COUNT(*) as count
      FROM products
      WHERE is_active = true
      GROUP BY category
      ORDER BY count DESC
    `;

    // 5. Check how many products have null categoryId
    const nullCategoryIdCount = await prisma.product.count({
      where: { isActive: true, categoryId: null },
    });

    const totalProducts = await prisma.product.count({
      where: { isActive: true },
    });

    return NextResponse.json({
      categories: categories.map(c => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        fkProductCount: c._count.products,
      })),
      categoryStringsFromProducts: categoryStrings,
      sampleProducts,
      categoryCounts,
      nullCategoryIdCount,
      totalProducts,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
