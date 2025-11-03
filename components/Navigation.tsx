"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = 3; // This would come from your cart state

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          
          <Link href="/" className="flex items-center space-x-2">
            
            <div className="h-[100px] w-[100px]rounded-lg flex items-center justify-between gap-5">
              
              <img className="h-[8rem] w-[8rem]" src="/assets/logo.svg" alt="logo" />
             
            </div>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/categories"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Deals
            </Link>
          </div>
          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Mobile Links */}
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Deals
              </Link>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Link
                  href="/account"
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </Link>
                <Link
                  href="/account"
                  className="flex items-center space-x-2 text-gray-700"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center space-x-2 text-gray-700 relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
