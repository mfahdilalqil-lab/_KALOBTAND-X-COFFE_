import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';

export async function middleware(request: NextRequest) {
  // === ADMIN ROUTE PROTECTION (v4) ===
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await getServerSession(authOptions);

    // Double validation: middleware + server-side check
    if (
      !session ||
      session.user.role !== 'admin' ||
      !session.user.emailVerified
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Security hardening for admin routes
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
    return response;
  }

  // === GENERAL SECURITY HEADERS (v2) ===
  const response = NextResponse.next();

  // Strict CSP (Cloudflare Turnstile + Plausible + Supabase)
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://plausible.io https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.kalobtandxcoffee.com https://supabase.co https://api.resend.com; " +
    "frame-src 'self' https://challenges.cloudflare.com; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none';"
  );

  // Additional security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  return response;
}

// Matcher: apply to all non-static routes + admin paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Admin route matcher (v4)
    '/admin/:path*',
  ],
};
