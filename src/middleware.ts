import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest, res: any) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  };
  const session = await getSession({ req: requestForNextAuth });
  if (req.url.includes("/admin")) {
    if (session?.user?.name === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  } else {
    if (session) {
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
