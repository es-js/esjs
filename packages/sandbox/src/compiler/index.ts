import { CompileOptions } from '@es-js/core'
import { EsbabelCompiler } from './esbabel.compiler'
import { EssucraseCompiler } from './essucrase.compiler'

export interface Compiler {
  compile(code: string, options?: CompileOptions): string
}

export interface SandboxCompileOptions extends CompileOptions {
  putout?: any
}

export function compileCode(code: string, options?: SandboxCompileOptions) {
  const transformer: Compiler = options?.compiler === 'essucrase'
    ? new EssucraseCompiler(options.putout)
    : new EsbabelCompiler()

  return transformer.compile(code, options)
}
