/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: "/product/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/_next/image(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "**.digistore24.com" },
      { protocol: "https", hostname: "**.digistore24-app.com" },
      { protocol: "https", hostname: "www.digistore24-app.com" },
      { protocol: "https", hostname: "**.checkout-ds24.com" },
      { protocol: "https", hostname: "tubemagic.com" },
      { protocol: "https", hostname: "**.tubemagic.com" },
      { protocol: "https", hostname: "heikoboos.com" },
      { protocol: "https", hostname: "**.heikoboos.com" },
      { protocol: "https", hostname: "www.advancedbionutritionals.com" },
      { protocol: "https", hostname: "**.advancedbionutritionals.com" },
      { protocol: "https", hostname: "aanchorbiz.com" },
      { protocol: "https", hostname: "**.aanchorbiz.com" },
      { protocol: "https", hostname: "perpetualincome365.convertri.com" },
      { protocol: "https", hostname: "**.convertri.com" },
      { protocol: "https", hostname: "millionairepartnership.com" },
      { protocol: "https", hostname: "**.millionairepartnership.com" },
      { protocol: "https", hostname: "**.googleusercontent.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

};

module.exports = nextConfig;
