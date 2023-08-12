// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxthq/ui',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    '@nuxtjs/robots',
  ],

  monacoEditor: {
    locale: 'es',
  },

  ui: {
    icons: ['mdi'],
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Editor EsJS',
      meta: [
        { id: 'description', name: 'description', content: 'Editor de código en línea para EsJS' },
      ],
      htmlAttrs: {
        lang: 'es',
      },
    },
  },
})
