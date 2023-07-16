import DefaultTheme from 'vitepress/theme'
import DocsComponents from '@es-js/docs-components'
import ShowcaseGrid from './components/global/ShowcaseGrid.vue'

import '@es-js/docs-components/dist/style.css'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(DocsComponents)
    app.component('ShowcaseGrid', ShowcaseGrid)
  },
}
