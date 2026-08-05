import Link from "next/link";
import { Home, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Floating broken link icon */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 animate-bounce">
                <Search className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              {/* Small question mark */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shadow-lg text-white font-bold text-sm">
                ?
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-base">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <p className="text-gray-400 dark:text-gray-500 mb-8 text-sm">
          It might have been removed, renamed, or the URL may be incorrect.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link href="/">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl px-6 shadow-lg shadow-indigo-500/25"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/shop">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto rounded-xl px-6 border-gray-300 dark:border-gray-700"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Helpful Links
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { href: "/shop", label: "All Products" },
              { href: "/categories", label: "Categories" },
              { href: "/faq", label: "FAQ" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
