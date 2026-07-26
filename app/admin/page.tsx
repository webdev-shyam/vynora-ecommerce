import { getProducts, getCategories } from '@/lib/queries';
import AdminClient from './AdminClient';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [products, categories] = await Promise.all([
    getProducts({ take: 100 }),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage Digistore24 affiliate products • {products.length} products • {categories.length} categories</p>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <strong>Setup:</strong> Connect Supabase PostgreSQL via DATABASE_URL env. Without DB, admin uses mock mode (changes won&apos;t persist). Run <code className="bg-white px-1 py-0.5 rounded">npx prisma migrate dev</code> and <code className="bg-white px-1 py-0.5 rounded">npx prisma db seed</code> (see prisma/seed.ts) after setting env.
            </div>
          </div>
          <AdminClient initialProducts={products as any[]} initialCategories={categories as any[]} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
