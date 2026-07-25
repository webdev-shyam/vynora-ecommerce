'use client';
import FeaturedProducts from './FeaturedProducts';
import { mockProducts } from '@/lib/mockData';

export default function TrendingDeals() {
  const featured = mockProducts.filter(p => p.featured).slice(0,4);
  return <FeaturedProducts products={featured} />;
}
