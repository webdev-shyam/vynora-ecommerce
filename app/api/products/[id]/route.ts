import { NextRequest, NextResponse } from 'next/server';
import { productSchema } from '@/lib/validations';
import { getPrismaClient } from '@/lib/prisma';

const hasDb = !!process.env.DATABASE_URL;

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const prisma = getPrismaClient();
  if (!hasDb || !prisma) {
    return NextResponse.json({ error: 'DB not configured, using mock mode' }, { status: 200 });
  }
  try {
    const product = await prisma.product.findUnique({ where: { id: params.id }, include: { Category: true } });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const data = parsed.data;
    const prisma = getPrismaClient();

    if (!hasDb || !prisma) {
      return NextResponse.json({ id: params.id, ...data, updatedAt: new Date() });
    }

    const product = await prisma.product.update({
      where: { id: params.id },
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

    return NextResponse.json(product);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const prisma = getPrismaClient();
  if (!hasDb || !prisma) {
    return NextResponse.json({ message: 'Mock delete success' });
  }
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'Deleted' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
