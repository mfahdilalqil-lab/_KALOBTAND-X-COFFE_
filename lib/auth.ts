import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Input validation (critical security layer)
        const validated = z.object({
          email: z.string().email(),
          password: z.string().min(12) // Enforce strong password
        }).safeParse(credentials);

        if (!validated.success) return null;

        // Fetch admin from secure database (NEVER store passwords in code)
        // const admin = await db.admin.findUnique({ where: { email: validated.data.email } });
        // if (!admin || !(await bcrypt.compare(validated.data.password, admin.password))) return null;

        // MOCK for blueprint - replace with real DB query
        if (
          validated.data.email === process.env.ADMIN_EMAIL &&
          await bcrypt.compare(validated.data.password, process.env.ADMIN_PASSWORD_HASH!)
        ) {
          return {
            id: "1",
            email: validated.data.email,
            name: "Admin",
            role: "admin",
            emailVerified: true,
            lastLogin: new Date().toISOString()
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.emailVerified = user.emailVerified;
        token.lastLogin = user.lastLogin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;
        session.user.lastLogin = token.lastLogin as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600 // 1 hour session timeout (security best practice)
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: true, // Only send over HTTPS
        sameSite: 'lax',
        path: '/',
        domain: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL!).hostname : undefined
      }
    }
  },
  events: {
    async signOut({ token }) {
      console.log(`Admin signed out: ${token.email}`);
      // Optional: Log to audit trail
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
