// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Server-only runtime config (not exposed to client)
  runtimeConfig: {
    graphqlHost: process.env.GQL_HOST,
    graphqlToken: process.env.GQL_TOKEN,
    revalidateSecret: process.env.REVALIDATE_SECRET,
  },

  // Deployment preset (change to 'netlify' if using Netlify)
  nitro: {
    preset: 'vercel',
  },

  // Route-level caching with SWR
  routeRules: {
    // Cache all pages for 2 hours (7200 seconds)
    '/**': {
      swr: 7200,
    },
    // Don't cache API routes (called during page regeneration only)
    '/api/**': {
      cache: false,
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    'nuxt-security',
  ],
  css: ['~/assets/scss/main.scss'],
  image: {
    providers: {
      hygraph: {
        baseurl: 'https://media.graphassets.com',
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Uncomment when you have global vars/mixins:
          // additionalData: `
          //   @use "@/assets/scss/settings/vars.scss" as *;
          //   @use "@/assets/scss/tools/mixins.scss" as *;
          // `,
        },
      },
    },
  },

  app: {
    head: {
      title: 'Yet another portfolio',
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  // security
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'https://media.graphassets.com', // hygraph images
        ],
        'connect-src': [
          "'self'", // API calls to /api/cms
        ],
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
      },
    },
  },
});
