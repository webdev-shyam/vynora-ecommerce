'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';

interface CartItem {
  id: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, quantity: 2 },
    { id: 3, quantity: 1 },
    { id: 5, quantity: 1 },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getCartProducts = () => {
    return cartItems.map(cartItem => ({
      ...products.find(p => p.id === cartItem.id)!,
      quantity: cartItem.quantity,
    }));
  };

  const cartProducts = getCartProducts();
  const subtotal = cartProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  const suggestedProducts = products.filter(p => !cartItems.some(item => item.id === p.id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-8 w-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Badge variant="secondary">{cartItems.length} items</Badge>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <Link href="/shop">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal < 50 && (
                    <p className="text-sm text-gray-500">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700">
                    Proceed to Checkout
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestedProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">${product.price}</p>
                    <Button
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => setCartItems([...cartItems, { id: product.id, quantity: 1 }])}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}