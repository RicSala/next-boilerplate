import { authMiddlewareOptions } from './auth.middleware.config';
import NextAuth from 'next-auth';
import { config as appConfig } from './config/shipper.config';

const { auth } = NextAuth(authMiddlewareOptions);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isAuthApiRoute = nextUrl.pathname.startsWith(
        appConfig.routes.apiRouteAuthPrefix
    );

    const isPrivate = nextUrl.pathname.startsWith(appConfig.routes.private.app);

    const isAuthRoute = appConfig.routes.auth.includes(nextUrl.pathname);

    if (isAuthApiRoute) return null;

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL('/app/dashboard', nextUrl));
        }
        return null;
    }

    if (isPrivate && !isLoggedIn) {
        return Response.redirect(new URL('/auth/signin', nextUrl));
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// Clerk regex
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
