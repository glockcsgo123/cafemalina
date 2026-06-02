import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const token = request.cookies.get("admin_token");

  if (isAdminRoute && !isLoginPage && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
