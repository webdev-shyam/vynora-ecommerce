import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import { getFeaturedProducts, getCategories } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(8),
    getCategories(),
  ]);

  // Transform categories for display component
  const categoriesForDisplay = (categories as any[]).map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    count: c._count?.products ?? 0,
  }));

  return (
    <div className="min-h-screen">
      <Hero />
      <Categories categories={categoriesForDisplay} />
      <FeaturedProducts products={featuredProducts as any[]} />
      <Footer />
    </div>
  );
}
