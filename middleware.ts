import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const isAdminRoute = url.startsWith('/admin');

  if (isAdminRoute) {
    const auth = request.cookies.get('auth-token')?.value;
    if (!auth || auth !== process.env.ADMIN_TOKEN) {
      return Response.redirect(new URL('/login', request.url));
    }
  }

  // CSP for security (v2)
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://plausible.io;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co;
    frame-ancestors 'none';
    object-src 'none';
  `.replace(/\s+/g, ' ').trim();

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
