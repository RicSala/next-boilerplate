export const config = {
    routes: {
        /**
         *  Private route prefixes
         */
        private: {
            app: '/app',
        },

        settings: '/settings',

        /**
         * An array of routes that are used for the auth
         * @type {{signin: string, signup: string, recover: string}}
         */
        auth: {
            signin: '/signin',
            signup: '/signup',
            recover: '/recover',
        },

        /**
         * This is the prefix for all the auth api routes
         * @type {string}
         */
        apiRouteAuthPrefix: '/api/auth',

        /**
         * This is the page where the user will be redirected after login
         */
        defaultLogingRedirect: '/',
    },

    general: {
        appName: 'CoverAI',
    },

    colors: {
        backgroundLight: '0deg 55% 95%',
        backgroundDark: '0deg 85% 15%',
        primaryLight: 'red',
        primaryDark: 'red',
        lightThemeBackGround: 'red',
        secondaryLight: 'purple',
        secondaryDark: 'purple',
        accentLight: 'orange',
        accentDark: 'orange',
        destructiveLight: 'red',
        destructiveDark: 'red',
        mutedDark: 'grey',
        infoLight: 'yellow',
        infoDark: 'yellow',
    },

    blog: {
        // If you are not going to use the blog, just turn it off by wrapping the directory with parenthesys (blog)
        // That will make the directory "not a route"
        title: 'Las mejores herramientas para buscar trabajo',
        subtitle:
            'Utiliza la tecnología para encontrarlo antes y destacar sobre otros candidatos',
    },

    // ### CUSTOMER SUPPORT
    support: {
        cripsId: 'c597d7de-19fe-48d5-9651-928bc23f3fb8',

        routesWithSupport: ['/'],
    },

    // ### FILE UPLOADS
    uploads: {},

    // ### EMAIL
    email: {
        subdomain: '',

        fromNoReply: 'Shipper <noreply@ricardosala.com>',

        fromAdmin: `Ricardo <ricardo@mg.shipper.com>`,

        supportEmail: 'ricardo@mg.shipper.com',

        forwardRepliesTo: 'ricardo@grouz.io',
        testSubdomain: 'sandboxb2328a93eff54cb99ceee2827f1dcd16.mailgun.org',
    },

    // ### AUTH
    auth: {
        authMethods: {
            credentials: false,
            google: true,
            email: true,
        },
    },

    // ### STRINGS
    strings: {
        metas: {
            title: 'Shipper App',
            description: 'Ship faster with Shipper',
        },
        toasts: {
            welcomeToastDescription: 'Continua navegando',
            welcomeToastTitle: `Bienvenido a Shipper`,
            linkSentToastDescription:
                'Te hemos enviado un link para acceder desde tu correo',
            linkSentToastTitle: `Link Enviado · REVISA TU CORREO 📧`,
        },
    },

    // ### PRODUCTS

    productIds: [
        'prod_PHIj3m00ORtr4K',
        'prod_PHIxsJfB876WpJ',
        'prod_OgYwaGXuY8itev',
    ],

    // ### PLANS
    plans: [
        {
            featured: false,
            name: 'Basic',
            description: 'Basic Plan yo!',
            price: '$10/month',
            stripePriceId: 'price_1NpoWVInQyVRXAJyBgaid9PD',
            features: [
                { name: 'this is a test' },
                { name: 'this is a test' },
                { name: 'this is a test' },
            ],
        },
        {
            name: 'Pro',
            description: 'Pro Plan yo!',
            price: '$49/month',
            stripePriceId: 'price_456',
            features: [
                { name: 'this is a test' },
                { name: 'this is a test' },
                { name: 'this is a test' },
            ],
        },
    ],
};
