import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Info } from 'lucide-react';
import Footer from '@/components/Footer';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div className="pt-20">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <Card className="p-10 bg-white shadow-sm border border-gray-200">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Info className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">Direct Digital Purchase</h1>
            <p className="text-gray-600 mb-2">Vynora Digital features direct instant download purchasing.</p>
            <p className="text-gray-600 mb-8">No cart setup required! Click &quot;Get Product&quot; on any item to go directly to the vendor&apos;s official secure checkout for instant digital access.</p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 text-left text-sm">
              <h4 className="font-semibold text-blue-900 mb-2">How it works:</h4>
              <ol className="list-decimal list-inside space-y-2 text-blue-800">
                <li>Browse curated digital products and courses</li>
                <li>Click &quot;Get Product&quot; button on any item</li>
                <li>Proceed to the official 256-bit SSL secure checkout</li>
                <li>Complete payment &amp; receive instant download access</li>
                <li>Enjoy 60-day money-back guarantee &amp; vendor support</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto font-semibold">
                  Browse Catalog
                </Button>
              </Link>
              <Link href="/faq">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                  Read FAQ &amp; Support
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
