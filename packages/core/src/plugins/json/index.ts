import { replaceObjectStaticMethods } from '../utils'

export const report = () => 'Converts Fecha methods to JavaScript'

export const methods = new Map<string, string>([])

export const staticMethods = new Map<string, string>([
	['esJSONCrudo', 'isRawJSON'],
	['analizar', 'parse'],
	['JSONCrudo', 'rawJSON'],
	['aCadenaJSON', 'stringify'],
])

export const objects = new Map<string, string>([['Fecha', 'Date']])

export function replace() {
	return {
		...replaceObjectStaticMethods({
			from: 'JSON',
			to: 'JSON',
			methods: staticMethods,
		}),
	}
}
