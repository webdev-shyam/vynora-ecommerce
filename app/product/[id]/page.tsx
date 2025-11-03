import { products } from '@/data/products';
import ProductClientPage from './ProductClientPage';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductClientPage params={params} />;
}