import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vynora Digital Marketplace',
  description: 'Learn how Vynora Digital collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
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
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
                <p className="text-sm text-gray-500">Last updated: July 26, 2026</p>
              </div>
            </div>

            <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                At <strong>Vynora Digital Marketplace</strong> (&quot;Vynora&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <span className="text-blue-600">vynoramarket.me</span>.
              </p>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-900 flex items-start gap-3">
                <Lock className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Key Summary:</strong> Vynora Digital curates digital products and links directly to official vendor payment processors (such as Digistore24). We do not collect or store your payment card details, credit card numbers, or passwords on our servers.
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                1. Information We Collect
              </h2>
              <p>
                We may collect information about you in a variety of ways when you interact with our marketplace:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Device & Usage Data:</strong> IP address, browser type, operating system, referring URLs, pages viewed, time spent on pages, and standard web log data.
                </li>
                <li>
                  <strong>Contact Information:</strong> If you voluntarily subscribe to our newsletter or reach out via our contact form, we collect your name and email address.
                </li>
                <li>
                  <strong>Cookies & Tracking Technologies:</strong> We use essential session cookies, preference cookies, and analytics cookies to optimize your browsing experience and measure site performance.
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                2. How We Use Your Information
              </h2>
              <p>We use the collected information for purposes including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing, maintaining, and improving the Vynora Digital Marketplace.</li>
                <li>Analyzing website analytics and user engagement trends.</li>
                <li>Responding to user inquiries and support requests.</li>
                <li>Sending periodic newsletters and promotional product updates (only if you have opted in).</li>
                <li>Preventing fraudulent activity and ensuring platform security.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100">
                3. Third-Party Links & Checkout
              </h2>
              <p>
                Vynora Digital Marketplace contains links to external vendor websites and checkout portals, primarily powered by <strong>Digistore24</strong>. When you click &quot;Get Product&quot;, you are redirected to the official checkout page hosted by Digistore24 or the respective vendor. Any information you provide during checkout is subject to the third party&apos;s privacy policy and terms. We encourage you to review Digistore24&apos;s privacy policy when making purchases.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100">
                4. Data Protection & Security
              </h2>
              <p>
                We implement industry-standard administrative, technical, and physical security measures to safeguard your personal data. All connections to Vynora Digital are encrypted using SSL/TLS protocols.
              </p>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100">
                5. Your Privacy Rights
              </h2>
              <p>
                Depending on your location, you have rights regarding your personal data under laws such as GDPR or CCPA, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access, update, or request deletion of your personal information.</li>
                <li>The right to opt out of marketing email communications at any time.</li>
                <li>The right to disable non-essential cookies via your browser settings.</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-900 pt-4 border-t border-gray-100 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                6. Contact Us
              </h2>
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm">
                <p className="font-semibold text-gray-900">Vynora Digital Support Team</p>
                <p>Email: <a href="mailto:contact@vynoramarket.me" className="text-blue-600 hover:underline">contact@vynoramarket.me</a></p>
                <p>Website: <Link href="/contact" className="text-blue-600 hover:underline">vynoramarket.me/contact</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
