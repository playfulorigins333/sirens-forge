import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

const NINETY_DAYS = 90 * 24 * 60 * 60 * 1000;

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const ref = url.searchParams.get('ref');

  if (ref) {
    const response = NextResponse.next();
    response.headers.set(
      'Set-Cookie',
      serialize('ref', ref, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: NINETY_DAYS / 1000,
        path: '/',
      })
    );
    url.searchParams.delete('ref');
    return Response.redirect(url, 302);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};