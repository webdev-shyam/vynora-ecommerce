// @ts-ignore
import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = "https://www.vynoramarket.me";
const SITE_NAME = "Vynora Market";
const SITE_DESCRIPTION =
  "Vynora Market — your trusted marketplace for premium digital products. Shop software, templates, creative assets, and more with secure checkout and instant delivery.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // ── Title & Description ───────────────────────────────────────────
  title: {
    default: `${SITE_NAME} — Premium Digital Products Marketplace`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "digital products",
    "online marketplace",
    "premium software",
    "templates",
    "creative assets",
    "e-commerce",
    "Vynora Market",
    "digital downloads",
    "buy software online",
    "shop digital goods",
  ],

  // ── Application ───────────────────────────────────────────────────
  applicationName: SITE_NAME,
  generator: "Next.js",

  // ── Icons ─────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  // ── Open Graph ────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Premium Digital Products Marketplace`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Premium Digital Products Marketplace`,
        type: "image/png",
      },
    ],
  },

  // ── Twitter Card ──────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Premium Digital Products Marketplace`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
    creator: "@VynoraMarket",
    site: "@VynoraMarket",
  },

  // ── Robots ────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Alternates / Canonical ────────────────────────────────────────
  alternates: {
    canonical: SITE_URL,
  },

  // ── Verification (placeholders — replace with real values) ────────
  verification: {
    google: "GOOGLE_SITE_VERIFICATION_CODE",
    yandex: "YANDEX_VERIFICATION_CODE",
  },

  // ── Category ──────────────────────────────────────────────────────
  category: "e-commerce",
};

// ── JSON-LD Structured Data ──────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://twitter.com/VynoraMarket",
        "https://facebook.com/VynoraMarket",
        "https://instagram.com/VynoraMarket",
        "https://linkedin.com/company/VynoraMarket",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@vynoramarket.me",
        availableLanguage: "English",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Store",
      "@id": `${SITE_URL}/#store`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: { "@id": `${SITE_URL}/#organization` },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Products Catalog",
        url: `${SITE_URL}/shop`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
