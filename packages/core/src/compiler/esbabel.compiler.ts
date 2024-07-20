import { compile } from '@es-js/esbabel'
import type { CompileOptions } from '../index'
import type { Compiler } from '../index'

export class EsbabelCompiler implements Compiler {
  compile(code: string, options: CompileOptions) {
    return compile(code, options.to === 'esjs')
  }
}
