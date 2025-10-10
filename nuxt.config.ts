// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['./layers/data'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  'graphql-client': {
    codegen: {
      silent: true,
    },
  },
  modules: [
    'nuxt-graphql-client',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  css: ['~/assets/scss/main.scss'],
})
