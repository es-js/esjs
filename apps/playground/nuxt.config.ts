// https://nuxt.com/docs/api/configuration/nuxt-config
import esjsSyntax from '@es-js/language-tools/esjs.tmLanguage.json' assert { type: 'json' }

export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    '@nuxtjs/robots',
    'nuxt-gtag',
    '@nuxtjs/supabase',
    '@davestewart/nuxt-scrollbar',
    '@nuxt/content',
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
      cookieRedirect: true,
    },
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'vitesse-dark',
      },
      preload: [
        {
          ...esjsSyntax,
          id: 'esjs',
          name: 'esjs',
          scopeName: 'source.esjs',
        },
      ],
    },
  },
})
