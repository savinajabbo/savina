import { type NextRequest, NextResponse } from "next/server";
import { MEMORIES_SESSION_COOKIE, verifyMemoriesSessionToken } from "@/lib/memories/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/memories/login")) {
    return NextResponse.next();
  }

  const secret = process.env.MEMORIES_ADMIN_SECRET;
  if (!secret || secret.length < 16) {
    return NextResponse.redirect(new URL("/admin/memories/login?setup=1", request.url));
  }

  const token = request.cookies.get(MEMORIES_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/memories/login", request.url));
  }

  const ok = await verifyMemoriesSessionToken(token);
  if (!ok) {
    return NextResponse.redirect(new URL("/admin/memories/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/memories", "/admin/memories/:path*"],
};
