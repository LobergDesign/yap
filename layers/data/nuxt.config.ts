export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    [
      'nuxt-graphql-client',
      {
        codegen: {
          avoidOptionals: true,
        },
      },
    ],
  ],

  imports: {
    dirs: ['composables'],
  },
})
