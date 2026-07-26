import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-3">No Account Needed</h1>
          <p className="text-gray-600 mb-6">Vynora Digital is all about instant access — there&apos;s nothing to sign up for here. Purchases and digital delivery are handled directly through our secure partner checkout, so you can start enjoying your products right away.</p>
          <Link href="/admin">
            <Button className="gap-2"><LayoutDashboard className="h-4 w-4" />Go to Admin Dashboard</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
