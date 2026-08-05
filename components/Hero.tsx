"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, Clock } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-16 overflow-hidden transition-colors">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-100 dark:bg-gray-800 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full py-12">
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Premium Digital Products Store
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              Digital Products
              <span className="block text-gray-500 dark:text-gray-400">
                That Transform Your Life
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              Handpicked courses, guides & tools in health, wealth,
              relationships & growth. Instant access, secure payment, 60-day
              guarantee.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/shop">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-gray-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-100  shadow-lg rounded-full group"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full border-gray-300 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 hover:bg-white bg-white dark:bg-transparent"
              >
                Browse Categories
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-2 text-sm max-w-md mx-auto lg:mx-0">
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  Secure Payment
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Digistore24 checkout
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  Instant Access
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Download immediately
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  60-Day Guarantee
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Money-back
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 lg:aspect-square rounded-4xl overflow-hidden bg-gray-900 shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Digital Products"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium mb-1">
                    DIGITAL PRODUCTS
                  </p>
                  <p className="text-3xl font-bold">12+ Premium Guides</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-300">Starting from</p>
                  <p className="text-xl font-bold">$37</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-6 top-[15%] bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700 max-w-50 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-sm">
                  ★
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  4.8/5 Rating
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  From 20k+ customers
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-6 bottom-[20%] bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700 hidden lg:block">
            <div className="flex items-center gap-3">
              <Image
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
                className="w-10 h-10 rounded-full object-cover"
                alt="user"
                width={40}
                height={40}
              />
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  &ldquo;Life changing!&rdquo;
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sarah - verified buyer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
