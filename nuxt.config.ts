import Sonda from 'sonda/nuxt';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    graphqlHost: process.env.GQL_HOST,
    graphqlToken: process.env.GQL_TOKEN,
  },
  nitro: {
    preset: process.env.NITRO_PRESET ?? 'vercel',
    future: {
      nativeSWR: true,
    },
  },
  sourcemap: {
    client: true,
    server: true,
  },

  routeRules: {
    // Cache all pages for 2 hours in production only
    '/**':
      process.env.NODE_ENV === 'production'
        ? {
            isr: 7200,
          }
        : {},
    // Don't cache API routes (called during page regeneration only)
    '/api/**': {
      cache: false,
      isr: false,
    },
  },
  modules: [
    '@nuxt/eslint',
    'nuxt-icons',
    '@nuxt/image',
    '@nuxt/fonts',
    'nuxt-security',
    '@tresjs/nuxt',
    Sonda({
      server: true,
    }),
  ],
  css: ['~/assets/scss/main.scss', '~/assets/scss/settings-theme.scss'],
  image: {
    providers: {
      hygraph: {
        baseurl:
          'https://eu-central-1-shared-euc1-02.graphassets.com/AO0xo1wOBRUu1cYgu6oD9z',
      },
    },
  },

  experimental: {
    payloadExtraction: 'client',
    // Forward the destination route's preload hints (Hygraph hero images, etc.)
    // into the current document as `rel="prefetch"` when a NuxtLink prefetches.
    prefetchPreloadTags: true,
    // Reuse Vite's chokidar watcher instead of spinning up a second one.
    // Becomes the default under compatibilityVersion 5.
    watcher: 'builder',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/_toolbox.scss" as *;
          `,
        },
      },
    },
    optimizeDeps: {
      include: [
        'three',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'isomorphic-dompurify',
        'gsap',
        'gsap/ScrollTrigger',
        'gsap/SplitText',
      ],
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
  fonts: {
    families: [
      {
        name: 'Nunito Sans',
        provider: 'google',
        weights: ['200 900'],
      },
      {
        name: 'ZT Nature Variable',
        src: '/ZT Nature Variable-VF.ttf',
        weights: ['200 900'],
      },
      {
        name: 'ZT Nature Variable Italic',
        src: '/ZT Nature Variable Italic-VF.ttf',
        weights: ['200 900'],
        styles: ['italic'],
      },
    ],
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'base-uri': ["'self'"],
        'object-src': ["'none'"],
        'frame-ancestors': ["'none'"],
        'img-src': [
          "'self'",
          'data:',
          'https://eu-central-1-shared-euc1-02.graphassets.com/AO0xo1wOBRUu1cYgu6oD9z/',
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
        ],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
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
