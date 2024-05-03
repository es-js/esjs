import { replaceInstanceof, replaceObjects } from '../utils'

export const report = () => 'Converts Booleano methods to JavaScript'

export const methods = new Map<string, string>([])

export const objects = new Map<string, string>([['Booleano', 'Boolean']])

export function replace() {
	return {
		...replaceInstanceof({
			from: 'Booleano',
			to: 'Boolean',
		}),
		...replaceObjects({
			objects,
		}),
	}
}
