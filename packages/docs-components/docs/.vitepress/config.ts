import { resolve } from 'path'
import WindiCSS from 'vite-plugin-windicss'

module.exports = {
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
      }, {
        text: 'Components',
        items: [
          { text: 'InlinePlayground', link: '/components/inline-playground' },
          { text: 'EmbedPlayground', link: '/components/embed-playground' },
        ],
      }
    ],
  },
  vite: {
    plugins: [
      WindiCSS({
        scan: {
          dirs: ['./', '../src'],
        },
      })
    ],
    resolve: {
      alias: {
        '@es-js/docs-components': resolve(__dirname, '../../src'),
      },
      dedupe: ['vue'], // avoid error when using dependencies that also use Vue
    }
  }
}
