import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;
      if (pathname.startsWith("/admin")) {
        if (pathname === "/admin/login") return true;
        return !!token;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
