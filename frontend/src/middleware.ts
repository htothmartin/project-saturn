import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  console.log('middleware runs');
  const accessToken = request.cookies.get('access-token')?.value;
  const publicPaths = ['/login', '/register', '/test'];
  if (publicPaths.some((path) => request.url.includes(path))) {
    return NextResponse.next();
  } else if (!accessToken) {
    console.log('no accesstoken');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  const originalRequest = new Request(request.url, {
    method: request.method,
    headers: requestHeaders,
    body: request.body,
    redirect: 'manual',
  });

  let response = await fetch(originalRequest);

  if (response.status === 403) {
    console.log('fetch new token');
    const refreshResponse = await fetch(
      `${process.env.API_URL}/auth/refresh-token`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: request.cookies.toString(),
        },
      },
    );

    if (refreshResponse.ok) {
      const { accessToken: newAccessToken } = await refreshResponse.json();

      requestHeaders.set('Authorization', `Bearer ${newAccessToken}`);
      const retryRequest = new Request(request.url, {
        method: request.method,
        headers: requestHeaders,
        body: request.body,
        redirect: 'manual',
      });

      response = await fetch(retryRequest);

      const cookieResponse = NextResponse.next();
      cookieResponse.headers.set(
        'Set-Cookie',
        `accessToken=${newAccessToken}; Path=/; HttpOnly`,
      );
      return cookieResponse;
    } else {
      const redirectResponse = NextResponse.redirect(new URL('/login'));
      redirectResponse.cookies.delete('access-token');
      return redirectResponse;
    }
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
