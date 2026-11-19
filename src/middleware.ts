import { NextResponse, type NextRequest } from "next/server";

// While the HustleX parent site is parked, the root sends visitors to Kin.
// Temporary (307), never 301: browsers cache 301s and the HustleX home page will return.
// Flip HUSTLEX_ROOT_REDIRECTS_TO_KIN=false to bring back the original root page.
export function middleware(request: NextRequest) {
	if (process.env.HUSTLEX_ROOT_REDIRECTS_TO_KIN === "false") return NextResponse.next();
	const url = request.nextUrl.clone();
	url.pathname = "/kin";
	return NextResponse.redirect(url, 307);
}

export const config = { matcher: "/" };
