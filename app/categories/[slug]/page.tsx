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

  const products = (await getProducts({ category: category.slug })) as any[];
  const productsByName =
    products.length === 0
      ? ((await getProducts({ category: category.name })) as any[])
      : [];
  const finalProducts = products.length > 0 ? products : productsByName;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              All Categories
            </Link>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
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
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
                  {category.name}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {category.description ||
                    `Best digital products, guides, and courses in ${category.name}`}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {finalProducts.length} products
                  </span>
                  <span className="text-sm text-gray-500">
                    Instant Digital Access • 60-Day Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-10">
          <ProductGrid products={finalProducts} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
