import DefaultTheme from 'vitepress/theme'
import DocsComponents from '@es-js/docs-components'

export default {
	...DefaultTheme,
	enhanceApp({ app }) {
		app.use(DocsComponents)
	},
}
