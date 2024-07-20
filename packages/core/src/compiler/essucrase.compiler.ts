import { transform, type Transform } from '@es-js/compiler'
import { plugins, setToEsJS } from '../plugins'
import type { Compiler, CompileOptions } from '../index'

export class EssucraseCompiler implements Compiler {
  constructor(private putout: any | undefined = undefined) {}

  compile(code: string, options: CompileOptions) {
    let codeToCompile = code

    if (options.from === 'esjs' || options.to === 'esjs') {
      codeToCompile = this.applyPlugins(
        this.compileEssucrase(code, { to: 'js' }),
        options.to === 'esjs',
      )
    }

    const compiled = this.compileEssucrase(codeToCompile, { to: options.to })

    if (options.to === 'js') {
      return this.applyPlugins(compiled)
    }

    return compiled
  }

  compileEssucrase(code: string, options?: CompileOptions): string {
    const transforms: Array<Transform> = ['esjs']
    if (options?.to === 'esjs') {
      transforms.push('js2esjs')
    }

    return transform(code, { transforms }).code
  }

  applyPlugins(code: string, toEsJS?: boolean): string {
    if (!this.putout) {
      return code
    }

    const ast = this.putout.parse(code, {
      printer: 'recast',
    })

    setToEsJS(toEsJS ?? false)

    this.putout.transform(ast, code, {
      plugins,
    })

    return this.putout.print(ast, {
      printer: 'recast',
    })
  }
}
