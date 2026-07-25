import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts, getProducts } from '@/lib/queries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, ExternalLink, ShieldCheck, Zap, TrendingUp, ArrowLeft, BadgePercent } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

type Props = {
  params: { slug: string };
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const products = await getProducts({ take: 100 });
    return products.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug) as any;
  if (!product) {
    return { title: 'Product not found' };
  }
  return {
    title: `${product.title} | Vynora Digital`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: [product.image],
      type: 'website',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = (await getProductBySlug(params.slug)) as any;

  if (!product) {
    notFound();
  }

  const related = (await getRelatedProducts(product.slug, product.category, 4)) as any[];

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img: string, i: number) => (
                    <div key={i} className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 flex-shrink-0">
                      <img src={img} alt={`${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <Card className="p-4 bg-blue-50 border-blue-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <ShieldCheck className="h-6 w-6 mx-auto mb-1 text-green-600" />
                    <div className="text-xs font-medium">Secure Checkout</div>
                    <div className="text-[11px] text-gray-500">Digistore24</div>
                  </div>
                  <div>
                    <Zap className="h-6 w-6 mx-auto mb-1 text-blue-600" />
                    <div className="text-xs font-medium">Instant Access</div>
                    <div className="text-[11px] text-gray-500">Digital Delivery</div>
                  </div>
                  <div>
                    <TrendingUp className="h-6 w-6 mx-auto mb-1 text-purple-600" />
                    <div className="text-xs font-medium">{product.commission}% Comm</div>
                    <div className="text-[11px] text-gray-500">Affiliate</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">{product.category}</Badge>
                  <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">{product.niche}</Badge>
                  {product.featured && <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600">Featured</Badge>}
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating} rating</span>
                  <span className="text-sm text-gray-500">• {product.reviewsCount?.toLocaleString() || '1,200+'} reviews</span>
                </div>
              </div>

              {/* Price & CTA */}
              <Card className="p-6 bg-gray-50 border-gray-200">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">One-time price</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through hidden">${(product.price * 1.5).toFixed(0)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Digital product • Lifetime access</div>
                  </div>
                  <Badge className="bg-green-600 hover:bg-green-700 gap-1">
                    <BadgePercent className="h-3.5 w-3.5" />
                    {product.commission}% commission
                  </Badge>
                </div>

                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer nofollow" className="block">
                  <Button size="lg" className="w-full h-14 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 rounded-xl">
                    Get Product – ${product.price}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <p className="text-[11px] text-center text-gray-500 mt-3">
                  You will be redirected to Digistore24 secure checkout. Instant digital delivery after payment. 60-day money-back guarantee by vendor.
                </p>

                <div className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    No shipping required
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Instant download
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Secure payment via Digistore24
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Vendor support included
                  </div>
                </div>
              </Card>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">About this product</h3>
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related */}
          {related && related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p: any) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
