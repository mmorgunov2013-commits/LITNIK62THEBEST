import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

const COOKIE = "litnik_admin";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  try {
    const secret = new TextEncoder().encode(
      process.env.ADMIN_JWT_SECRET ?? "dev-insecure-secret",
    );
    await jose.jwtVerify(token, secret);
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
