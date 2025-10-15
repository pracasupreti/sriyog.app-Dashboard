import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('middleware is also running hainnaaa ta')
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken= request.cookies.get('refreshToken')?.value;

  // Protected routes that require authentication
  const protectedRoutes = ['/', '/waiting-professionals', '/profile', '/admin'];
  const authRoutes = ['/signin', '/signup'];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route === '/') {
      return pathname === '/'; // Exact match for home
    }
    return pathname.startsWith(route);
  });

  // Redirect unauthenticated users from protected routes to signin
  // ✅ Only redirect if BOTH access AND refresh tokens are missing
  // This allows token refresh to work when access token expires but refresh token exists
  if (isProtectedRoute && !accessToken && !refreshToken) {
    console.log('🚪 No tokens found, redirecting to signin:', pathname);
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // ✅ Allow access if refresh token exists (even if access token expired)
  // The client-side interceptor will handle token refresh
  if (isProtectedRoute && !accessToken && refreshToken) {
    console.log('🔄 Access token missing but refresh token exists, allowing access:', pathname);
    return NextResponse.next();
  }

  // Prevent authenticated users from accessing auth pages
  if (authRoutes.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};