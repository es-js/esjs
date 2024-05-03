import {
	replaceExpressionMethods,
	replaceObjectStaticMethods,
	replaceObjects,
} from '../utils'

export const report = () => 'Converts Promesa methods to JavaScript'

export const methods = new Map<string, string>([
	['capturar', 'catch'],
	['finalmente', 'finally'],
	['luego', 'then'],
])

export const staticMethods = new Map<string, string>([
	['todos', 'all'],
	['todosTerminados', 'allSettled'],
	['cualquiera', 'any'],
	['carrera', 'race'],
	['rechaza', 'reject'],
	['resuelve', 'resolve'],
])

export const objects = new Map<string, string>([['Promesa', 'Promise']])

export function replace() {
	return {
		...replaceObjectStaticMethods({
			from: 'Promesa',
			to: 'Promise',
			methods: staticMethods,
		}),
		...replaceExpressionMethods({
			methods,
		}),
		...replaceObjects({
			objects,
		}),
	}
}
