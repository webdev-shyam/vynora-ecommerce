import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ShieldCheck,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="font-bold text-white text-sm">V</span>
              </div>
              <span className="font-bold text-xl">Vynora Digital</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed"></p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Instant digital delivery</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Marketplace</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Categories / Niches
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?featured=true"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Featured Products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?sort=commission"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Highest Commission
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get notified for Vynora Digital Marketplace updates and new
              product launches.
            </p>
            <div className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600"
              />
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg">
                Subscribe
              </Button>
            </div>

            <div className="flex space-x-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-900 h-9 w-9"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 Vynora Digital Marketplace | All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
