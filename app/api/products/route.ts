import { NextRequest, NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';
import { productSchema } from '@/lib/validations';
import { getPrismaClient } from '@/lib/prisma';

const hasDb = !!process.env.DATABASE_URL;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || undefined;

  const prisma = getPrismaClient();
  if (!hasDb || !prisma) {
    let filtered = [...mockProducts];
    if (q) {
      const l = q.toLowerCase();
      filtered = filtered.filter(p => p.title.toLowerCase().includes(l));
    }
    if (category) filtered = filtered.filter(p => p.category === category);
    return NextResponse.json(filtered);
  }

  try {
    const where: any = {};
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }
    if (category) where.category = category;

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { Category: true },
    });
    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const prisma = getPrismaClient();

    if (!hasDb || !prisma) {
      const newProd = { id: `prod_${Date.now()}`, ...data, createdAt: new Date(), updatedAt: new Date() };
      return NextResponse.json(newProd, { status: 201 });
    }

    const slugExists = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (slugExists) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const product = await prisma.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        image: data.image,
        price: data.price,
        category: data.category,
        categoryId: data.categoryId || null,
        niche: data.niche,
        affiliateUrl: data.affiliateUrl,
        commission: data.commission,
        rating: data.rating,
        featured: data.featured,
        tags: data.tags || [],
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
