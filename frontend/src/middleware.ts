import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authUrl = "http://localhost:5000/api/auth/checkAuth";
  const publicRoutes = ["/login", "/signup"];
  const protectedRoutes = ["/"];
  //const unverifiedRoutes = ["/verify"];

  try {
    const res = await fetch(authUrl, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
    });

    const data = await res.json();
    const { pathname } = request.nextUrl;

    // If the user is not authenticated, redirect to login for protected routes
    if (!data.exists) {
      if (protectedRoutes.some((route) => pathnameMatches(route, pathname))) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // If the user is authenticated and verified
    if (data.exists) {
      // Redirect away from public or unverified routes to the home page
      if (publicRoutes.some((route) => pathnameMatches(route, pathname))) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (err) {
    console.error("Error during authentication check:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// @ts-expect-error
function pathnameMatches(route, pathname) {
  const regex = new RegExp(`^${route.replace(":path*", ".*")}$`);
  return regex.test(pathname);
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/verify",
    "/profile",
    "/tournament",
    "/tournament/:path*",
    "/profile/:path*",
    "/createtourney",
    "/joinedTournies",
    "/tourneyfind",
    "/approval",
    "/approval/:path*",
    "/guide",
    "/siteUpload",
  ],
};
