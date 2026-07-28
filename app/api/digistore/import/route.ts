import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrismaClient } from "@/lib/prisma";
import { getDigistoreProduct, createAffiliateBuyUrl } from "@/lib/digistore";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const prisma = getPrismaClient();
  if (!prisma)
    return NextResponse.json(
      { error: "DATABASE_URL not set" },
      { status: 500 },
    );

  try {
    const {
      productId,
      affiliateId = "ganeshyam_verma",
      customData,
    } = await req.json();

    if (!productId)
      return NextResponse.json(
        { error: "productId required, e.g. 540531" },
        { status: 400 },
      );

    // 1. Fetch product from Digistore24
    const dsProduct = await getDigistoreProduct(productId);

    // 2. Create buy URL with your aff ID
    const buyUrlData = await createAffiliateBuyUrl(productId, affiliateId);
    const affiliateUrl =
      typeof buyUrlData === "string"
        ? buyUrlData
        : buyUrlData.buy_url ||
          `https://www.checkout-ds24.com/product/${productId}?aff=${affiliateId}`;

    // 3. Map to your Product schema
    const title =
      customData?.title ||
      dsProduct.product_name ||
      dsProduct.name ||
      `Product ${productId}`;
    const slug = (
      customData?.slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    ).slice(0, 80);
    const price = parseFloat(
      customData?.price || dsProduct.product_price || dsProduct.price || "47",
    );
    const description =
      customData?.description ||
      dsProduct.product_description ||
      dsProduct.description ||
      `Premium digital product ${title} - instant delivery via Digistore24.`;
    const image =
      customData?.image ||
      dsProduct.product_image ||
      `https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800`;

    // Check if exists
    const exists = await prisma.product.findUnique({ where: { slug } });
    if (exists) {
      return NextResponse.json({
        success: false,
        message: `Slug ${slug} already exists`,
        existing: exists,
      });
    }

    const created = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        image,
        price,
        category: customData?.category || "Business & Marketing",
        niche: customData?.niche || "Digital Products",
        affiliateUrl,
        commission: customData?.commission || 50,
        rating: 4.8,
        featured: customData?.featured || false,
        tags: customData?.tags || [],
      },
    });

    return NextResponse.json({
      success: true,
      product: created,
      digistoreRaw: { dsProduct, buyUrl: affiliateUrl },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
