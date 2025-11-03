'use client';
import { useState } from 'react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, Shield, Truck, RotateCcw, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ProductClientPageProps {
  params: {
    id: string;
  };
}

export default function ProductClientPage({ params }: ProductClientPageProps) {
  const product = products.find(p => p.id === parseInt(params.id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return <div className="pt-20 min-h-screen flex items-center justify-center">Product not found</div>;
  }

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} x ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images - 70% width on desktop */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail images */}
              <div className="flex gap-2 overflow-x-auto">
                {[...Array(4)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.sale && <Badge className="bg-red-500">Sale</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">(127 reviews)</span>
              </div>
            </div>

            {/* Price & Add to Cart Block */}
            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3">
                <Truck className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <div className="text-xs font-medium">Free Shipping</div>
                <div className="text-xs text-gray-500">Orders over $50</div>
              </div>
              <div className="text-center p-3">
                <RotateCcw className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <div className="text-xs font-medium">Easy Returns</div>
                <div className="text-xs text-gray-500">30-day policy</div>
              </div>
              <div className="text-center p-3">
                <Shield className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <div className="text-xs font-medium">2 Year Warranty</div>
                <div className="text-xs text-gray-500">Full coverage</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  This premium product combines innovative design with exceptional functionality. 
                  Crafted from high-quality materials, it offers durability and style that exceeds expectations. 
                  Perfect for both everyday use and special occasions, this item represents the pinnacle of 
                  modern craftsmanship and attention to detail.
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Key Features:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Premium materials and construction</li>
                    <li>• Ergonomic design for comfort</li>
                    <li>• Easy to clean and maintain</li>
                    <li>• Backed by comprehensive warranty</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Write Review
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b pb-6 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-4 w-4 ${j < 5 - i ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="font-medium">Customer {i + 1}</span>
                        <span className="text-gray-500 text-sm">2 days ago</span>
                      </div>
                      <p className="text-gray-600">
                        Excellent quality and fast shipping. Exactly as described and works perfectly. 
                        Would definitely recommend to others!
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Free Standard Shipping</h4>
                    <p className="text-gray-600">Orders over $50 qualify for free standard shipping (5-7 business days)</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Express Shipping</h4>
                    <p className="text-gray-600">$9.99 for 2-3 business day delivery</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">International Shipping</h4>
                    <p className="text-gray-600">Available to most countries (10-15 business days)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}