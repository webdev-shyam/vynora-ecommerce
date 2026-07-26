import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Zap,
  ShieldCheck,
  Headphones,
  FileText,
  HelpCircle,
  Mail,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="font-bold text-white text-base">V</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Vynora Digital</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Vynora Digital is your trusted destination for curated digital products, masterclasses, e-books, and software tools with instant delivery and secure checkout.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Instant Digital Download</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>60-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>

          {/* Quick Marketplace Links */}
          <div>
            <h3 className="font-semibold text-base text-gray-200 mb-4 tracking-wide uppercase text-xs">Marketplace</h3>
            <ul className="space-y-2.5 text-sm">
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
                  Categories &amp; Niches
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
                  href="/shop?sort=rating"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Top Rated Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Vynora
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & FAQ */}
          <div>
            <h3 className="font-semibold text-base text-gray-200 mb-4 tracking-wide uppercase text-xs">Customer Care</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center &amp; FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-base text-gray-200 mb-4 tracking-wide uppercase text-xs">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Subscribe to get notified about new digital releases, special discounts, and top course launches.
            </p>
            <div className="space-y-3 mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-600"
              />
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-medium">
                Subscribe
              </Button>
            </div>

            <div className="flex space-x-2">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-900 h-9 w-9 rounded-lg"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Vynora Digital Marketplace. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
              <span>•</span>
              <Link href="/refund" className="hover:text-white transition-colors">Refunds</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
