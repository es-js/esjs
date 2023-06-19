import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import FloatingVue from 'floating-vue'
import App from './App.vue'
import { loadFonts } from '@/plugins/webfontloader'

import '@/styles/main.css'
import 'floating-vue/dist/style.css'
import 'splitpanes/dist/splitpanes.css'

const app = createApp(App)

async function init() {
  await loadFonts()

  app
    .use(VueGtag, {
      config: {
        id: import.meta.env.VITE_GTAG_ID,
      },
    })
    .use(FloatingVue, {
      themes: {
        tooltip: {
          hideTriggers: events => [...events],
        },
      },
    })
    .mount('#app')
}

init()

