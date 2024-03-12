// REVIEW:

import NextAuth, { NextAuthConfig } from 'next-auth';
import { getUserByEmail } from './actions/getUser';
import { db } from './lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/nodemailer';
import { appConfig } from './config/shipper.appconfig';
import bcrypt from 'bcryptjs';
import { sendEmail } from './lib/email';

export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            id: 'google',
            name: 'Google',
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            id: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: ' ' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log('credentials*** email', credentials);
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await getUserByEmail(credentials.email as string);

                // console.log('credentials*** !user', credentials);
                if (!user || !user?.hashedPassword) {
                    console.log('Invalid credentials*** Custom', user);
                    return null;
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.hashedPassword
                );

                console.log('credentials*** isCorrect', credentials, {
                    isCorrectPassword,
                });
                if (!isCorrectPassword) {
                    console.log(
                        'Invalid credentials*** Custom',
                        isCorrectPassword
                    );
                    console.log('credentials.password', credentials.password);
                    return null;
                }

                //REVIEW: does this mean we are gonna have the whole user object in the session
                //  --> No, we are only gonna have name, email, image and whatever we add in the session callback
                return user;
            },
        }),

        EmailProvider({
            name: 'email',
            id: 'email',
            server: {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT),
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            from: appConfig.email.fromNoReply,
            async sendVerificationRequest(params) {
                const {
                    identifier: email,
                    url,
                    token,
                    provider,
                    theme,
                } = params;
                const { host } = new URL(url);

                await sendEmail(
                    email,
                    'Recuperación de contraseña',
                    'Recupera tu contraseña',
                    html({ url, host, theme }),
                    'noreply@test.com'
                );
            },
        }),
    ],

    // custom pages
    pages: {
        signIn: '/signin', // This is the page that will be shown when the user is not signed in
        // newUser: '/', // New users will be directed here on first sign in
        // Careful, if you add this property, the callbackUrl of the signIn method will be include as a query parameter instead of used as the callbackUrl
        error: '/signin',
        verifyRequest: '/verify',
    },

    debug: process.env.NODE_ENV === 'development', // Set to true to display debug messages
    jwt: {
        // secret: process.env.JWT_SECRET, // deprecated
    },

    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        strategy: 'jwt',
        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens (as is the case)
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    //REVIEW: When we use the Prisma adapter, who decides which fields are gonna be saved in the session?
    // how do I add more fields to the session?
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // to control if a user is allowed to sign in.
        async signIn({ user, account, profile, email, credentials }) {
            // REVIEW: why "trigger" is undefined here? we should have a trigger property: https://authjs.dev/reference/core/types#callbacksoptionsp-a
            // console.log('from signin', { user });
            // console.log('from signin', { account });
            // console.log('from signin', { profile });

            if (account?.provider !== 'email') return true;

            const userExists = await db.user.findUnique({
                where: { email: user.email! }, //the user object has an email property, which contains the email the user entered.
            });
            if (userExists) {
                return true; //if the email exists in the User collection, email them a magic login link
            } else {
                return false;
            }
        },
        // called anytime the user is redirected to a callback URL (e.g. on signin or signout).
        // async redirect({ url, baseUrl }) {
        //     // Allows relative callback URLs
        //     if (url.startsWith('/')) return `${baseUrl}${url}`;
        //     // Allows callback URLs on the same origin
        //     else if (new URL(url).origin === baseUrl) return url;
        //     return baseUrl;
        // },

        // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or
        // updated (i.e whenever a session is accessed in the client). The returned value will be encrypted,
        // and it is stored in a cookie.
        // The arguments user, account, profile and isNewUser are only passed the first time this callback
        // is called on a new session, after the user signs in. In subsequent calls, only token will be available.
        // whatever this callback returns will be the token that is stored in the cookie.
        async jwt({ token, user, account, profile, session, trigger }) {
            // console.log({ token });
            // console.log({ user });
            // console.log({ account });
            // console.log({ profile });
            // console.log({ session });
            // console.log({ trigger }); // Only works for database sessions

            // When the user signes in for the first time, we want to add some extra information to the token
            if (user && user.id) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }

            return token;
        },

        // The session callback is called whenever a session is checked.
        // By default, only a subset of the token is returned for increased security.
        // If you want to make something available you added to the token (like access_token and user.id from above)
        // via the jwt() callback, you have to explicitly forward it here to make it available to the client.
        // When using database sessions, the User (user) object is passed as an argument.
        // When using JSON Web Tokens for sessions, the JWT payload (token) is provided instead.
        async session({ session, token, user }) {
            // const favoriteTattooIds = await UserService.getFavoriteTattooIds(user);
            // const favoriteTattooIds = await UserService.getFavoriteTattooIds(user);

            if (session && session.user) {
            }
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role,
                },
            };
        },
    },

    events: {
        // We also have "events"
        // what's the difference between callbacks and events?
        // callbacks modify the default behavior, events can be used to add on top of the default behavior
        // async signIn(message) { /* on successful sign in */ },
        // async signOut(message) { /* on signout */ },
        // async signIn(message) {
        //     console.log('from sigin', { message });
        //     // REVIEW: why trigger is not available here either???
        //     /* user created */
        // },
        // async createUser(message) {
        //     console.log('from createUser', { message });
        //     /* user created */
        // },
        // async updateUser(message) { /* user updated - e.g. their email was verified */ },
        // async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
        // async session(message) { /* session is active */ },
    },
    // https://dev.to/mfts/how-to-send-a-warm-welcome-email-with-resend-next-auth-and-react-email-576f
    // events: {
    //     async createUser(message) {
    //       const params = {
    //         user: {
    //           name: message.user.name,
    //           email: message.user.email,
    //         },
    //       };
    //       await sendWelcomeEmail(params); // <-- send welcome email
    //     }
    //   },

    //REVIEW: When you supply a session prop in _app.js, useSession won't show a loading state,
    // as it'll already have the session available. In this way, you can provide a more seamless user experience.
    // https://next-auth.js.org/tutorials/securing-pages-and-api-routes
} satisfies NextAuthConfig;

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    unstable_update,
} = NextAuth({
    // ...authMiddlewareOptions,
    ...authOptions,
});

function html(params: { url: string; host: string; theme: any }) {
    const { url, host, theme } = params;

    const brandColor = theme.brandColor || '#346df1';
    const color = {
        background: '#f9f9f9',
        text: '#444',
        mainBackground: '#fff',
        buttonBackground: brandColor,
        buttonBorder: brandColor,
        buttonText: theme.buttonText || '#fff',
    };

    return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Entra en <strong>${appConfig.general.appName}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}
