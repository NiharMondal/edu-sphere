import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./lib/decodeToken";

const authRoute = ["/student", "/admin", "/instructor"];
const publicRoute = ["/login", "/sign-up", "/about-us", "/courses", "/contact"];

export function middleware(req: NextRequest) {
	const pathName = req.nextUrl.pathname;
	const token = req.cookies.get("accessToken")?.value;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const decodedToken: any = decodeToken(token as string);
	const { role } = decodedToken;

	if (!token) {
		publicRoute.forEach((route) => {
			if (pathName.startsWith(route)) {
				return NextResponse.next();
			}
		});
	}

	if (!token) {
		authRoute.forEach((authPath) => {
			if (pathName.startsWith(authPath)) {
				return NextResponse.redirect(new URL("/login", req.url));
			}
			return NextResponse.next();
		});
	}

	if (pathName === "/student" && role !== "student") {
		return NextResponse.redirect(new URL("/unauthorized", req.url));
	}
	if (pathName === "/admin" && role !== "admin") {
		return NextResponse.redirect(new URL("/unauthorized", req.url));
	}
	if (pathName === "/instructor" && role !== "instructor") {
		return NextResponse.redirect(new URL("/unauthorized", req.url));
	}

	return NextResponse.next();
}

export const config = {};
