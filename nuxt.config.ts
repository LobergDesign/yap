export default defineNuxtConfig({
  compatibilityDate: '2026-09-11',
  devtools: { enabled: true },
  runtimeConfig: {
    graphqlHost: process.env.GQL_HOST,
    graphqlToken: process.env.GQL_TOKEN,
  },
  nitro: {
    preset: process.env.NITRO_PRESET ?? 'vercel',
    // graphql 17's conditional exports confuse file tracing: only .mjs gets copied, but Vercel's Node resolves index.js
    externals: { inline: ['graphql'] },
    future: {
      nativeSWR: true,
    },
  },
  sourcemap: {
    client: true,
    server: true,
  },

  $production: {
    routeRules: {
      '/**': { isr: 7200 },
      '/api/weather': { isr: 300 },
    },
  },
  modules: ['@nuxt/eslint', 'nuxt-icons', '@nuxt/fonts', 'nuxt-security'],
  css: ['~/assets/scss/main.scss', '~/assets/scss/settings-theme.scss'],
  // image: {
  //   providers: {
  //     hygraph: {
  //       baseurl:
  //         'https://eu-central-1-shared-euc1-02.graphassets.com/AO0xo1wOBRUu1cYgu6oD9z',
  //     },
  //   },
  // },

  experimental: {
    payloadExtraction: 'client',
    prefetchPreloadTags: true,
    watcher: 'builder',
    typedPages: true,
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
    presets: [{ from: 'gsap', imports: ['gsap'] }],
    dirs: [
      // Scan top-level composables
      '~/composables',
      '~/composables/**',
    ],
  },
});
