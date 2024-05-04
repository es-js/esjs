import { resolve } from 'path'

export default {
	title: 'EsJS Docs Components',
	description: 'Componentes para la documentación de EsJS',
	themeConfig: {
		repo: 'https://github.com/es-js/esjs',
		outline: [1, 3],
		sidebar: [
			{
				text: '@es-js/docs-components',
				items: [
					{ text: 'Introduction', link: '/' },
					{ text: 'Getting Started', link: '/guide/' },
				],
			},
			{
				text: 'Components',
				items: [
					{ text: 'InlinePlayground', link: '/components/inline-playground' },
					{ text: 'EmbedPlayground', link: '/components/embed-playground' },
					{ text: 'EsEjecutar', link: '/components/es-ejecutar' },
				],
			},
		],
	},
	vite: {
		resolve: {
			alias: {
				'@es-js/docs-components': resolve(__dirname, '../../src'),
			},
			dedupe: ['vue'], // avoid error when using dependencies that also use Vue
		},
	},
}
