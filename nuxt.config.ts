// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    graphqlHost: process.env.GQL_HOST,
    graphqlToken: process.env.GQL_TOKEN,
  },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@nuxt/image'],
  css: ['~/assets/scss/main.scss'],
  image: {
    providers: {
      hygraph: {
        baseurl: 'https://media.graphassets.com',
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        '@graphql-typed-document-node/core':
          '~/shims/@graphql-typed-document-node-core.ts',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            // @use "@/assets/scss/settings/vars.scss" as *;
            // @use "@/assets/scss/tools/mixins.scss" as *;
          `,
        },
      },
    },
  },
});
