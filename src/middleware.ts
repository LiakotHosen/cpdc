import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware on /admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude /admin/login and static assets
    if (pathname === '/admin/login') {
      const hasAuth =
        request.cookies.has('cpdc_admin_token') ||
        request.cookies.has('sb-access-token') ||
        Array.from(request.cookies.getAll()).some((c) =>
          c.name.includes('-auth-token')
        );

      if (hasAuth) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // For all other /admin routes, check authentication
    const hasAuth =
      request.cookies.has('cpdc_admin_token') ||
      request.cookies.has('sb-access-token') ||
      Array.from(request.cookies.getAll()).some((c) =>
        c.name.includes('-auth-token')
      );

    // If hitting the root /admin, redirect directly to dashboard (if authenticated) or login
    if (pathname === '/admin' || pathname === '/admin/') {
      if (hasAuth) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', '/admin/dashboard');
      return NextResponse.redirect(loginUrl);
    }

    if (!hasAuth) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
