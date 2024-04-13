import { compile as compileEsbabel } from '@es-js/esbabel'

export type AvailableLanguages = 'esjs' | 'js'

export interface CompileOptions {
  reverse?: boolean
  from?: AvailableLanguages
  to?: AvailableLanguages
  compiler?: 'essucrase' | 'esbabel'
}

export function compile(code: string, options: CompileOptions = {} as CompileOptions) {
  if (!options.from)
    options.from = options.reverse ? 'js' : 'esjs'

  if (!options.to)
    options.to = options.reverse ? 'esjs' : 'js'

  if (!options.compiler)
    options.compiler = 'esbabel'

  if (options.compiler === 'esbabel')
    return compileEsbabel(code, options.to === 'esjs')

  return ''
}

export { compile as transpile }
