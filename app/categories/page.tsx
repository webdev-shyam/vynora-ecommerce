import { getCategories } from '@/lib/queries';
import CategoriesComponent from '@/components/Categories';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  const categories = await getCategories() as any[];

  const display = categories.map((c: any) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description,
    image: c.image,
    count: c._count?.products ?? 0,
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
        <CategoriesComponent categories={display} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Instant Digital Download Across All Categories</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">No inventory, no shipping waiting time. Click &quot;Get Product&quot; on any item to be redirected to the secure official checkout with instant digital delivery.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
