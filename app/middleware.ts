import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/";
  const token = request?.cookies?.get("token")?.value || "";

  console.log("PATHHHHHHHHHHHHHHH", path);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
});

export const config = {
  matcher: ["/", "/home", "/users/:path*"],
};
