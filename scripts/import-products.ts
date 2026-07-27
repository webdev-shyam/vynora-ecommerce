import { PrismaClient } from "@prisma/client";
import { bulkProducts } from "../lib/bulkProducts";
const prisma = new PrismaClient();
async function main() {
  console.log(`Importing ${bulkProducts.length}...`);
  const clear = process.argv.includes("--clear");
  if (clear) {
    console.log("Clearing old products...");
    await prisma.product.deleteMany({});
  }
  let created = 0,
    skipped = 0;
  for (const p of bulkProducts) {
    const exists = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (exists) {
      console.log(`Skipping (exists): ${p.slug}`);
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
        commission: p.commission,
        rating: p.rating,
        featured: p.featured,
        tags: p.tags,
      },
    });
    console.log(`Created: ${p.title}`);
    created++;
  }
  console.log(`Done! Created ${created}, Skipped ${skipped}`);
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
