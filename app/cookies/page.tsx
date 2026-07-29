import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { ArrowLeft, Cookie, Shield, CheckCircle, Settings, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | Vynora Digital Marketplace',
  description: 'Understand how Vynora Digital uses cookies and tracking technologies.',
};

export default function CookiePolicyPage() {
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
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <Cookie className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Cookie Policy</h1>
                <p className="text-sm text-gray-500">Last updated: July 26, 2026</p>
              </div>
            </div>

            <div className="prose prose-amber max-w-none text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                This Cookie Policy explains how <strong>Vynora Digital Marketplace</strong> uses cookies and similar tracking technologies when you visit our website at <span className="text-amber-600">vynoramarket.me</span>.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-600" />
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files placed on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, enhance user experience, and provide analytical insights to site operators.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-amber-600" />
                2. Types of Cookies We Use
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-1">Essential Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Necessary for core website navigation, security, and rendering product catalog pages smoothly.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-1">Performance & Analytics</h3>
                  <p className="text-sm text-gray-600">
                    Help us understand how visitors interact with our marketplace (e.g. popular categories, search terms).
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-1">Functional Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Remember your filter choices, recent search terms, and display preferences across sessions.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-1">Partner Referral Cookies</h3>
                  <p className="text-sm text-gray-600">
                    Used when redirecting to official checkout portals (Digistore24) to ensure proper order processing.
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Settings className="h-5 w-5 text-amber-600" />
                3. How to Manage Cookies
              </h2>
              <p>
                You can control and manage cookies in your browser settings. Most web browsers allow you to block or delete cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
                <li><strong>Mozilla Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Block all cookies</li>
                <li><strong>Microsoft Edge:</strong> Settings &gt; Site permissions &gt; Cookies and site data</li>
              </ul>
              <p className="text-sm text-gray-500">
                Please note that disabling cookies may affect website functionality, such as saved search filters or seamless redirect to partner checkout pages.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Mail className="h-5 w-5 text-amber-600" />
                4. Questions About Cookies?
              </h2>
              <p>
                If you have questions about our use of cookies or privacy practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
                <p className="font-semibold text-gray-900">Vynora Digital Support</p>
                <p>Email: <a href="mailto:support@vynoramarket.me" className="text-amber-600 hover:underline">support@vynoramarket.me</a></p>
                <p>Contact Page: <Link href="/contact" className="text-amber-600 hover:underline">vynoramarket.me/contact</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
