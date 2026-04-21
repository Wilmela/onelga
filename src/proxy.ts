import { getSession } from "@/lib/DAL/user";
import { NextRequest, NextResponse } from "next/server";
import { USER_ROLE } from "./lib/constants";

export async function proxy(req: NextRequest) {
  const session = await getSession();

  if (!session?.user && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    session?.user.role !== USER_ROLE.commander &&
    req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
