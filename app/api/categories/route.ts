import { NextRequest, NextResponse } from 'next/server';
import { mockCategories } from '@/lib/mockData';
import { categorySchema } from '@/lib/validations';
import { getPrismaClient } from '@/lib/prisma';

const hasDb = !!process.env.DATABASE_URL;

export async function GET() {
  const prisma = getPrismaClient();
  if (!hasDb || !prisma) return NextResponse.json(mockCategories);
  try {
    const categories = await prisma.category.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { products: true } } } });
    return NextResponse.json(categories);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const data = parsed.data;
    const prisma = getPrismaClient();

    if (!hasDb || !prisma) {
      return NextResponse.json({ id: `cat_${Date.now()}`, ...data, createdAt: new Date(), updatedAt: new Date() }, { status: 201 });
    }

    const existing = await prisma.category.findFirst({ where: { OR: [{ slug: data.slug }, { name: data.name }] } });
    if (existing) return NextResponse.json({ error: 'Category exists' }, { status: 409 });

    const category = await prisma.category.create({ data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image || null,
    }});

    return NextResponse.json(category, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
