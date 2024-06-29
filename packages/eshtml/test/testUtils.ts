import { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import htmlParser from 'prettier/parser-html'

export async function formatWithPrettier(
	code: string,
	options?: Partial<Options>,
) {
	return prettier.format(code, {
		parser: 'html',
		plugins: [htmlParser],
		semi: false,
		...options,
	})
}
