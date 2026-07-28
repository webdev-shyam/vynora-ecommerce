"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
    rating: number;
    featured?: boolean;
    reviewsCount?: number;
  };
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-gray-200 dark:border-gray-800 hover:border-blue-200 bg-white dark:bg-gray-900">
      <div className="relative">
        <Link href={`/product/${product.slug}`}>
          <div className="relative aspect-4/3g-gray-100 dark:bg-gray-800 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge className="bg-gray-900 dark:bg-white text-white dark:text-black border-0 shadow-md">
              Bestseller
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <Badge
            variant="secondary"
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-800 dark:text-gray-200 shadow-sm"
          >
            {product.category}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge
            variant="outline"
            className="text-xs border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
          >
            {product.niche}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {product.rating}
            </span>
            {product.reviewsCount !== undefined && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.reviewsCount.toLocaleString()})
              </span>
            )}
          </div>
        </div>

        <Link href={`/product/${product.slug}`} className="group/title">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors min-h-12">
            {product.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 min-h-10">
          {product.description.split("\n")[0].slice(0, 120)}...
        </p>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                one-time
              </span>
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
              Instant Access
            </div>
          </div>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-100 text-white font-semibold shadow-md hover:shadow-lg transition-all group/btn">
              Get Product
              <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </a>
          <p className="text-[10px] text-center text-gray-400 dark:text-gray-500">
            Secure checkout via Digistore24 • Instant delivery
          </p>
        </div>
      </div>
    </Card>
  );
}
