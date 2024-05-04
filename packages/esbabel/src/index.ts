import { tokenize } from './lexer'
import { generate } from './generator'

export function compile(code: string, reverse = false): string {
	const tokens = tokenize(code)

	return generate(tokens, reverse)
}
