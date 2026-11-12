import { NextResponse } from "next/server"
import type { NextRequest } from "next/request"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("crm_token")?.value
  const { pathname } = request.nextUrl

  // Rotas que exigem login
  const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/super-admin")
  const isLoginPage = pathname === "/login"

  if (isProtectedRoute && !token) {
    const url = new URL("/login", request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/super-admin/:path*",
  ],
}

