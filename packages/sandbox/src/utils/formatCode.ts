import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'

export function formatCode(code: string) {
	return prettier.format(code, {
		parser: 'babel',
		plugins: [parserBabel],
		semi: false,
	})
}
