import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingBag, ExternalLink, Info } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <Card className="p-10">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold mb-3">No Cart Needed</h1>
          <p className="text-gray-600 mb-2">Vynora Digital is a Digistore24 affiliate marketplace.</p>
          <p className="text-gray-600 mb-8">No shopping cart, no checkout, no shipping. Click "Get Product" on any product to be redirected directly to the official Digistore24 secure checkout for instant digital delivery.</p>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left text-sm">
            <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-800">
              <li>Browse digital products</li>
              <li>Click "Get Product" button</li>
              <li>Redirected to Digistore24 official checkout</li>
              <li>Pay securely & get instant access</li>
              <li>We earn commission, you get best products</li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
            <a href="https://www.digistore24.com" target="_blank">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                About Digistore24
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
