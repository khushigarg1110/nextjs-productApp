import { NextRequest, NextResponse } from "next/server";

export function middleware(request : NextRequest) {
  const token = request.cookies.get("token")?.value;

  const url = request.nextUrl;

  // protect /cart
  if (url.pathname.startsWith("/cart")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*"],
};