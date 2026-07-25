import { PrismaClient } from '@prisma/client';
import { mockCategories, mockProducts } from '../lib/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Seeding categories...');
  for (const cat of mockCategories) {
    await prisma.category.create({
      data: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
      },
    });
  }

  console.log('Seeding products...');
  for (const prod of mockProducts) {
    await prisma.product.create({
      data: {
        id: prod.id,
        title: prod.title,
        slug: prod.slug,
        description: prod.description,
        image: prod.image,
        images: prod.images,
        price: prod.price,
        category: prod.category,
        categoryId: prod.categoryId,
        niche: prod.niche,
        affiliateUrl: prod.affiliateUrl,
        commission: prod.commission,
        rating: prod.rating,
        reviewsCount: prod.reviewsCount,
        featured: prod.featured,
        tags: prod.tags,
      },
    });
  }

  console.log('Seeding completed!');
  console.log(`Created ${mockCategories.length} categories and ${mockProducts.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
