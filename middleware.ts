// middleware works on the edge, and prisma is not available on the edge, so we need to provide a custom config for the middleware
import { authMiddlewareOptions } from '@/auth.middleware.config';
import NextAuth from 'next-auth';
import { config as appConfig } from '@/config/shipper.config';

const { auth } = NextAuth(authMiddlewareOptions);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isAuthApiRoute = nextUrl.pathname.startsWith(
        appConfig.routes.apiRouteAuthPrefix
    );
    const isPrivate = nextUrl.pathname.startsWith(appConfig.routes.private.app);
    const isAuthRoute = Object.values(appConfig.routes.auth).includes(
        nextUrl.pathname
    );

    if (isAuthApiRoute) return; // Allow (do nothing in) all API routes to be public

    if (isAuthRoute) {
        if (isLoggedIn) {
            // If the user is already logged in, do not allow them to access the auth routes
            return Response.redirect(new URL('/app/dashboard', nextUrl));
        }
        return;
    }

    if (isPrivate && !isLoggedIn) {
        return Response.redirect(
            new URL(appConfig.routes.auth.signin, nextUrl)
        );
    }

    return;
});

// This config defines where the middleware should be invoked, but doesn't block per se. I depends on what the middleware returns.
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };

// Clerk regex
export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
