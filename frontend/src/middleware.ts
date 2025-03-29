import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { unprotectedPaths } from "./lib/constants";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token");

  if (refreshToken && unprotectedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }
}

export const config = {
  matcher: ["/:path*"],
};
