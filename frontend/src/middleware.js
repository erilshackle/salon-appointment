import { NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req) {
  const token = getCookie("access_token", { req });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/outros-caminhos-protegidos/:path*"],
};
