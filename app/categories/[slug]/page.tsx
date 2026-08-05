import { getCategoryBySlug, getProducts, getCategories } from "@/lib/queries";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 3600; // Cache for 1 hour, serve from Vercel Edge
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = (await getCategories()) as any[];
  return categories.map((c: any) => ({ slug: c.slug }));
}

export default async function CategoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = (await getCategoryBySlug(params.slug)) as any;
  if (!category) notFound();

  // Try fetching by category name (matches Product.category string field)
  // Also try by slug as fallback (for categoryId-based matching)
  const [productsByName, productsBySlug] = await Promise.all([
    getProducts({ category: category.name }).catch(() => []),
    getProducts({ category: category.slug }).catch(() => []),
  ]);

  // Use whichever returns results; prefer name-based match
  const finalProducts =
    (productsByName as any[]).length > 0
      ? productsByName
      : productsBySlug;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              All Categories
            </Link>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
                <img
                  src={
                    category.image ||
                    "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg"
                  }
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                  {category.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                  {category.description ||
                    `Best digital products, guides, and courses in ${category.name}`}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                    {(finalProducts as any[]).length} products
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Instant Digital Access • 60-Day Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          {(finalProducts as any[]).length > 0 ? (
            <ProductGrid products={finalProducts} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                No products found in this category yet.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Browse all products →
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
