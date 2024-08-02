// https://nuxt.com/docs/api/configuration/nuxt-config
import esjsSyntax from '@es-js/language-tools/esjs.tmLanguage.json' assert { type: 'json' }

const isDev = process.env.NODE_ENV === "development";

export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@vueuse/nuxt',
    'nuxt-monaco-editor',
    '@nuxtjs/robots',
    'nuxt-gtag',
    '@nuxtjs/supabase',
    '@davestewart/nuxt-scrollbar',
    '@nuxt/content',
    // '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
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
      script: [
        ...(isDev ?
          [] :
          [
            {
              children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${process.env.NUXT_CLARITY_ID}");`
            }
          ]
        ),
      ]
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

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui'
  },

  compatibilityDate: '2024-07-31',

  imports: {
    transform: {
      exclude: [/\bsandbox\b/],
    },
  },
})
