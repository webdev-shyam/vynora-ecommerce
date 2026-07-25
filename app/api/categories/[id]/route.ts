import { NextRequest, NextResponse } from 'next/server';
import { categorySchema } from '@/lib/validations';
import { getPrismaClient } from '@/lib/prisma';

const hasDb = !!process.env.DATABASE_URL;

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    const data = parsed.data;
    const prisma = getPrismaClient();

    if (!hasDb || !prisma) return NextResponse.json({ id: params.id, ...data, updatedAt: new Date() });

    const updated = await prisma.category.update({
      where: { id: params.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image || null,
      },
    });
    return NextResponse.json(updated);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const prisma = getPrismaClient();
  if (!hasDb || !prisma) return NextResponse.json({ message: 'mock delete' });
  try {
    await prisma.category.delete({ where: { id: params.id } });
    return NextResponse.json({ message: 'deleted' });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
