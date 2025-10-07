// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./layers/data'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    'nuxt-graphql-client',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  css: ['~/assets/scss/main.scss'],
  'graphql-client': {
    codegen: {
      avoidOptionals: true,
    },
  },

  runtimeConfig: {
    public: {
      GQL_HOST:
        'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clfo9ihvf0i4h01ugdp6i5rf1/master',
    },
  },
})
