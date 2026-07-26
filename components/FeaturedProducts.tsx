"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ProductCard from "./ProductCard";

type Props = {
  products: any[];
};

export default function FeaturedProducts({ products }: Props) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-semibold mb-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              HOT CONVERTING NOW
            </div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Featured Digital Products
            </h2>
            <p className="text-lg text-gray-600 mt-2 max-w-xl">
              Discover our hand pick useful digital products that are currently
              trending.
            </p>
          </div>
          <Link href="/shop?featured=true">
            <Button variant="outline" size="lg" className="rounded-full">
              View All Featured
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA Banner */}
        <Card className="mt-16 overflow-hidden border-0 shadow-xl">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Join Vynora Digital Marketplace Today
              </h3>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">//</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto w-full">
                <div className="text-sm text-blue-100">
                  🔒 Secure • ⚡ Instant Access • 💸Affordable Price
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
