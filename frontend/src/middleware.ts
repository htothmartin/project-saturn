import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Logout } from './api/auth';

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh-token');
  if (refreshToken) {
    return NextResponse.next();
  } else {
    await Logout();
  }
}

export const config = {
  matcher: '/projects/:path*',
};
