'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Package, Heart, Settings, MapPin, CreditCard } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    {
      id: '#ORD-001',
      date: '2024-01-15',
      total: 299.99,
      status: 'Delivered',
      items: 3,
    },
    {
      id: '#ORD-002',
      date: '2024-01-10',
      total: 149.99,
      status: 'Shipped',
      items: 2,
    },
    {
      id: '#ORD-003',
      date: '2024-01-05',
      total: 89.99,
      status: 'Processing',
      items: 1,
    },
  ];

  const wishlistItems = [
    { id: 1, name: 'Premium Headphones', price: 199.99, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg' },
    { id: 2, name: 'Smart Watch', price: 299.99, image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg' },
    { id: 3, name: 'Wireless Speaker', price: 79.99, image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-6 mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl font-semibold">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600">john.doe@example.com</p>
              <p className="text-gray-500 text-sm">Member since January 2024</p>
            </div>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Account Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Order History</h2>
                <Badge variant="secondary">{orders.length} orders</Badge>
              </div>
              
              <div className="grid gap-4">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.id}</h3>
                          <p className="text-gray-600 text-sm">
                            {order.date} • {order.items} items
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${order.total}</p>
                        <Badge
                          variant={
                            order.status === 'Delivered'
                              ? 'default'
                              : order.status === 'Shipped'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Wishlist</h2>
                <Badge variant="secondary">{wishlistItems.length} items</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-lg font-bold text-gray-900 mt-2">${item.price}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">Add to Cart</Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Shipping Addresses</h2>
                <Button>Add New Address</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold">Home</h3>
                    <Badge>Default</Badge>
                  </div>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Work</h3>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>John Doe</p>
                    <p>456 Business Ave</p>
                    <p>New York, NY 10005</p>
                    <p>United States</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Payment Methods</h2>
                <Button>Add New Card</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-6 bg-blue-600 rounded"></div>
                    <div>
                      <h3 className="font-semibold">**** **** **** 1234</h3>
                      <p className="text-gray-600 text-sm">Expires 12/25</p>
                    </div>
                    <Badge className="ml-auto">Default</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-6 bg-red-600 rounded"></div>
                    <div>
                      <h3 className="font-semibold">**** **** **** 5678</h3>
                      <p className="text-gray-600 text-sm">Expires 08/26</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Delete</Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}