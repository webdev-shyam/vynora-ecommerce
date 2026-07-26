'use client';

import Link from 'next/link';
import { Star, BadgePercent, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ProductCardProps = {
  product: {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    price: number;
    category: string;
    niche: string;
    affiliateUrl: string;
    commission: number;
    rating: number;
    featured?: boolean;
    reviewsCount?: number;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-gray-200 hover:border-blue-200 bg-white">
      <div className="relative">
        <Link href={`/product/${product.slug}`}>
          <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-md">
              Featured
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 backdrop-blur text-gray-800 shadow-sm">
            {product.category}
          </Badge>
        </div>

      </div>

      
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-blue-50">
            {product.niche}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            {product.reviewsCount !== undefined && (
              <span className="text-xs text-gray-500">({product.reviewsCount.toLocaleString()})</span>
            )}
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="group/title">
          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover/title:text-blue-600 transition-colors min-h-[48px]">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[40px]">
          {product.description.split('\n')[0].slice(0, 120)}...
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">${product.price}</span>
              <span className="text-xs text-gray-500 ml-1">one-time</span>
            </div>
            <div className="text-xs text-gray-500">
              Digital Access
            </div>
          </div>

          <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all group/btn">
              Get Product
              <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </a>
          <p className="text-[10px] text-center text-gray-400">Redirects to Digistore24 secure checkout</p>
        </div>
      </div>
    </Card>
  );
}
