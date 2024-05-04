import { compile as compileEsbabel } from '@es-js/esbabel'
import { transform } from '@es-js/compiler'
import type { Transform } from '@es-js/compiler/dist/types/Options'
import { applyPlugins } from './applyPlugins'

export type AvailableLanguages = 'esjs' | 'js'

export interface CompileOptions {
	reverse?: boolean
	from?: AvailableLanguages
	to?: AvailableLanguages
	compiler?: 'essucrase' | 'esbabel'
}

export function compile(
	code: string,
	options: CompileOptions = {
    from: 'esjs',
    to: 'js',
    compiler: 'esbabel',
  } as CompileOptions,
) {
	if (options.compiler === 'esbabel') {
		return compileEsbabel(code, options.to === 'esjs')
	}

  let codeToCompile = code

  if (options.from === 'esjs' || options.to === 'esjs') {
    codeToCompile = applyPlugins(compileEssucrase(code, { to: 'js' }), options.to === 'esjs')
  }

  const compiled = compileEssucrase(codeToCompile, { to: options.to })

  if (options.to === 'js') {
    return applyPlugins(compiled)
  }

  return compiled
}

function compileEssucrase(code: string, options: CompileOptions) {
  const transforms: Array<Transform> = ['esjs']
  if (options.to === 'esjs') {
    transforms.push('js2esjs')
  }

  return transform(code, { transforms }).code
}

export { compile as transpile }
