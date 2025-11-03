'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';
import Link from 'next/link';

const trendingDeals = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    originalPrice: 299,
    salePrice: 199,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    rating: 4.8,
    reviews: 234,
    discount: 33,
    timeLeft: '2d 14h',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    originalPrice: 399,
    salePrice: 279,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    rating: 4.9,
    reviews: 456,
    discount: 30,
    timeLeft: '1d 8h',
  },
  {
    id: 3,
    name: 'Professional Camera Lens',
    originalPrice: 899,
    salePrice: 649,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    rating: 4.7,
    reviews: 189,
    discount: 28,
    timeLeft: '3d 2h',
  },
  {
    id: 4,
    name: 'Luxury Skincare Set',
    originalPrice: 199,
    salePrice: 149,
    image: 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg',
    rating: 4.6,
    reviews: 312,
    discount: 25,
    timeLeft: '5d 16h',
  },
];

export default function TrendingDeals() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trending Deals
            </h2>
            <p className="text-xl text-gray-600">
              Limited time offers on our most popular products
            </p>
          </div>
          <Link href="/deals">
            <Button variant="outline" size="lg">
              View All Deals
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingDeals.map((deal) => (
            <Card key={deal.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Discount Badge */}
                <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                  -{deal.discount}%
                </Badge>
                
                {/* Time Left Badge */}
                <div className="absolute top-3 right-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {deal.timeLeft}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {deal.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(deal.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({deal.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-gray-900">
                    ${deal.salePrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${deal.originalPrice}
                  </span>
                </div>

                <Button className="w-full" size="sm">
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Banner */}
        <Card className="mt-16 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-2">
              Don't Miss Out on These Amazing Deals!
            </h3>
            <p className="text-blue-100 mb-6">
              Sign up for our newsletter and be the first to know about new sales and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe Now
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}