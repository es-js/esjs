import { compile } from '@es-js/core'
import { readFile } from 'fs/promises'
import { fileURLToPath, pathToFileURL } from 'url'

const esjsCompile = (source: string, filename: string) =>
	compile(source, {
		compiler: 'essucrase',
	})

const baseURL = pathToFileURL(process.cwd() + '/').href

const extensionsRegex = /\.esjs$/

export async function resolve(
	specifier: string,
	context: any,
	nextResolve: any,
) {
	const { parentURL = baseURL } = context

	if (extensionsRegex.test(specifier)) {
		return {
			shortCircuit: true,
			url: new URL(specifier, parentURL).href,
		}
	}

	// Let Node.js handle all other specifiers.
	return nextResolve(specifier, context)
}

export async function load(url: string, context: any, nextLoad: any) {
	if (extensionsRegex.test(url)) {
		const transformedSource = esjsCompile(
			await readFile(fileURLToPath(url), 'utf8'),
			fileURLToPath(url),
		)

		return {
			format: 'module',
			shortCircuit: true,
			source: transformedSource,
		}
	}

	// Let Node.js handle all other URLs.
	return nextLoad(url, context)
}
