import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'

import 'uno.css'

const app = createApp(App)

loadFonts()

app
  .use(vuetify)
  .mount('#app')
