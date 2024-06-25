import { type CompileOptions } from '@es-js/core'
import { EssucraseCompiler } from '@es-js/core/compiler/essucrase.compiler'

let putout;

export const useCompiler = () => {
  async function getPutout() {
    if (!putout) {
      putout = await import('https://esm.sh/@putout/bundle@2')
    }

    return putout
  }

  async function compile(code: string, options: CompileOptions) {
    const compiler = new EssucraseCompiler(await getPutout())
    return compiler?.compile(code, options) ?? code
  }

  return {
    compile,
  }
}
