import { withAuth } from 'next-auth/middleware';
import { AUTH_SECRET } from '@/lib/auth';

/**
 * Protect every `/admin/*` route (including `/admin` itself) behind a valid
 * NextAuth session. The sign-in page at `/admin/login` is always reachable so
 * unauthenticated admins can log in; everything else redirects there.
 *
 * `next-auth/middleware` runs on the Edge runtime, so we reuse the shared
 * `AUTH_SECRET` to verify the session JWT signed by the Node route handler.
 */
export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
  secret: AUTH_SECRET,
  callbacks: {
    authorized: ({ req, token }) => {
      const { pathname } = req.nextUrl;

      // Always allow the login page (and anything nested under it).
      if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
        return true;
      }

      // Require an active session for all other admin routes.
      return !!token;
    },
  },
});

export const config = {
  // Match `/admin` and any nested admin path.
  matcher: ['/admin/:path*'],
};
