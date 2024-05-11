import {
	replaceExpressionMethods,
	replaceInstanceof,
	replaceObjectStaticMethods,
	replaceObjects,
	replaceObjectCall,
} from '../utils'

export const report = () => 'Converts Matriz methods to JavaScript'

export const methods = new Map<string, string>([
	['posicion', 'at'],
	['concatenar', 'concat'],
	['copiarDentro', 'copyWithin'],
	['entradas', 'entries'],
	['cada', 'every'],
	['llenar', 'fill'],
	['filtrar', 'filter'],
	['buscar', 'find'],
	['buscarIndice', 'findIndex'],
	['buscarUltimo', 'findLast'],
	['buscarUltimoIndice', 'findLastIndex'],
	['plano', 'flat'],
	['planoMapear', 'flatMap'],
	['paraCada', 'forEach'],
	['grupo', 'group'],
	['grupoAMapear', 'groupToMap'],
	['incluye', 'includes'],
	['indiceDe', 'indexOf'],
	['juntar', 'join'],
	['claves', 'keys'],
	['ultimoIndiceDe', 'lastIndexOf'],
	['mapear', 'map'],
	['sacar', 'pop'],
	['agregar', 'push'],
	['reducir', 'reduce'],
	['reducirDerecha', 'reduceRight'],
	['reverso', 'reverse'],
	['sacarPrimero', 'shift'],
	['rodaja', 'slice'],
	['algun', 'some'],
	['ordenar', 'sort'],
	['empalmar', 'splice'],
	['aCadenaLocalizada', 'toLocaleString'],
	['aCadena', 'toString'],
	['agregarInicio', 'unshift'],
	['valores', 'values'],
])

export const staticMethods = new Map<string, string>([
	['desde', 'from'],
	['desdeAsincrono', 'fromAsync'],
	['esMatriz', 'isArray'],
	['de', 'of'],
])

export const objects = new Map<string, string>([
	['Arreglo', 'Array'],
	['Matriz', 'Array'],
])

export function replace() {
	return {
		...replaceObjectStaticMethods({
			from: 'Matriz',
			to: 'Array',
			methods: staticMethods,
		}),
		...replaceExpressionMethods({
			methods,
		}),
		...replaceInstanceof({
			from: 'Matriz',
			to: 'Array',
		}),
		...replaceInstanceof({
			from: 'Arreglo',
			to: 'Array',
		}),
		...replaceObjects({
			objects,
		}),
	}
}
