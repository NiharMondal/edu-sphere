import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	const cookie = req.cookies.get("accessToken")?.value;
	console.log(cookie);
	if (!cookie) {
		if (path.startsWith("/dashboard")) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
