import './globals.css';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/sonner';

// Inter font removed for offline build compatibility - using system font stack
const inter = { className: 'font-sans antialiased' };

export const metadata: Metadata = {
  title: {
    default: 'Vynora Digital - Premium Digistore24 Affiliate Marketplace',
    template: '%s | Vynora Digital',
  },
  description: 'Curated Digistore24 digital products - Health, Finance, Business, Relationships. 50-80% affiliate commissions, instant access, no inventory. #1 affiliate marketplace.',
  keywords: ['Digistore24', 'affiliate marketplace', 'digital products', 'make money online', 'affiliate marketing', 'health products', 'finance'],
  authors: [{ name: 'Vynora Digital' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vynora.digital',
    title: 'Vynora Digital - Premium Digistore24 Marketplace',
    description: 'High-converting digital products from Digistore24. 50-80% commissions.',
    siteName: 'Vynora Digital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vynora Digital Marketplace',
    description: 'Premium Digistore24 digital products affiliate store',
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
