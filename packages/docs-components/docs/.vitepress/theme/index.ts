import DefaultTheme from 'vitepress/theme';
import DocsComponents from '@es-js/docs-components'

import 'virtual:windi.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(DocsComponents)
  }
}
