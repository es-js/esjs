import { compile } from '@es-js/esvue'
import type { AstPath, ParserOptions } from 'prettier'
import { format } from 'prettier'
import * as prettierHtmlParser from 'prettier/plugins/html'

const htmlParser = prettierHtmlParser.parsers.html

function locStart(node: any) {
  return node.start
}

function locEnd(node: any) {
  return node.end
}

const EsVuePlugin = {
  languages: [
    {
      name: 'EsVue',
      parsers: ['esvue'],
      extensions: ['.esvue'],
      vscodeLanguageIds: ['esvue'],
    },
  ],
  parsers: {
    esvue: {
      ...htmlParser,
      preprocess: (text: string, options: ParserOptions<any>) => {
        text = text.trim()

        const vue = compile(text, {
          from: 'esvue',
          to: 'vue',
        })

        // Taken from https://github.com/sveltejs/prettier-plugin-svelte/blob/9060efde88d3a70560ba663b08217c79dc11d631/src/index.ts#L54
        // Prettier sets the preprocessed text as the originalText in case
        // the EsVue formatter is called directly. In case it's called
        // as an embedded parser (for example when there's a EsVue code block
        // inside markdown), the originalText is not updated after preprocessing.
        // Therefore we do it ourselves here.
        options.originalText = text

        return vue
      },
      locStart,
      locEnd,
      astFormat: 'esvue',
    },
  },
  printers: {
    esvue: {
      print: async (
        path: AstPath<any>,
        options: ParserOptions<any>,
        print: any,
      ) => {
        const vue = options.originalText

        const formatted = await format(vue, {
          ...options,
          parser: 'vue',
          semi: false,
        })

        return compile(formatted, {
          from: 'vue',
          to: 'esvue',
        })
      },
    },
  },
}

export default EsVuePlugin
