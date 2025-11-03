'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';

interface ProductFiltersProps {
  products: Product[];
  onFilter: (filteredProducts: Product[]) => void;
}

export default function ProductFilters({ products, onFilter }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const categories = Array.from(new Set(products.map(p => p.category)));
  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Canon']; // Mock brands

  const applyFilters = () => {
    let filtered = products.filter(product => {
      const priceInRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      
      return priceInRange && categoryMatch;
    });

    onFilter(filtered);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    onFilter(products);
  };

  return (
    <Card className="p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={10}
              className="mb-3"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Brands</Label>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBrands([...selectedBrands, brand]);
                    } else {
                      setSelectedBrands(selectedBrands.filter(b => b !== brand));
                    }
                  }}
                />
                <Label htmlFor={brand} className="text-sm">
                  {brand}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}