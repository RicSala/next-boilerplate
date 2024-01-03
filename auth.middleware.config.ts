import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';

export const authMiddlewareOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
} satisfies NextAuthConfig;
