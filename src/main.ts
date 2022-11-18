import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { registerPlugins } from '@/plugins'

import 'uno.css'

const app = createApp(App)

registerPlugins(app)

app
  .use(vuetify)
  .mount('#app')
