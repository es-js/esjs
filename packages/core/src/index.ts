import putout from '@putout/bundle'
import { EsbabelCompiler } from './compiler/esbabel.compiler'
import { EssucraseCompiler } from './compiler/essucrase.compiler'

export type AvailableLanguages = 'esjs' | 'js'

export interface Compiler {
  compile(code: string, options: CompileOptions): string
}

export interface CompileOptions {
  from?: AvailableLanguages
  to?: AvailableLanguages
  compiler?: 'essucrase' | 'esbabel'
}

export function compile(
  code: string,
  options: CompileOptions = {
    from: 'esjs',
    to: 'js',
    compiler: 'essucrase',
  } as CompileOptions,
) {
  if (!options.from) {
    options.from = 'esjs'
  }

  if (!options.to) {
    options.to = 'js'
  }

  if (!options.compiler) {
    options.compiler = 'essucrase'
  }

  const compiler: Compiler =
    options?.compiler === 'essucrase'
      ? new EssucraseCompiler(putout)
      : new EsbabelCompiler()

  return compiler.compile(code, options)
}

export { compile as transpile }
