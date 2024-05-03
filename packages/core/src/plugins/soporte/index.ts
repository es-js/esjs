export const report = () => 'Converts support functions to JavaScript'

export const keywords = new Map<string, string>([
	['establecerTemporizador', 'setTimeout'],
	['establecerIntervalo', 'setInterval'],
	['esNuN', 'isNaN'],
	// TODO: Add more support functions.
])

export function replace() {
	return {
		...Object.fromEntries(
			Array.from(keywords).map(([from, to]) => {
				return [
					from,
					() => {
						return to
					},
				]
			}),
		),
	}
}
