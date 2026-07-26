"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type IconProps = {
  className?: string;
};

const ArrowRightIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const SparklesIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    <path d="M19 15l.5 2.5L22 18l-2.5.5L19 21l-.5-2.5L16 18l2.5-.5L19 15z" />
    <path d="M5 15l.5 2.5L8 18l-2.5.5L5 21l-.5-2.5L2 18l2.5-.5L5 15z" />
  </svg>
);

const ShieldCheckIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const ZapIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

const StarIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full py-12">
        {/* Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-100 text-sm font-medium text-blue-700">
            <SparklesIcon className="h-4 w-4" />
            <span>Discover Top Digital Downloads</span>
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-bold">
              VERIFIED
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Premium Digital{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block sm:inline">
                Products &amp; Masterclasses
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
              Explore curated e-books, online courses, software tools, and guides across Health, Finance, Business, and Personal Growth. Instant delivery to your inbox.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/shop">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 rounded-full group"
              >
                Browse Catalog
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full border-gray-300 hover:bg-white"
              >
                View Categories
              </Button>
            </Link>
          </div>

          {/* Trust Indicators - customer facing */}
          <div className="grid grid-cols-3 gap-6 pt-2 text-sm max-w-md mx-auto lg:mx-0">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Instant Delivery</div>
                <div className="text-xs text-gray-500">24/7 Digital Access</div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <ZapIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Verified Quality</div>
                <div className="text-xs text-gray-500">100% Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <ShieldCheckIcon className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">60-Day Guarantee</div>
                <div className="text-xs text-gray-500">Risk-Free Purchases</div>
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
                  <p className="text-blue-200 text-sm font-medium mb-1">
                    CURATED MARKETPLACE
                  </p>
                  <p className="text-3xl font-bold">12+ Premium Digital Assets</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-200">Starting from</p>
                  <p className="text-xl font-bold">$37</p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="absolute -left-6 top-[15%] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 max-w-[210px] hidden lg:block animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                <StarIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  Top Rated
                </p>
                <p className="text-xs text-gray-600">4.9/5 Average Rating</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[95%] bg-amber-400 rounded-full"></div>
            </div>
          </div>

          <div className="absolute -right-6 bottom-[20%] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 hidden lg:block animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <div className="flex items-center gap-3">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                className="w-10 h-10 rounded-full object-cover"
                alt="Verified Customer"
              />
              <div className="text-xs">
                <p className="font-bold text-gray-900">Verified Buyer</p>
                <p className="text-gray-500">&quot;Instant download worked great!&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
