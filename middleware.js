import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = ['/dashboard/*', '/dashboard'];
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some(route => new RegExp(`^${route.replace('*', '.*')}$`).test(pathname))) {
    if (!token) {
      // If no token is found, redirect to login page with callbackUrl
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/dashboard',
    '/api/products/:path*',
  ],
};
