# Vynora Digital - Digistore24 Affiliate Marketplace

A modern Next.js affiliate marketplace that promotes **digital products from Digistore24**. No cart, no checkout, no shipping — customers click **"Get Product"** and are redirected to Digistore24 affiliate URLs with 50-80% commissions.

![Vynora Digital](https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200)

## ✨ Features Converted From Ecommerce to Affiliate

### 🔥 Affiliate-First
- **No Shopping Cart** - Removed completely
- **No Checkout / Shipping / Inventory** - No vendor marketplace
- **Primary CTA**: `Get Product` → Redirects to Digistore24 `affiliateUrl` in new tab
- **Digistore24 Only** - Every product links to `https://www.digistore24.com/product/...`

### 🗄️ Backend
- **Next.js 13.5.1 App Router + TypeScript**
- **Supabase PostgreSQL** as database
- **Prisma ORM** with clean models
- **SEO-friendly URLs** using `slug` (`/product/biohacking-secrets-...`)
- Fallback mock mode when `DATABASE_URL` not set (for local dev without DB)

### 📦 Database Models (Prisma)

**Product**
- id, title, slug, description, image, images[], price
- category (denormalized), categoryId (FK), niche, affiliateUrl, commission, rating, reviewsCount, featured, isActive, tags[], createdAt, updatedAt

**Category**
- id, name, slug, description, image, products[], createdAt, updatedAt

### 🎯 Frontend
- Product listing from DB (via `lib/queries.ts`)
- Product detail pages with SEO metadata (`/product/[slug]`)
- Category filtering (`/categories/[slug]` and `/shop?category=...`)
- Search (`/shop?q=...`) across title, description, niche, tags
- Featured products section
- Responsive, modern UI with Tailwind + shadcn/ui

### 🛠️ Admin Dashboard
- `/admin` page — list, create, edit, delete products
- Client + API Routes (`/api/products`, `/api/categories`)
- Validation with Zod
- Works in mock mode (in-memory) and real DB mode (persist via Prisma)

## 🚀 Quick Start

### 1. Install
```bash
git clone <repo>
cd vynora-ecommerce
npm install --legacy-peer-deps
```

### 2. Env Setup
Copy `.env.example` to `.env` and fill Supabase credentials:
```env
DATABASE_URL="postgresql://postgres:..."
DIRECT_URL="postgresql://postgres:..."
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```
If you skip this, app runs in **mock mode** using `lib/mockData.ts` (12 curated Digistore24-style digital products).

### 3. Prisma Setup (if using Supabase)
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
# or
npm run db:setup
```

### 4. Dev
```bash
npm run dev
# http://localhost:3000
```

## 📁 Project Structure
```
app/
  page.tsx (Home: Hero + Categories + Featured from DB)
  product/[slug]/page.tsx (SEO detail + affiliate redirect)
  product/[id]/page.tsx (legacy redirect)
  shop/page.tsx + ShopClient.tsx (search + filters + sort)
  categories/page.tsx (all categories)
  categories/[slug]/page.tsx (filter by niche)
  admin/page.tsx + AdminClient.tsx (CRUD)
  api/products/... (REST)
  api/categories/... (REST)

components/
  ProductCard.tsx (Get Product button -> affiliateUrl)
  ProductGrid.tsx
  Categories.tsx
  FeaturedProducts.tsx
  Navigation.tsx (no cart, search redirects to /shop?q=)
  Hero.tsx (Digistore24 messaging)
  Footer.tsx (disclosure)

lib/
  prisma.ts (singleton)
  supabase.ts
  queries.ts (getProducts, getProductBySlug, etc with mock fallback)
  mockData.ts (12 Digistore24 digital products)
  validations.ts (Zod)
  utils.ts

prisma/
  schema.prisma
  seed.ts

data/products.ts (deprecated, now re-exports mock)
```

## 🔗 How Affiliate Flow Works
1. User browses `/shop` or `/`
2. Product card shows commission %, rating, niche
3. Click "Get Product" => `<a href={product.affiliateUrl} target="_blank">`
4. Redirect to Digistore24 vendor checkout
5. Vendor handles payment, delivery, support, refunds
6. You earn commission tracked by Digistore24

## 🧩 Digistore24 Product Examples Seeded
- Biohacking Secrets (Health)
- Crypto Quantum Leap (Finance)
- Manifestation Magic (Spirituality)
- Affiliate Marketing Mastery (Business)
- Text Chemistry (Relationships)
- etc.

All have `affiliateUrl: https://www.digistore24.com/product/...?aff=vynora`

## 🛡️ Admin Notes
- Admin is currently open (no auth). Add auth later via Supabase Auth / NextAuth.
- Form requires Digistore24 URL validation.
- Slug must be unique, lowercase hyphenated.

## 📦 Build
```bash
npm run build
npm start
```

## 🚀 Deploy
- Vercel: set env vars, it will run `prisma generate` via build if configured.
- Make sure `DATABASE_URL` uses pooling (Supabase `?pgbouncer=true`)
- Use `DIRECT_URL` for migrations.

## ⚠️ Disclosure
This is an affiliate marketplace. We include disclosure in footer and product pages: "Redirects to Digistore24 secure checkout" and "We may earn commission".

---

Built for Vynora Digital Marketplace — Digistore24 affiliate only, no inventory.
