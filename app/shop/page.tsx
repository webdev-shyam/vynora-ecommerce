import { getProducts, getCategories } from '@/lib/queries';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ShopClient from './ShopClient';

type SearchParams = {
  q?: string;
  category?: string;
  niche?: string;
  featured?: string;
  sort?: string;
};

export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const { q, category, niche, featured, sort } = searchParams;

  const filters: any = {
    q,
    category,
    niche,
    featured: featured === 'true' ? true : undefined,
    sort: sort as any,
  };

  const [products, categories] = await Promise.all([
    getProducts(filters),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {q ? `Search: "${q}"` : category ? `${category} Products` : featured ? 'Featured Products' : 'All Digital Products'}
                </h1>
                <p className="text-gray-600 mt-2">
                  {products.length} premium Digistore24 products found
                  {q && ` • Search for "${q}"`}
                </p>
                {(q || category || niche || featured) && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {q && <Badge variant="secondary" className="gap-1">Query: {q} <Link href="/shop" className="ml-1">✕</Link></Badge>}
                    {category && <Badge variant="secondary">Category: {category}</Badge>}
                    {niche && <Badge variant="secondary">Niche: {niche}</Badge>}
                    {featured && <Badge className="bg-blue-600">Featured Only</Badge>}
                    <Link href="/shop" className="text-xs text-blue-600 hover:underline">Clear filters</Link>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <form className="hidden">
                  {/* Sort handled client side */}
                </form>
              </div>
            </div>
          </div>

          <ShopClient 
            initialProducts={products as any[]} 
            categories={categories as any[]} 
            initialQuery={q || ''}
            initialCategory={category || ''}
            initialSort={sort || 'newest'}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
