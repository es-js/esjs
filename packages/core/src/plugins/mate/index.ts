import { replaceObjectStaticMethods, replaceObjects } from '../utils'

export const report = () => 'Converts Mate methods to JavaScript'

export const methods = new Map<string, string>([
	['absoluto', 'abs'],
	['arcocoseno', 'acos'],
	['arcocosenoHiperbolico', 'acosh'],
	['arcoseno', 'asin'],
	['arcosenoHiperbolico', 'asinh'],
	['arcotangente', 'atan'],
	['arcotangente2', 'atan2'],
	['arcotangenteHiperbolica', 'atanh'],
	['raizCubica', 'cbrt'],
	['redondearHaciaArriba', 'ceil'],
	['cerosALaIzquierdaEn32Bits', 'clz32'],
	['coseno', 'cos'],
	['cosenoHiperbolico', 'cosh'],
	['exponencial', 'exp'],
	['exponencialMenos1', 'expm1'],
	['redondearHaciaAbajo', 'floor'],
	['redondearAComaFlotante', 'fround'],
	['hipotenusa', 'hypot'],
	['multiplicacionEntera', 'imul'],
	['logaritmo', 'log'],
	['logaritmoBase10', 'log10'],
	['logaritmoDe1Mas', 'log1p'],
	['logaritmoBase2', 'log2'],
	['maximo', 'max'],
	['minimo', 'min'],
	['potencia', 'pow'],
	['aleatorio', 'random'],
	['redondear', 'round'],
	['signo', 'sign'],
	['seno', 'sin'],
	['senoHiperbolico', 'sinh'],
	['raizCuadrada', 'sqrt'],
	['tangente', 'tan'],
	['tangenteHiperbolica', 'tanh'],
	['truncar', 'trunc'],
])

export const objects = new Map<string, string>([['Mate', 'Math']])

export function replace() {
	return {
		...replaceObjectStaticMethods({
			from: 'Mate',
			to: 'Math',
			methods,
		}),
	}
}
