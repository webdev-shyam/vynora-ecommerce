'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

type Props = {
  email?: string | null;
};

export default function AdminLogout({ email }: Props) {
  return (
    <div className="flex items-center gap-3">
      {email && (
        <span className="hidden sm:inline text-xs text-gray-500">
          Signed in as <span className="font-medium text-gray-700">{email}</span>
        </span>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="gap-1.5"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  );
}
