// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    '@nuxtjs/robots',
    'nuxt-gtag',
    '@nuxtjs/supabase',
  ],

  runtimeConfig: {
    public: {
    },
  },

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

  gtag: {
    id: process.env.VITE_GTAG_ID,
  },

  supabase: {
    redirect: false,
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: [],
    },
  },
})
