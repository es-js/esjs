import { transpile } from '@es-js/core'
import type { AstPath, ParserOptions } from 'prettier'
import { format } from 'prettier'
import * as prettierPluginBabel from 'prettier/plugins/babel'

const babelParser = prettierPluginBabel.parsers.babel

function locStart(node: any) {
  return node.start
}

function locEnd(node: any) {
  return node.end
}

const EsJSPlugin = {
  languages: [
    {
      name: 'EsJS',
      parsers: ['esjs'],
      extensions: ['.esjs'],
      vscodeLanguageIds: ['esjs'],
    },
  ],
  parsers: {
    esjs: {
      ...babelParser,
      preprocess: (text: string, options: ParserOptions<any>) => {
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
      astFormat: 'esjs',
    },
  },
  printers: {
    esjs: {
      print: async (path: AstPath<any>, options: ParserOptions<any>, print: any) => {
        // Taken from: https://github.com/ony3000/prettier-plugin-classnames/blob/master/src/packages/v3-plugin/printers.ts
        // @ts-ignore
        const comments = options[Symbol.for('comments')];
        if (comments && Array.isArray(comments)) {
          comments.forEach((comment: any) => {
            comment.printed = true;
          });
        }

        const js = options.originalText

        const jsFormatted = await format(js, {
          ...options,
          parser: 'babel',
        })

        const esjs = transpile(jsFormatted, true)

        return esjs
      },
    },
  },
}

export default EsJSPlugin
