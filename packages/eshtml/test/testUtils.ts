import { Options } from 'prettier'
import htmlParser from 'prettier/parser-html'
import prettier from 'prettier/standalone'
import htmlMinifier from 'html-minifier'

export async function formatWithPrettier(
	code: string,
	options?: Partial<Options>,
): Promise<string> {
	return prettier.format(code, {
		parser: 'html',
		// @ts-ignore
		plugins: [htmlParser],
		semi: false,
		...options,
	})
}

export function minifyHtml(code: string): string {
	return htmlMinifier.minify(code, {
		collapseWhitespace: true,
		removeComments: true,
	})
}

export function compareHtml(code1: string, code2: string): boolean {
	const formatted1 = minifyHtml(code1)
	const formatted2 = minifyHtml(code2)
	return formatted1 === formatted2
}
