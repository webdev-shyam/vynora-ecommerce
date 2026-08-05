/**
 * One-time script to link products to categories in the database.
 * 
 * This script:
 * 1. Finds all categories in the DB
 * 2. For each product with a `category` string that matches a category name,
 *    sets the `categoryId` FK to link them properly
 * 3. Reports what was matched and what wasn't
 * 
 * Run: npx tsx scripts/link-categories.ts
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔗 Linking products to categories...\n');

  // 1. Get all categories
  const categories = await prisma.category.findMany();
  console.log(`Found ${categories.length} categories:`);
  categories.forEach((c: any) => console.log(`  - ${c.name} (${c.slug}) [id: ${c.id}]`));
  console.log();

  // 2. Get all products
  const products = await prisma.product.findMany({
    select: { id: true, title: true, category: true, categoryId: true },
  });
  console.log(`Found ${products.length} products\n`);

  // 3. Build a map of lowercase category name → category record
  const catMap = new Map<string, any>();
  for (const cat of categories) {
    catMap.set(cat.name.toLowerCase(), cat);
    // Also map by slug
    catMap.set(cat.slug.toLowerCase(), cat);
  }

  // 4. For each product, try to find a matching category
  let linked = 0;
  let alreadyLinked = 0;
  let unmatched = 0;
  const unmatchedStrings = new Set<string>();

  for (const product of products) {
    // Already linked
    if (product.categoryId) {
      alreadyLinked++;
      continue;
    }

    // Try exact match (case-insensitive)
    const cat = catMap.get(product.category.toLowerCase());
    if (cat) {
      await prisma.product.update({
        where: { id: product.id },
        data: { categoryId: cat.id },
      });
      linked++;
      console.log(`  ✅ "${product.title}" → ${cat.name}`);
    } else {
      // Try contains match
      const partialMatch = categories.find((c: any) =>
        product.category.toLowerCase().includes(c.name.toLowerCase()) ||
        c.name.toLowerCase().includes(product.category.toLowerCase())
      );

      if (partialMatch) {
        await prisma.product.update({
          where: { id: product.id },
          data: { categoryId: partialMatch.id },
        });
        linked++;
        console.log(`  ✅ "${product.title}" → ${partialMatch.name} (partial match: "${product.category}")`);
      } else {
        unmatched++;
        unmatchedStrings.add(product.category);
        console.log(`  ❌ "${product.title}" — no match for "${product.category}"`);
      }
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`  Already linked: ${alreadyLinked}`);
  console.log(`  Newly linked:   ${linked}`);
  console.log(`  Unmatched:      ${unmatched}`);
  if (unmatchedStrings.size > 0) {
    console.log(`\n  Unmatched category strings:`);
    for (const s of unmatchedStrings) {
      console.log(`    - "${s}"`);
      // Create a new category for this
      const slug = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const newCat = await prisma.category.upsert({
        where: { slug },
        create: {
          name: s,
          slug,
          description: `Digital products in ${s}`,
        },
        update: {},
      });
      // Link products with this category string to the new category
      const updated = await prisma.product.updateMany({
        where: { category: { equals: s, mode: 'insensitive' }, categoryId: null },
        data: { categoryId: newCat.id },
      });
      console.log(`    → Created/found category "${s}" (${slug}), linked ${updated.count} products`);
    }
  }

  // 5. Final count
  const finalCategories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  });
  console.log(`\n📋 Final category product counts:`);
  for (const cat of finalCategories) {
    console.log(`  ${cat.name}: ${cat._count.products} products`);
  }

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
