'use client';
import { useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import { products } from '@/data/products';
import { ChevronDown } from 'lucide-react';

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    
    switch (value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted = products;
    }
    
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
            <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 shrink-0">
              <ProductFilters 
                products={products} 
                onFilter={setFilteredProducts} 
              />
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}