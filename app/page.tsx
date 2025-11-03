'use client';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import TrendingDeals from '@/components/TrendingDeals';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <TrendingDeals />
      <Footer />
    </div>
  );
}