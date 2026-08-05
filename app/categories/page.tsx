import { getCategories, getProducts } from '@/lib/queries';
import CategoriesComponent from '@/components/Categories';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = (await getCategories()) as any[];

  // For each category, get accurate product count by querying with the category filter
  const display = await Promise.all(
    categories.map(async (c: any) => {
      // getCategories already includes enriched _count (FK + string match)
      const dbCount = c._count?.products ?? 0;
      return {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        image: c.image,
        count: dbCount,
      };
    })
  );

  // Only show categories that have products
  const categoriesWithProducts = display.filter((c) => c.count > 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {categoriesWithProducts.length > 0 ? (
          <CategoriesComponent categories={categoriesWithProducts} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No categories with products yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Browse all products →
            </Link>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Instant Digital Download Across All Categories</h3>
            <p className="text-indigo-100 max-w-2xl mx-auto">No inventory, no shipping waiting time. Click &quot;Get Product&quot; on any item to be redirected to the secure official checkout with instant digital delivery.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
