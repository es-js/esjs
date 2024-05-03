import { compile as compileEsbabel } from '@es-js/esbabel'
import { transform } from '@es-js/parser'
import type { Transform } from '@es-js/parser/dist/types/Options'

export type AvailableLanguages = 'esjs' | 'js'

export interface CompileOptions {
	reverse?: boolean
	from?: AvailableLanguages
	to?: AvailableLanguages
	compiler?: 'essucrase' | 'esbabel'
}

export function compile(
	code: string,
	options: CompileOptions = {} as CompileOptions,
) {
	if (!options.from) {
		options.from = options.reverse ? 'js' : 'esjs'
	}

	if (!options.to) {
		options.to = options.reverse ? 'esjs' : 'js'
	}

	if (!options.compiler) {
		options.compiler = 'esbabel'
	}

	if (options.compiler === 'esbabel') {
		return compileEsbabel(code, options.to === 'esjs')
	}

	const transforms: Array<Transform> = ['esjs']
	if (options.to === 'esjs') {
		transforms.push('js2esjs')
	}

	return transform(code, { transforms }).code
}

export { compile as transpile }
