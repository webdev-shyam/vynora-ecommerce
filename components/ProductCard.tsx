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

const FALLBACK_IMAGE =
  "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&w=800";

function cleanImageUrl(input: string): string {
  if (!input) return FALLBACK_IMAGE;
  let s = String(input).trim();
  if (!s) return FALLBACK_IMAGE;

  // Markdown image ![alt](url)
  const imgMd = s.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  if (imgMd && imgMd[2]) s = imgMd[2].trim();
  else {
    // Markdown link [text](url)
    const md = s.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (md) {
      const paren = (md[2] || "").trim();
      const bracket = (md[1] || "").trim();
      if (paren.startsWith("http")) s = paren;
      else if (bracket.startsWith("http")) s = bracket;
      else s = paren || bracket;
    }
  }

  if (s.startsWith("(") && s.endsWith(")")) s = s.slice(1, -1).trim();

  // Strip tracking params ?wsr, ?aff_id
  try {
    const u = new URL(s);
    u.searchParams.delete("wsr");
    u.searchParams.delete("aff_id");
    s = u.toString();
  } catch {
    s = s.replace(/([?&])wsr=[^&]*/gi, "");
    s = s.replace(/([?&])aff_id=[^&]*/gi, "");
    s = s.replace(/\?&/g, "?").replace(/&&/g, "&").replace(/\?$/g, "").replace(/&$/g, "");
  }

  // Final http extraction if still messy
  if (!s.startsWith("http")) {
    const httpMatch = s.match(/https?:\/\/[^\s\]]+/);
    if (httpMatch) return httpMatch[0].replace(/\)$/, "").trim();
    return FALLBACK_IMAGE;
  }

  return s;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = cleanImageUrl(product.image);

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-gray-200 dark:border-gray-800 hover:border-blue-200 bg-white dark:bg-gray-900">
      <div className="relative">
        <Link href={`/product/${product.slug}`}>
          <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              unoptimized={false}
              onError={(e) => {
                // Fallback handled by next/image? we use static fallback above
              }}
            />
          </div>
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-2 max-w-[70%] z-10">
          {product.featured && (
            <Badge className="bg-gray-900 dark:bg-white text-white dark:text-black border-0 shadow-md text-[10px] max-w-full truncate">
              Bestseller
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3 max-w-[60%] z-10">
          <Badge
            variant="secondary"
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur text-gray-800 dark:text-gray-200 shadow-sm text-[10px] max-w-full truncate block"
          >
            {product.category}
          </Badge>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge
            variant="outline"
            className="text-[10px] border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 max-w-[55%] truncate"
          >
            {product.niche}
          </Badge>
          <div className="flex items-center gap-1 shrink-0">
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
