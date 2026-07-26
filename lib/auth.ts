import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

function getAdminEmails(): string[] {
  const env = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || "";
  if (!env) return [];
  return env
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmails = getAdminEmails();
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!credentials?.email || !credentials?.password) return null;

        const emailLower = credentials.email.toLowerCase().trim();

        if (adminPassword && credentials.password !== adminPassword) {
          return null;
        }

        if (adminEmails.length > 0 && !adminEmails.includes(emailLower)) {
          return null;
        }

        return {
          id: emailLower,
          email: emailLower,
          name: emailLower.split("@")[0],
        } as any;
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  callbacks: {
    async signIn({ user }) {
      const adminEmails = getAdminEmails();
      if (adminEmails.length === 0) return true;
      if (!user.email) return false;
      return adminEmails.includes(user.email.toLowerCase());
    },
    async jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (token?.email) {
        session.user = { ...session.user, email: token.email as string } as any;
      }
      return session;
    },
  },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
};
