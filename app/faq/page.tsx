import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, HelpCircle, Zap, ShieldCheck, RefreshCw, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Vynora Digital Marketplace',
  description: 'Find answers to common questions about digital downloads, checkout, refunds, and customer support.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700 mb-4">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about purchasing digital products, instant delivery, refunds, and support on Vynora Digital.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-sm space-y-8 mb-12">
            {/* Category 1: General & Delivery */}
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-lg mb-4 pb-2 border-b border-gray-100">
                <Zap className="h-5 w-5" />
                Product Delivery &amp; Access
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    How do I receive my digital product after purchase?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Delivery is 100% instant! Immediately after completing checkout on Digistore24, you will receive an automated email containing your download links, access key, or portal login instructions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    Are there any shipping costs or physical package deliveries?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    No! All products featured on Vynora Digital are 100% digital assets (e-books, video courses, software licenses, audio guides). There are zero shipping fees and no waiting for physical package delivery.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    What if I didn&apos;t receive the confirmation email?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Please check your email spam/junk folder. If you still cannot locate it within 10 minutes, contact our support team at <a href="mailto:support@vynoramarket.me" className="text-blue-600 hover:underline">support@vynoramarket.me</a> with your purchase details and we will resend your access links right away.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Category 2: Payments & Security */}
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg mb-4 pb-2 border-b border-gray-100">
                <ShieldCheck className="h-5 w-5" />
                Payments &amp; Checkout Security
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    What payment methods are accepted?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Checkout is powered by Digistore24, accepting major credit cards (Visa, MasterCard, American Express), PayPal, SEPA Direct Debit, Sofort, and Klarna depending on your region.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    Is my payment information secure?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Yes. All checkouts are encrypted using 256-bit SSL encryption provided by certified checkout partner Digistore24. Vynora Digital never sees or stores your credit card or financial details.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Category 3: Money-Back Guarantee & Refunds */}
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-lg mb-4 pb-2 border-b border-gray-100">
                <RefreshCw className="h-5 w-5" />
                Refunds &amp; Guarantee
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    What is the money-back guarantee policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Most digital products on Vynora come with a 60-day money-back guarantee. If you are unsatisfied for any reason within 60 days, you can request a 100% refund through Digistore24 or by contacting our support team.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left font-semibold text-gray-900">
                    How long does it take for a refund to process?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    Once a refund is approved by Digistore24, funds are returned to your original payment method within 2 to 5 business days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Need More Help Card */}
          <Card className="p-8 border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Still Have Questions?</h3>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              Our support team is ready to answer any questions about digital products, orders, or partner checkouts.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold rounded-full px-8">
                Contact Support Team
              </Button>
            </Link>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
