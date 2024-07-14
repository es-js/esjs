import { Opciones } from '../index'
import { getPage } from './getPage'

export function generatePagesInput(
	input: any,
	options: Opciones,
): Record<string, string> {
	const newInput: Record<string, string> = { ...input }

	for (const pageName of Object.keys(options?.paginas || {})) {
		const page = getPage(options, pageName)
		if (page && !newInput[pageName]) {
			const pagePath = `${pageName}.html`
			newInput[pageName] = pagePath
		}
	}

	return newInput
}
