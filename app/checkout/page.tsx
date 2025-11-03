'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Lock, Truck, RotateCcw, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);

  const steps = ['Shipping', 'Payment', 'Review'];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setOrderComplete(true);
      toast.success('Order placed successfully!');
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Complete!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. We'll send you a confirmation email shortly.</p>
          <Button className="w-full">Continue Shopping</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index + 1 <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="p-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Shipping Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" required />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" required />
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" required />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Review Order</h2>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Shipping Address</h3>
                        <p className="text-gray-600 text-sm">
                          John Doe<br />
                          123 Main St<br />
                          New York, NY 10001
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p className="text-gray-600 text-sm">**** **** **** 3456</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  <Button type="submit">
                    {currentStep === 3 ? 'Place Order' : 'Continue'}
                  </Button>
                </div>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Premium Headphones</p>
                    <p className="text-sm text-gray-500">Qty: 2</p>
                  </div>
                  <p className="font-semibold">$199.98</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">Smart Watch</p>
                    <p className="text-sm text-gray-500">Qty: 1</p>
                  </div>
                  <p className="font-semibold">$299.99</p>
                </div>
              </div>

              <Separator className="mb-4" />

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>$499.97</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>$40.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>$539.97</span>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="h-4 w-4 text-blue-600" />
                  <span>Secure Payment Processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-purple-600" />
                  <span>Free Shipping & Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw className="h-4 w-4 text-orange-600" />
                  <span>30-Day Return Policy</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}