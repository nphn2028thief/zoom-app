import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

import { EPath } from "./constants/path";

const publicRoutes = [EPath.SIGNIN, EPath.SIGNUP];

const protectedRoutes = [
  EPath.HOME,
  EPath.UPCOMING,
  EPath.PREVIOUS,
  EPath.RECORDINGS,
  EPath.PERSONAL_ROOM,
  `${EPath.MEETING}(.*)`,
];

export default authMiddleware({
  publicRoutes,
  afterAuth: (auth, req) => {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", req.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
});

// export function middleware(req: NextRequest) {
//   const requestHeaders = new Headers(req.headers);
//   requestHeaders.set("x-pathname", req.nextUrl.pathname);

//   return NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });
// }

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
