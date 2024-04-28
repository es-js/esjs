import { compile, CompileOptions } from '@es-js/core'
import { Compiler } from './index'

export class EsbabelCompiler implements Compiler {
  compile(code: string, options?: CompileOptions) {
    const compiled = compile(code, {
      ...options,
      compiler: 'esbabel',
    })

    return compiled
  }
}
