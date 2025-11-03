import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-300 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  <img className='h-[5rem] w-[5rem]' src="assets/logo.svg" alt="foot-logo" />
                </span>
              </div>
              <span className="font-bold text-xl">PremiumStore</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted destination for premium quality products with exceptional customer service and unbeatable value.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">Shop All</a></li>
              <li><a href="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
              <li><a href="/deals" className="text-gray-400 hover:text-white transition-colors">Deals & Offers</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="/warranty" className="text-gray-400 hover:text-white transition-colors">Warranty</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Connected</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="space-y-3 mb-6">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1-800-PREMIUM</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@premiumstore.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Vynora Premium Store. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}