import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const token = cookies().get("token");
    if (!token?.value) {
      throw new Error("Invalid token");
    }

    const response = await fetch(`${process.env.API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Authorization failed");
    }

    const responseJson = await response.json()
    const requestHeader = new Headers(request.headers);
    requestHeader.set("user", JSON.stringify(responseJson));
    return NextResponse.next({
      request: {
        headers: requestHeader,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/special-blogs/:path*",
};
