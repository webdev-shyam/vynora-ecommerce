import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Sign In',
  description: 'Secure admin sign in for the Vynora Digital dashboard.',
  robots: { index: false, follow: false },
};

type Props = {
  searchParams?: { callbackUrl?: string };
};

export default async function AdminLoginPage({ searchParams }: Props) {
  // If already authenticated, skip the login screen.
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/admin');
  }

  const callbackUrl = searchParams?.callbackUrl || '/admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
              V
            </div>
            <span className="font-bold text-2xl text-gray-900 tracking-tight">
              Vynora Digital
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Sign In</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Authorized personnel only. Sign in to manage the catalog.
          </p>
        </div>

        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
}
