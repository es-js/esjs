// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxthq/ui',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    '@nuxtjs/robots',
    'nuxt-gtag',
    '@nuxtjs/supabase',
  ],

  runtimeConfig: {
    loginEnabled: process.env.LOGIN_ENABLED === 'true',
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
    redirectOptions: {
      login: '/',
      callback: '/confirm',
      exclude: [],
    }
  }
})
