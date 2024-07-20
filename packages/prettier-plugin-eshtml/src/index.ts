import { compile as EsHTMLCompile } from '@es-js/eshtml'
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

const EsHTMLPlugin = {
  languages: [
    {
      name: 'EsHTML',
      parsers: ['eshtml'],
      extensions: ['.eshtml'],
      vscodeLanguageIds: ['eshtml'],
    },
  ],
  parsers: {
    eshtml: {
      ...htmlParser,
      preprocess: (text: string, options: ParserOptions<any>) => {
        text = text.trim()

        const html = EsHTMLCompile(text, {
          from: 'eshtml',
          to: 'html',
          compileEsJS: true,
        })

        // Taken from https://github.com/sveltejs/prettier-plugin-svelte/blob/9060efde88d3a70560ba663b08217c79dc11d631/src/index.ts#L54
        // Prettier sets the preprocessed text as the originalText in case
        // the EsHTML formatter is called directly. In case it's called
        // as an embedded parser (for example when there's a EsHTML code block
        // inside markdown), the originalText is not updated after preprocessing.
        // Therefore we do it ourselves here.
        options.originalText = text

        return html
      },
      locStart,
      locEnd,
      astFormat: 'eshtml',
    },
  },
  printers: {
    eshtml: {
      print: async (
        path: AstPath<any>,
        options: ParserOptions<any>,
        print: any,
      ) => {
        const html = options.originalText

        const formatted = await format(html, {
          ...options,
          parser: 'html',
          semi: false,
        })

        return EsHTMLCompile(formatted, {
          from: 'html',
          to: 'eshtml',
          compileEsJS: true,
        })
      },
    },
  },
}

export default EsHTMLPlugin
