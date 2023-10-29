import { transpile } from '@es-js/core'
import type { AstPath, Parser, ParserOptions, Printer, SupportLanguage } from 'prettier'
import { doc, format } from 'prettier'
import * as prettierPluginBabel from 'prettier/plugins/babel'

// const { join, hardline } = doc.builders

const babelParser = prettierPluginBabel.parsers.babel

function locStart(node: any) {
  return node.start
}

function locEnd(node: any) {
  return node.end
}

export const languages: Partial<SupportLanguage>[] = [
  {
    name: 'EsJS',
    parsers: ['esjs'],
    extensions: ['.esjs'],
    vscodeLanguageIds: ['esjs'],
  },
]

export const parsers: Record<string, Parser> = {
  esjs: {
    ...babelParser,

    preprocess: (text, options) => {
      text = text.trim()

      const js = transpile(text)

      // Taken from https://github.com/sveltejs/prettier-plugin-svelte/blob/9060efde88d3a70560ba663b08217c79dc11d631/src/index.ts#L54
      // Prettier sets the preprocessed text as the originalText in case
      // the EsJS formatter is called directly. In case it's called
      // as an embedded parser (for example when there's a EsJS code block
      // inside markdown), the originalText is not updated after preprocessing.
      // Therefore we do it ourselves here.
      options.originalText = text
      return js
    },

    locStart,
    locEnd,
    astFormat: 'esjs-format',
  },
}

export const printers: Record<string, Printer<any>> = {
  'esjs-format': {
    // @ts-expect-error: Prettier allow it to be async if we don't do recursively print
    print: async (path: AstPath<any>, options: ParserOptions<any>, print: any) => {
      const js = options.originalText

      const jsFormatted = await format(js, {
        ...options,
        parser: 'babel',
      })

      const esjs = transpile(jsFormatted, true)

      return esjs
      // return join(hardline, esjs.split('\n'))
    },
  },
}
