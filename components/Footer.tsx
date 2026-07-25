import { Facebook, Twitter, Instagram, Youtube, Mail, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Premium Digistore24 affiliate marketplace. We curate only high-converting digital products with 50-80% commissions. No inventory, no shipping — just link & earn.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>All products from Digistore24</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Instant digital delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <span>50-80% affiliate commission</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Marketplace</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white transition-colors">Categories / Niches</Link></li>
              <li><Link href="/shop?featured=true" className="text-gray-400 hover:text-white transition-colors">Featured Products</Link></li>
              <li><Link href="/shop?sort=commission" className="text-gray-400 hover:text-white transition-colors">Highest Commission</Link></li>
              <li><Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Affiliate Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-gray-400">How it works: Click "Get Product" → redirected to Digistore24 secure checkout</li>
              <li className="text-gray-400">We earn commission if you buy via our link</li>
              <li className="text-gray-400">All products are digital - no shipping needed</li>
              <li><a href="https://www.digistore24.com" target="_blank" className="text-blue-400 hover:text-blue-300">About Digistore24 ↗</a></li>
              <li className="text-xs text-gray-500 pt-2">Disclosure: Affiliate links present. We may earn commission.</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get notified about new high-converting Digistore24 products
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
                <Button key={i} variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-900 h-9 w-9">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Vynora Digital Marketplace. All rights reserved. Built for Digistore24 affiliates.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <span>Digital Products Only</span>
              <span>•</span>
              <span>No Cart / No Checkout (Affiliate Redirect)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
