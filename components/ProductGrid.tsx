'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="relative">
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <Link href={`/product/${product.id}`}>
                <Button size="sm" variant="secondary" className="backdrop-blur-sm bg-white/80">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </Link>
              <Button size="sm" variant="secondary" className="backdrop-blur-sm bg-white/80">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.sale && (
                <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
              )}
              {product.featured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>
          </div>

          <div className="p-4">
            <div className="mb-2">
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">(127)</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <Button className="w-full" size="sm">
              Add to Cart
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}