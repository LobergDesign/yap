export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['nuxt-graphql-client'],
  'graphql-client': {
    codegen: {
      silent: false,
    },
  },
  imports: {
    dirs: ['composables'],
  },
})
