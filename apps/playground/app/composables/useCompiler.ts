import { type CompileOptions } from '@es-js/core'
import { EssucraseCompiler } from '@es-js/core/compiler/essucrase.compiler'
import putout from '@putout/bundle'

export const useCompiler = () => {
  function compile(code: string, options: CompileOptions) {
    const compiler = new EssucraseCompiler(putout)
    return compiler?.compile(code, options) ?? code
  }

  return {
    compile,
  }
}
