import {
	replaceGlobalMethods,
	replaceObjectStaticMethods,
	replaceInstanceof,
	replaceExpressionMethods,
	replaceObjects,
} from '../utils'

export const report = () => 'Converts Numero methods to JavaScript'

export const methods = new Map<string, string>([
	['aExponencial', 'toExponential'],
	['fijarDecimales', 'toFixed'],
	['aCadenaLocalizada', 'toLocaleString'],
	['aPrecision', 'toPrecision'],
	['aCadena', 'toString'],
	['valorDe', 'valueOf'],
])

export const staticMethods = new Map<string, string>([
	['esFinito', 'isFinite'],
	['esEntero', 'isInteger'],
	['esNan', 'isNaN'],
	['esEnteroSeguro', 'isSafeInteger'],
	['interpretarDecimal', 'parseFloat'],
	['interpretarEntero', 'parseInt'],
])

export const objects = new Map<string, string>([
	['Número', 'Number'],
	['Numero', 'Number'],
])

export const globalMethods = new Map<string, string>([
	['interpretarEntero', 'parseInt'],
	['interpretarDecimal', 'parseFloat'],
])

export function replace() {
	return {
		...replaceObjectStaticMethods({
			from: 'Número',
			to: 'Number',
			methods: staticMethods,
		}),
		...replaceObjectStaticMethods({
			from: 'Numero',
			to: 'Number',
			methods: staticMethods,
		}),
		...replaceExpressionMethods({
			methods,
		}),
		...replaceInstanceof({
			from: 'Numero',
			to: 'Number',
		}),
		...replaceObjects({
			objects,
		}),
		...replaceGlobalMethods({
			methods: globalMethods,
		}),
	}
}
