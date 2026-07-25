'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, ExternalLink, Search, Save, X } from 'lucide-react';

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  price: number;
  category: string;
  niche: string;
  affiliateUrl: string;
  commission: number;
  rating: number;
  featured: boolean;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

const emptyProduct: Partial<Product> = {
  title: '',
  slug: '',
  description: '',
  image: '',
  price: 49,
  category: 'Health & Fitness',
  niche: 'Health',
  affiliateUrl: 'https://www.digistore24.com/product/123456',
  commission: 50,
  rating: 4.5,
  featured: false,
};

export default function AdminClient({ initialProducts, initialCategories }: { initialProducts: Product[]; initialCategories: Category[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.niche.toLowerCase().includes(search.toLowerCase())
  );

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleEdit = (product: Product) => {
    setEditing(product);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditing({ ...emptyProduct });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!editing) return;

    // Auto-generate slug if empty
    if (!editing.slug && editing.title) {
      editing.slug = generateSlug(editing.title);
    }

    try {
      const method = isCreating ? 'POST' : 'PUT';
      const url = isCreating ? '/api/products' : `/api/products/${editing.id}`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ? JSON.stringify(data.error) : 'Failed');
      }

      if (isCreating) {
        setProducts([data as Product, ...products]);
        toast.success('Product created (mock if no DB)');
      } else {
        setProducts(products.map(p => (p.id === editing.id ? { ...p, ...(data as Product) } : p)) as Product[]);
        toast.success('Product updated');
      }

      setEditing(null);
      setIsCreating(false);
    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setProducts(products.filter(p => p.id !== id));
      toast.success('Deleted');
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b pb-2">
        <Button variant={activeTab === 'products' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('products')}>
          Products ({products.length})
        </Button>
        <Button variant={activeTab === 'categories' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTab('categories')}>
          Categories ({categories.length})
        </Button>
      </div>

      {activeTab === 'products' && (
        <>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-10 bg-white" />
            </div>
            <Button onClick={handleCreate} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          {/* Editing Form */}
          {editing && (
            <Card className="p-6 bg-white border-blue-200 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{isCreating ? 'Create New Product' : 'Edit Product'}</h3>
                <Button variant="ghost" size="icon" onClick={() => setEditing(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={editing.title || ''}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: !isCreating ? editing.slug : generateSlug(e.target.value) })}
                    placeholder="Biohacking Secrets..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug * (SEO friendly)</Label>
                  <Input value={editing.slug || ''} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="biohacking-secrets" />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={editing.description || ''}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    rows={5}
                    placeholder="Detailed product description with benefits..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Image URL *</Label>
                  <Input value={editing.image || ''} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://images.pexels.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Affiliate URL * (Digistore24)</Label>
                  <Input value={editing.affiliateUrl || ''} onChange={(e) => setEditing({ ...editing, affiliateUrl: e.target.value })} placeholder="https://www.digistore24.com/product/..." />
                </div>

                <div className="space-y-2">
                  <Label>Price ($) *</Label>
                  <Input type="number" value={editing.price as any} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Commission % *</Label>
                  <Input type="number" value={editing.commission as any} onChange={(e) => setEditing({ ...editing, commission: parseFloat(e.target.value) })} min={0} max={100} />
                </div>

                <div className="space-y-2">
                  <Label>Category *</Label>
                  <select
                    value={editing.category || ''}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full h-10 px-3 border rounded-md bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Finance & Investing">Finance & Investing</option>
                    <option value="Business & Marketing">Business & Marketing</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Niche *</Label>
                  <Input value={editing.niche || ''} onChange={(e) => setEditing({ ...editing, niche: e.target.value })} placeholder="Health, Finance, etc." />
                </div>

                <div className="space-y-2">
                  <Label>Rating (0-5)</Label>
                  <Input type="number" step="0.1" value={editing.rating as any} onChange={(e) => setEditing({ ...editing, rating: parseFloat(e.target.value) })} />
                </div>
                <div className="space-y-2 flex items-center gap-3 pt-6">
                  <Switch checked={!!editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} />
                  <Label>Featured Product</Label>
                </div>
              </div>

              <div className="flex gap-3 mt-6 justify-end">
                <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  {isCreating ? 'Create Product' : 'Save Changes'}
                </Button>
              </div>
            </Card>
          )}

          {/* Products Table */}
          <div className="grid gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center bg-white hover:shadow-md transition-shadow">
                <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg border flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <h4 className="font-semibold truncate">{product.title}</h4>
                    {product.featured && <Badge className="bg-blue-600 text-xs">Featured</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    <Badge variant="secondary" className="text-xs">{product.niche}</Badge>
                    <Badge className="bg-green-600 text-xs">{product.commission}%</Badge>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 truncate">Slug: {product.slug} • ${product.price} • {product.rating}★</div>
                  <a href={product.affiliateUrl} target="_blank" className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 mt-1">
                    Affiliate URL <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex gap-2 shrink-0 w-full md:w-auto">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="flex-1 md:flex-initial">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)} className="flex-1 md:flex-initial">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialCategories.map((cat: any) => (
            <Card key={cat.id} className="p-4 bg-white">
              <div className="flex gap-4">
                {cat.image && <img src={cat.image} alt={cat.name} className="w-16 h-16 rounded-lg object-cover" />}
                <div>
                  <h4 className="font-semibold">{cat.name}</h4>
                  <p className="text-xs text-gray-500">/{cat.slug}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{cat.description}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">{cat._count?.products ?? 0} products</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
