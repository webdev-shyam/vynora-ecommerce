/**
 * DEPRECATED: This file previously contained static products.
 * Now products are fetched from Supabase PostgreSQL via Prisma.
 * 
 * Use lib/queries.ts instead:
 * - getProducts()
 * - getProductBySlug()
 * - getFeaturedProducts()
 * - getCategories()
 * 
 * Mock fallback data is in lib/mockData.ts for development without DB.
 * 
 * This file is kept for backward compat but will be removed.
 * It now re-exports mock data in legacy shape to prevent breaking old imports.
 */

import { mockProducts } from '@/lib/mockData';

// Legacy interface for backward compatibility
export interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  sale?: boolean;
  featured?: boolean;
}

export const products: Product[] = mockProducts.map((p, idx) => ({
  id: idx + 1,
  name: p.title,
  price: p.price,
  image: p.image,
  category: p.category,
  featured: p.featured,
  sale: p.commission > 60,
}));

// New recommended exports
export { mockProducts as digitalProducts } from '@/lib/mockData';
export { mockCategories as categories } from '@/lib/mockData';
