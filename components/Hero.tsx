'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full py-12">
        {/* Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-100 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            #1 Digistore24 Affiliate Marketplace
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">NEW</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Premium Digital
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                Products That Sell
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Curated Digistore24 bestsellers in health, wealth, relationships & growth. 50-80% commissions, instant delivery, no inventory.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/shop">
              <Button size="lg" className="text-base px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 rounded-full group">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 rounded-full border-gray-300 hover:bg-white">
                View Niches
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - digital */}
          <div className="grid grid-cols-3 gap-6 pt-2 text-sm max-w-md mx-auto lg:mx-0">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Instant Access</div>
                <div className="text-xs text-gray-500">No shipping, 24/7</div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">High Converting</div>
                <div className="text-xs text-gray-500">Tested offers</div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">50-80% Comms</div>
                <div className="text-xs text-gray-500">Digistore24</div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image / Stats Card */}
        <div className="relative">
          <div className="relative aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl">
            <img
              src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Digital Product Marketplace"
              className="w-full h-full object-cover mix-blend-overlay opacity-80 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-blue-200 text-sm font-medium mb-1">TOTAL PRODUCTS</p>
                  <p className="text-4xl font-bold">12+ Premium</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-200">Starting from</p>
                  <p className="text-xl font-bold">$37 only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="absolute -left-6 top-[15%] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[200px] hidden lg:block animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">$</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Top Commission</p>
                <p className="text-xs text-gray-600">80% per sale - $797</p>
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="absolute -right-6 bottom-[20%] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hidden lg:block animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <div className="flex items-center gap-3">
              <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" className="w-10 h-10 rounded-full object-cover" alt="user" />
              <div>
                <p className="font-semibold text-sm text-gray-900">Sarah earned $1.2k</p>
                <p className="text-xs text-gray-500">from 3 sales today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
