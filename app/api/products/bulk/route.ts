import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrismaClient } from "@/lib/prisma";
import { bulkProducts } from "@/lib/bulkProducts";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const prisma = getPrismaClient();
  if (!prisma)
    return NextResponse.json(
      { error: "DATABASE_URL not configured" },
      { status: 500 },
    );
  try {
    const body = await req.json().catch(() => ({}));
    const productsToImport =
      Array.isArray(body.products) && body.products.length > 0
        ? body.products
        : bulkProducts;
    const deleteExisting = body.deleteExisting === true;
    if (deleteExisting) await prisma.product.deleteMany({});
    let created = 0,
      skipped = 0;
    for (const p of productsToImport) {
      const exists = await prisma.product.findUnique({
        where: { slug: p.slug },
      });
      if (exists) {
        skipped++;
        continue;
      }
      await prisma.product.create({
        data: {
          title: p.title,
          slug: p.slug,
          description: p.description,
          image: p.image,
          price: p.price,
          category: p.category,
          niche: p.niche,
          affiliateUrl: p.affiliateUrl,
          commission: p.commission || 50,
          rating: p.rating || 4.5,
          featured: p.featured || false,
          tags: p.tags || [],
        },
      });
      created++;
    }
    return NextResponse.json({
      success: true,
      created,
      skipped,
      total: productsToImport.length,
      message: `Imported ${created}, skipped ${skipped}`,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
export async function GET() {
  return NextResponse.json({
    count: bulkProducts.length,
    products: bulkProducts.map((p) => ({ title: p.title, slug: p.slug })),
  });
}
