import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">Account System Not Needed</h1>
          <p className="text-gray-600 mb-6">As an affiliate marketplace, we don&apos;t handle user accounts, orders, or shipping. All transactions happen directly on Digistore24.</p>
          <Link href="/admin">
            <Button className="gap-2"><LayoutDashboard className="h-4 w-4" />Go to Admin Dashboard</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
