import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('middleware is also running hainnaaa ta')
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

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
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
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