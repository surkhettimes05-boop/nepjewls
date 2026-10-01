import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "../../../../../lib/admin-credentials";
import { ADMIN_COOKIE_NAME, createAdminSession } from "../../../../../lib/admin-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  let email = "";
  let password = "";

  if (contentType.includes("application/json")) {
    const body = await request.json();
    email = String(body.email || "");
    password = String(body.password || "");
  } else {
    const body = await request.formData();
    email = String(body.get("email") || "");
    password = String(body.get("password") || "");
  }

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }

  const session = await createAdminSession(email);
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
