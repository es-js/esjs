import { compile as EsCSSCompile } from '@es-js/escss'
import type { AstPath, ParserOptions } from 'prettier'
import { format } from 'prettier'
import * as prettierCssParser from 'prettier/plugins/postcss'

const cssParser = prettierCssParser.parsers.css

function locStart(node: any) {
  return node.start
}

function locEnd(node: any) {
  return node.end
}

const EsCSSPlugin = {
  languages: [
    {
      name: 'EsCSS',
      parsers: ['escss'],
      extensions: ['.escss'],
      vscodeLanguageIds: ['escss'],
    },
  ],
  parsers: {
    escss: {
      ...cssParser,
      preprocess: (text: string, options: ParserOptions<any>) => {
        text = text.trim()

        // Convert EsCSS to CSS for formatting
        const css = EsCSSCompile(text, {
          from: 'escss',
          to: 'css',
        })

        // Preserve the original text for the printer
        // Taken from https://github.com/sveltejs/prettier-plugin-svelte/blob/9060efde88d3a70560ba663b08217c79dc11d631/src/index.ts#L54
        // Prettier sets the preprocessed text as the originalText in case
        // the EsCSS formatter is called directly. In case it's called
        // as an embedded parser (for example when there's an EsCSS code block
        // inside markdown), the originalText is not updated after preprocessing.
        // Therefore we do it ourselves here.
        options.originalText = text

        return css
      },
      locStart,
      locEnd,
      astFormat: 'escss',
    },
  },
  printers: {
    escss: {
      print: async (
        path: AstPath<any>,
        options: ParserOptions<any>,
        print: any
      ) => {
        // Taken from: https://github.com/ony3000/prettier-plugin-classnames/blob/master/src/packages/v3-plugin/printers.ts
        // @ts-ignore
        const comments = options[Symbol.for('comments')]
        if (comments && Array.isArray(comments)) {
          for (const comment of comments) {
            comment.printed = true
          }
        }

        const css = options.originalText

        // Format as CSS first
        const formatted = await format(css, {
          ...options,
          parser: 'css',
        })

        // Convert back to EsCSS
        return EsCSSCompile(formatted, {
          from: 'css',
          to: 'escss',
        })
      },
    },
  },
}

export default EsCSSPlugin
