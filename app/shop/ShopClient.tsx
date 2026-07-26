'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';

type Props = {
  initialProducts: any[];
  categories: any[];
  initialQuery: string;
  initialCategory: string;
  initialSort: string;
};

const niches = ['Health', 'Finance', 'Marketing', 'Business', 'Relationship', 'Spirituality', 'Fitness', 'Education', 'Wealth', 'Nutrition'];

export default function ShopClient({ initialProducts, categories, initialQuery, initialCategory, initialSort }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState(initialQuery);

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    router.push(`/shop?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams('q', query);
  };

  const handleSort = (value: string) => {
    updateParams('sort', value);
  };

  const handleCategory = (catSlug: string, catName: string) => {
    const current = searchParams.get('category');
    if (current === catSlug || current === catName) {
      updateParams('category', '');
    } else {
      updateParams('category', catSlug);
    }
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search digital products, niches, titles..."
              className="pl-10 bg-white"
            />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Search</Button>
        </form>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-white" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
          <select
            value={initialSort === 'commission' ? 'rating' : initialSort}
            onChange={(e) => handleSort(e.target.value)}
            className="h-10 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div className="bg-white p-5 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="md:hidden">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat: any) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategory(cat.slug, cat.name)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          (searchParams.get('category') === cat.slug || searchParams.get('category') === cat.name) ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs text-gray-400">{cat._count?.products ?? ''}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Niches</h4>
                  <div className="flex flex-wrap gap-2">
                    {niches.map((niche) => (
                      <Badge
                        key={niche}
                        variant={searchParams.get('niche') === niche ? 'default' : 'outline'}
                        className={`cursor-pointer ${searchParams.get('niche') === niche ? 'bg-blue-600' : ''}`}
                        onClick={() => {
                          const current = searchParams.get('niche');
                          updateParams('niche', current === niche ? '' : niche);
                        }}
                      >
                        {niche}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Quick Filters</h4>
                  <div className="space-y-2">
                    <Link href="/shop?featured=true" className="block text-sm text-blue-600 hover:underline">🔥 Featured products</Link>
                    <Link href="/shop?sort=rating" className="block text-sm text-blue-600 hover:underline">⭐ Top rated</Link>
                    <Link href="/shop" className="block text-sm text-gray-500 hover:text-gray-700">Clear all filters</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div className="flex-1">
          <ProductGrid products={initialProducts} />
        </div>
      </div>
    </div>
  );
}
