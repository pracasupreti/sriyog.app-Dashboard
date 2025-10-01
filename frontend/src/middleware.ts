import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('i am running middleware')
  // Remove debug log for production
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // List of protected routes
  // '/' must match exactly, others can use startsWith
  const protectedRoutes = ['/dashboard', '/profile', '/admin'];
  const authRoutes = ['/signin', '/signup'];

  // Redirect unauthenticated users from protected routes
  // Protect '/' (home) with exact match, others with startsWith
  if ((pathname === '/' && !accessToken) ||
      (protectedRoutes.some(route => pathname.startsWith(route)) && !accessToken)) {
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