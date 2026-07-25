'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-gray-900">Vynora</span>
              <span className="text-blue-600"> Digital</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Categories
            </Link>
            <Link href="/shop?featured=true" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Featured
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search digital products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </form>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-2">
            <Link href="/admin" className="hidden md:block">
              <Button variant="ghost" size="sm" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Admin
              </Button>
            </Link>

            <Link href="/shop" className="hidden md:block">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full px-6">
                Explore
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>

              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Home
              </Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
                All Products
              </Link>
              <Link href="/categories" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Categories
              </Link>
              <Link href="/shop?featured=true" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2">
                Featured Products
              </Link>
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium py-2 flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Admin Dashboard
              </Link>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  💡 All products are digital from Digistore24. Click "Get Product" to be redirected to the secure checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
