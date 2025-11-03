'use client';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
    itemCount: 245,
  },
  {
    id: 2,
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    itemCount: 189,
  },
  {
    id: 3,
    name: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    itemCount: 156,
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg',
    itemCount: 98,
  },
  {
    id: 5,
    name: 'Beauty & Health',
    image: 'https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg',
    itemCount: 134,
  },
  {
    id: 6,
    name: 'Books & Media',
    image: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg',
    itemCount: 76,
  },
];

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections designed to meet every need and style preference
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 group-hover:text-gray-100 transition-colors">
                      {category.itemCount} items
                    </p>
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