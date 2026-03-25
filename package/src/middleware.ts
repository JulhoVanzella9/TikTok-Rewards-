import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const refCode = url.searchParams.get("ref");
  
  // If there's a referral code on home page, redirect to login with ref code
  if (refCode && url.pathname === "/") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("ref", refCode);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
