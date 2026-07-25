'use client';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

type CategoryDisplay = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count?: number;
};

interface CategoriesProps {
  categories?: CategoryDisplay[];
}

const fallbackCategories: CategoryDisplay[] = [
  {
    id: 'cat_health',
    name: 'Health & Fitness',
    slug: 'health-fitness',
    description: 'Biohacking, weight loss, nutrition',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    count: 3,
  },
  {
    id: 'cat_finance',
    name: 'Finance & Investing',
    slug: 'finance-investing',
    description: 'Crypto, wealth, investing',
    image: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg',
    count: 2,
  },
  {
    id: 'cat_business',
    name: 'Business & Marketing',
    slug: 'business-marketing',
    description: 'Affiliate, agency, ecommerce',
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg',
    count: 3,
  },
  {
    id: 'cat_mindset',
    name: 'Mindset & Spirituality',
    slug: 'mindset-spirituality',
    description: 'Manifestation, meditation',
    image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg',
    count: 1,
  },
  {
    id: 'cat_relationship',
    name: 'Relationships',
    slug: 'relationships',
    description: 'Dating, love, connection',
    image: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg',
    count: 2,
  },
  {
    id: 'cat_education',
    name: 'Education & Skills',
    slug: 'education-skills',
    description: 'Coding, AI, career',
    image: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
    count: 1,
  },
];

export default function Categories({ categories }: CategoriesProps) {
  const display = categories && categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-sm font-medium text-blue-700 mb-4">
            Explore Niches
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Shop by Niche Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            High-converting Digistore24 niches proven to generate 6-figure affiliate commissions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer border-gray-200 hover:border-blue-200 h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={category.image || 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-200 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-200 group-hover:text-gray-100 transition-colors line-clamp-1">
                      {category.description}
                    </p>
                    {category.count !== undefined && (
                      <div className="mt-2 text-xs inline-flex px-2.5 py-1 bg-white/20 backdrop-blur rounded-full">
                        {category.count} products
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
