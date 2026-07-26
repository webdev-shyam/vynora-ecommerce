import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  Globe,
  Users,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Vynora Digital Marketplace',
  description: 'Discover Vynora Digital — your premier marketplace for curated digital products, software tools, e-books, and online masterclasses.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-blue-900 rounded-3xl p-8 md:p-16 text-white mb-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-xs font-semibold mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                ABOUT VYNORA DIGITAL
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                Empowering Minds with Premium Digital Products &amp; Masterclasses
              </h1>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
                Vynora Digital Marketplace is a modern destination for high-value digital guides, online courses, software tools, and templates. We simplify learning and personal growth by curating only top-rated digital assets with instant online delivery.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8">
                    Explore Catalog
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-gray-600 text-gray-200 hover:bg-white/10 rounded-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center border-gray-200 bg-white">
              <div className="text-3xl font-extrabold text-blue-600 mb-1">100%</div>
              <div className="text-sm font-medium text-gray-900">Digital Access</div>
              <div className="text-xs text-gray-500">Zero shipping waiting time</div>
            </Card>
            <Card className="p-6 text-center border-gray-200 bg-white">
              <div className="text-3xl font-extrabold text-indigo-600 mb-1">60 Days</div>
              <div className="text-sm font-medium text-gray-900">Money-Back Guarantee</div>
              <div className="text-xs text-gray-500">Risk-free digital purchases</div>
            </Card>
            <Card className="p-6 text-center border-gray-200 bg-white">
              <div className="text-3xl font-extrabold text-emerald-600 mb-1">4.8 / 5</div>
              <div className="text-sm font-medium text-gray-900">Average Product Rating</div>
              <div className="text-xs text-gray-500">Verified customer feedback</div>
            </Card>
            <Card className="p-6 text-center border-gray-200 bg-white">
              <div className="text-3xl font-extrabold text-purple-600 mb-1">6+</div>
              <div className="text-sm font-medium text-gray-900">Core Niches</div>
              <div className="text-xs text-gray-500">Health, Wealth, Tech &amp; Growth</div>
            </Card>
          </div>

          {/* Our Core Values */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
                Why Choose Vynora Digital?
              </h2>
              <p className="text-gray-600">
                We believe digital products should be accessible, genuine, and delivered seamlessly without friction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-8 border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Curated Quality</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every product listed on Vynora undergoes careful evaluation for quality, practical value, vendor reputation, and customer satisfaction ratings.
                </p>
              </Card>

              <Card className="p-8 border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Digital Access</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  No physical inventory or shipping delays. Get immediate access to your downloadable guides, member portal logins, or software keys instantly upon checkout.
                </p>
              </Card>

              <Card className="p-8 border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-6">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Checkout Partners</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  All transactions are handled through industry-leading payment processors like Digistore24, featuring 256-bit SSL encryption and comprehensive buyer protection.
                </p>
              </Card>
            </div>
          </div>

          {/* Mission Statement */}
          <Card className="p-8 md:p-12 border-0 bg-gradient-to-r from-blue-50 to-indigo-50 mb-16">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To connect knowledge seekers, entrepreneurs, and health enthusiasts with transformative digital tools and courses that deliver real, measurable results in their daily lives.
              </p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
