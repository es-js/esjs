import { createApp } from 'vue'
import VueGtag from 'vue-gtag'
import { loadWASM } from 'onigasm'
import onigasmWasm from 'onigasm/lib/onigasm.wasm?url'
import FloatingVue from 'floating-vue'
import App from './App.vue'
import { loadFonts } from '@/plugins/webfontloader'

import 'virtual:windi.css'
import 'floating-vue/dist/style.css'
import 'splitpanes/dist/splitpanes.css'
import '@/styles/main.css'

const app = createApp(App)

async function init() {
  await loadFonts()

  await loadWASM(onigasmWasm)

  app
    .use(VueGtag, {
      config: {
        id: import.meta.env.VITE_GTAG_ID,
      },
    })
    .use(FloatingVue, {
      themes: {
        dark: {
          $extend: 'menu',
          triggers: ['click'],
          autoHide: true,
          placement: 'bottom',
        },
      },
    })
    .mount('#app')
}

init()

