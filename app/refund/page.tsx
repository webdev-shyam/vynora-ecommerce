import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { ArrowLeft, RefreshCw, ShieldCheck, Clock, CheckCircle2, HelpCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy | Vynora Digital Marketplace',
  description: 'Understand the 60-day money-back guarantee and refund process for products on Vynora Digital.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Refund & Guarantee Policy</h1>
                <p className="text-sm text-gray-500">Last updated: July 26, 2026</p>
              </div>
            </div>

            <div className="prose prose-emerald max-w-none text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                At <strong>Vynora Digital Marketplace</strong>, customer satisfaction is our top priority. We partner with reputable digital vendors whose products are processed through secure checkout platforms such as <strong>Digistore24</strong>.
              </p>

              <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl">
                <div className="flex items-center gap-3 mb-2 text-emerald-800">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                  <h3 className="font-bold text-lg text-emerald-900">Standard 60-Day Money-Back Guarantee</h3>
                </div>
                <p className="text-sm text-emerald-800">
                  Most digital products featured on Vynora Digital come with a hassle-free <strong>60-day money-back guarantee</strong> provided directly by the vendor and enforced by Digistore24. If you are not satisfied with your digital product purchase, you can request a 100% full refund within 60 days of purchase.
                </p>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                1. How to Request a Refund
              </h2>
              <p>
                Since payments and order processing are managed by Digistore24, requesting a refund is fast and straightforward:
              </p>
              <ol className="list-decimal pl-6 space-y-3">
                <li>
                  <strong>Locate Your Order Confirmation Email:</strong> Search for the confirmation receipt email sent to you by Digistore24 upon purchase.
                </li>
                <li>
                  <strong>Click the Support/Order Link:</strong> Click the Digistore24 order support link provided at the bottom of your order confirmation receipt.
                </li>
                <li>
                  <strong>Submit Refund Request:</strong> On the Digistore24 order page, select &quot;Request Refund&quot; and state your reason.
                </li>
                <li>
                  <strong>Fast Processing:</strong> Digistore24 will process your refund back to your original payment method (Credit Card, PayPal, SEPA, etc.) within 2–5 business days.
                </li>
              </ol>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                2. Eligibility & Requirements
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The refund request must be submitted within the specified guarantee window (typically 60 days from purchase date).</li>
                <li>Refunds apply to the full purchase price of the digital product.</li>
                <li>Upon refund processing, access to the digital member portal, download keys, or course materials will be revoked.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-emerald-600" />
                3. Need Assistance?
              </h2>
              <p>
                If you encounter any difficulty requesting a refund or need help locating your Digistore24 order number, our support team is happy to assist you:
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
                <p className="font-semibold text-gray-900">Vynora Digital Customer Care</p>
                <p>Email: <a href="mailto:support@vynora.digital" className="text-emerald-600 hover:underline">support@vynora.digital</a></p>
                <p>Digistore24 Support Portal: <a href="https://www.digistore24.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">digistore24.com/support</a></p>
                <p>Contact Us Page: <Link href="/contact" className="text-emerald-600 hover:underline">vynora.digital/contact</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
