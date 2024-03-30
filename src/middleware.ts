import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (req.url.includes("/admin")) {
    if (token?.name === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  } else {
    if (token?.name) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/admin/banner/:path*",
    "/admin/brand/:path*",
    "/admin/category/:path*",
    "/admin/combo/:path*",
    "/admin/combo_category/:path*",
    "/admin/components/:path*",
    "/admin/member/:path*",
    "/admin/option_types/:path*",
    "/admin/orders/:path*",
    "/admin/popup/:path*",
    "/admin/products/:path*",
    "/admin/setting/:path*",
    "/cart/:path*",
    "/account/:path*",
  ],
};

export { default } from "next-auth/middleware";
