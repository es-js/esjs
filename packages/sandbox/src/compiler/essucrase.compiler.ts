import { compile, CompileOptions } from '@es-js/core'
import { plugins, setToEsJS } from '@es-js/core/plugins'
import { Compiler } from './index'

export class EssucraseCompiler implements Compiler {
  constructor(private putout: any) {
  }

  compile(code: string, options?: CompileOptions) {
    options = {
      ...options,
      compiler: 'essucrase',
    }

    if (options?.to === 'esjs') {
      code = this.applyPlugins(compile(code, { to: 'js', compiler: options?.compiler }), true)
    }

    const compiled = compile(code, options)

    if (options?.to === 'js') {
      return this.applyPlugins(compiled)
    }

    return compiled
  }

  applyPlugins(code: string, toEsJS?: boolean) {
    const ast = this.putout.parse(code, {
      printer: 'recast',
    })

    setToEsJS(toEsJS)

    this.putout.transform(ast, code, {
      plugins,
    })

    return this.putout.print(ast, {
      printer: 'recast',
    })
  }
}
