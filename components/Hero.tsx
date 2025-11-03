'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Premium Quality,
              <span className="text-blue-600"> Exceptional Value</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover our curated collection of premium products designed to elevate your everyday experience.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/shop">
              <Button size="lg" className="text-base px-8 py-6 bg-blue-600 hover:bg-blue-700">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-base px-8 py-6">
              View Collections
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 pt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free Shipping Over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>2-Year Warranty</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-2xl">
            <img
              src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Premium Product Showcase"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Floating Cards */}
          <div className="absolute -left-4 top-1/4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-sm">24/7 Support</p>
                <p className="text-xs text-gray-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}