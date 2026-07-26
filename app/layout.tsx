import './globals.css';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';

// Inter font removed for offline build compatibility - using system font stack
const inter = { className: 'font-sans antialiased' };

export const metadata: Metadata = {
  title: {
    default: 'Vynora Digital - Premium Digital Products & Masterclasses Marketplace',
    template: '%s | Vynora Digital',
  },
  description: 'Curated digital products, online courses, software tools, and e-books in Health, Finance, Business, & Personal Development. Instant digital access, secure checkout, 60-day guarantee.',
  keywords: ['digital products', 'online courses', 'e-books', 'software tools', 'health guides', 'finance courses', 'personal growth'],
  authors: [{ name: 'Vynora Digital' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vynora.digital',
    title: 'Vynora Digital - Premium Digital Products Marketplace',
    description: 'Discover verified digital courses, e-books, and tools with instant delivery and secure checkout.',
    siteName: 'Vynora Digital Marketplace',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vynora Digital Marketplace',
    description: 'Curated digital products and guides with instant online access.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
