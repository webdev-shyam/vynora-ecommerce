import { getCategories, getProducts } from '@/lib/queries';
import { mockCategories, mockProducts } from '@/lib/mockData';
import CategoriesComponent from '@/components/Categories';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

// Fallback: General E-Commerce category for when Supabase is empty
const generalECommerceCategory = {
  id: 'cat_general_ecommerce',
  name: 'General E-Commerce',
  slug: 'general-ecommerce',
  description: 'Popular digital products, tools, and courses across all niches',
  image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600',
};

export default async function CategoriesPage() {
  let categories = await getCategories() as any[];

  // Fallback to mock categories if DB returns empty
  if (!categories || categories.length === 0) {
    categories = mockCategories.map((c) => ({
      ...c,
      _count: {
        products: mockProducts.filter((p) => p.categoryId === c.id).length,
      },
    })) as any[];
  }

  // Collect distinct product categories from mock data that aren't already represented
  const dbCategoryNames = new Set(categories.map((c: any) => c.name.toLowerCase()));
  const distinctMockCategories = mockProducts
    .filter((p) => !dbCategoryNames.has(p.category.toLowerCase()))
    .reduce((acc, p) => {
      if (!acc.find((c) => c.name.toLowerCase() === p.category.toLowerCase())) {
        const mockCat = mockCategories.find(
          (mc) => mc.name.toLowerCase() === p.category.toLowerCase()
        );
        acc.push({
          id: mockCat?.id || `cat_mock_${p.category.toLowerCase().replace(/\s+/g, '_')}`,
          name: p.category,
          slug: mockCat?.slug || p.category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-'),
          description: mockCat?.description || `Digital products in ${p.category}`,
          image: mockCat?.image || 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600',
        });
      }
      return acc;
    }, [] as any[]);

  // Merge: add General E-Commerce + any distinct mock categories not already present
  const existingSlugs = new Set([...categories, ...distinctMockCategories].map((c: any) => c.slug));
  const extras: any[] = [];
  if (!existingSlugs.has(generalECommerceCategory.slug)) {
    extras.push(generalECommerceCategory);
  }
  for (const mc of distinctMockCategories) {
    if (!existingSlugs.has(mc.slug)) {
      extras.push(mc);
    }
  }

  const allCategories = [...categories, ...extras];

  // For each category, compute product count: merge DB count + mock count for accuracy
  const display = allCategories.map((c: any) => {
    const dbCount = c._count?.products ?? 0;
    const mockCount = mockProducts.filter(
      (p) =>
        p.category.toLowerCase() === c.name.toLowerCase() ||
        p.categoryId === c.id
    ).length;
    // Use the larger of the two counts (DB or mock) to ensure non-zero display
    const count = Math.max(dbCount, mockCount);
    return {
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      count,
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <CategoriesComponent categories={display} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Instant Digital Download Across All Categories</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">No inventory, no shipping waiting time. Click &quot;Get Product&quot; on any item to be redirected to the secure official checkout with instant digital delivery.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
