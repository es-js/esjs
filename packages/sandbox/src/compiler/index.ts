import type { CompileOptions, Compiler } from '@es-js/core'
import { EsbabelCompiler } from '@es-js/core/compiler/esbabel.compiler'
import { EssucraseCompiler } from '@es-js/core/compiler/essucrase.compiler'

export interface SandboxCompileOptions extends CompileOptions {
  putout?: any
}

export function compile(code: string, options?: SandboxCompileOptions) {
  const compiler: Compiler = options?.compiler === 'essucrase'
    ? new EssucraseCompiler(options.putout)
    : new EsbabelCompiler()

  return compiler.compile(code, options as CompileOptions)
}
