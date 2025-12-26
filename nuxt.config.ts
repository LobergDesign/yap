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
  weatherModule: {
    latitude: 55.676098, // Copenhagen
    longitude: 12.568337, // Copenhagen
    iconSize: 'clamp(30px, 5vw, 50px)',
  },
  // Deployment preset (change to 'netlify' if using Netlify)
  nitro: {
    preset: 'vercel',
  },

  // Route-level caching with SWR
  routeRules: {
    // Cache all pages for 2 hours in production only
    '/**':
      process.env.NODE_ENV === 'production'
        ? {
            swr: 7200,
          }
        : {},
    // Don't cache API routes (called during page regeneration only)
    'server/api/**': {
      cache: false,
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    'nuxt-icons',
    '@nuxt/image',
    'nuxt-security',
    '@nuxt/hints',
    'nuxt-weather-module',
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
          additionalData: `
            @use "@/assets/scss/_vars.scss" as *;
          `,
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
  googleFonts: {
    families: {
      'Nunito Sans': {
        wght: '200..900',
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
        'style-src': ["'self'", "'unsafe-inline'"],
        'connect-src': ["'self'", 'https://api.open-meteo.com'],
        'script-src': ["'self'", "'unsafe-inline'"],
      },
      strictTransportSecurity: {
        maxAge: 31536000, // 1 year
        includeSubdomains: true,
      },
    },
  },
  imports: {
    dirs: [
      // Scan top-level composables
      '~/composables',
      '~/composables/**',
    ],
  },
});
