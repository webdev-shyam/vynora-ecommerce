import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * Single-admin credentials.
 *
 * Configure these for production via environment variables
 * (see `.env.example`). Sensible dev defaults are provided so the
 * admin login works out of the box locally.
 */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@vynora.digital';
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Vynora@Admin2026';

/**
 * Secret used to sign/verify the NextAuth session JWT.
 *
 * IMPORTANT: set `NEXTAUTH_SECRET` to a strong random value in production
 * (e.g. `openssl rand -base64 32`). The middleware imports the same value so
 * that the JWT signed by the route handler can be verified on the Edge.
 */
export const AUTH_SECRET =
  process.env.NEXTAUTH_SECRET || 'vynora-dev-secret-change-in-production';

export const authOptions: NextAuthOptions = {
  secret: AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@vynora.digital' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password;

        if (!email || !password) return null;

        if (
          email === ADMIN_EMAIL.toLowerCase() &&
          password === ADMIN_PASSWORD
        ) {
          return {
            id: '1',
            name: 'Vynora Admin',
            email: ADMIN_EMAIL,
            role: 'admin',
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the admin role onto the JWT on first sign-in.
      if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose the role/id on the client session object.
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string | undefined;
        (session.user as { id?: string }).id = token.id as string | undefined;
      }
      return session;
    },
  },
};
