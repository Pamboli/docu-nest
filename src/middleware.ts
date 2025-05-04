import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN, ROUTES } from "./utils/constants";
import { verifyToken } from "./lib/services/auth.service";

const OPEN_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNIN] as string[];

export async function middleware(request: NextRequest) {
  // Auth

  if (!OPEN_ROUTES.includes(request.nextUrl.pathname.toLowerCase())) {
    const accessToken = request.cookies.get(ACCESS_TOKEN);

    if (!accessToken) {
      const redirectUrl = getAuthRedirectUrl(request);
      return NextResponse.redirect(redirectUrl);
    }

    const isTokenVerified = await verifyToken(accessToken.value);

    if (!isTokenVerified) {
      const redirectUrl = getAuthRedirectUrl(request);
      return NextResponse.redirect(redirectUrl);
    }
  }
}

function getAuthRedirectUrl(request: NextRequest) {
  const loginUrl = new URL(ROUTES.LOGIN, request.url);

  if (request.nextUrl.pathname !== ROUTES.HOME) {
    loginUrl.searchParams.set("nextUrl", request.nextUrl.pathname);
  }

  return loginUrl;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
