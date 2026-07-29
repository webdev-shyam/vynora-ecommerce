import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { ArrowLeft, FileText, Scale, ExternalLink, AlertCircle, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Vynora Digital Marketplace',
  description: 'Read the Terms of Service governing your use of Vynora Digital Marketplace.',
};

export default function TermsPage() {
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
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Scale className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Terms of Service</h1>
                <p className="text-sm text-gray-500">Last updated: July 26, 2026</p>
              </div>
            </div>

            <div className="prose prose-indigo max-w-none text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                Welcome to <strong>Vynora Digital Marketplace</strong> (&quot;Vynora&quot;, &quot;we&quot;, &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website at <span className="text-indigo-600">vynoramarket.me</span> and all related services, content, and features.
              </p>

              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-sm text-indigo-900 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  By accessing or using Vynora Digital Marketplace, you agree to be bound by these Terms. If you do not agree to all of these Terms, please do not use our website.
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100">
                1. Digital Marketplace Overview
              </h2>
              <p>
                Vynora Digital Marketplace is an online promotional platform that features curated digital products, software tools, e-books, online courses, and guides across various categories (Health, Finance, Business, Relationships, and Personal Growth).
              </p>
              <p>
                When you click &quot;Get Product&quot; or purchase an item through Vynora, your transaction is processed on the secure payment gateway of official third-party checkout partners, primarily <strong>Digistore24 GmbH</strong>.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100">
                2. User Obligations & Conduct
              </h2>
              <p>When using Vynora Digital, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information when contacting us or subscribing to our updates.</li>
                <li>Use the marketplace solely for lawful personal or business purposes.</li>
                <li>Not attempt to disrupt, compromise, or gain unauthorized access to our servers or network.</li>
                <li>Not scrape, crawl, or harvest content from Vynora Digital without express written permission.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100">
                3. Intellectual Property Rights
              </h2>
              <p>
                All original content, branding, UI designs, graphics, and text on Vynora Digital are the property of Vynora Digital and are protected by applicable copyright, trademark, and intellectual property laws. Third-party product names, logos, and trademarks displayed remain the property of their respective vendor owners.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-indigo-600" />
                4. Third-Party Products & Disclaimers
              </h2>
              <p>
                Vynora Digital curates digital products offered by independent vendors. While we strive to feature high-quality products:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Product fulfillment, download delivery, and customer service for purchased products are provided by the respective product vendor and checkout processor (Digistore24).</li>
                <li>Results from digital courses or guides may vary by individual. Products do not constitute financial, medical, or legal advice.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100">
                5. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, Vynora Digital and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use or inability to use our website or products acquired through third-party vendors.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Mail className="h-5 w-5 text-indigo-600" />
                6. Contact Information
              </h2>
              <p>
                For any legal or terms inquiries, please reach out to:
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
                <p className="font-semibold text-gray-900">Vynora Digital Legal Department</p>
                <p>Email: <a href="mailto:contact@vynoramarket.me" className="text-indigo-600 hover:underline">contact@vynoramarket.me</a></p>
                <p>Website: <Link href="/contact" className="text-indigo-600 hover:underline">vynoramarket.me/contact</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
