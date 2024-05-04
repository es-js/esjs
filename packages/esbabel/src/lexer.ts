import type { SingleCharacterToken, Token } from './token'
import { token } from './token'

export function tokenize(input: string): Token[] {
	let current = 0
	const tokens = []

	function finishIdentifier() {
		let name = ''
		while (
			!isWhitespace(input[current]) &&
			!isSpecialCharacter(input[current]) &&
			!isSingleCharacter(input[current]) &&
			!isTick(input[current]) &&
			!isUndefined(input[current])
		) {
			name += input[current]
			current++
		}

		return token.keyword(name)
	}

	function finishSpecialCharacter() {
		let chars = ''
		while (isSpecialCharacter(input[current])) {
			chars += input[current]
			current++
		}

		return token.specialCharacter(chars)
	}

	function finishStringLiteral(tick: string) {
		let value = input[current]
		current++

		while (input[current] && input[current] !== tick) {
			value += input[current]
			current++
		}

		if (isTick(input[current])) {
			value += input[current]
			current++
			return token.stringLiteral(value)
		}

		throw new Error('Unterminated string, expected a closing \', " or `')
	}

	function finishWhitespace() {
		let value = ''
		while (isWhitespace(input[current])) {
			value += input[current]
			current++
		}

		return token.whitespace(value)
	}

	function finishComment(value: string) {
		current += value.length
		return token.comment(value)
	}

	while (current < input.length) {
		const currentChar = input[current]

		const { isComment, end } = checkComment(input, current)
		if (isComment) {
			tokens.push(finishComment(input.slice(current, end + 1)))
			continue
		}

		if (isWhitespace(currentChar)) {
			tokens.push(finishWhitespace())
			continue
		}

		if (isTick(currentChar)) {
			tokens.push(finishStringLiteral(currentChar))
		} else if (isSingleCharacter(currentChar)) {
			tokens.push(getCharToken(currentChar))
			current++
		} else if (isSpecialCharacter(currentChar)) {
			tokens.push(finishSpecialCharacter())
		} else if (isAlpha(currentChar)) {
			tokens.push(finishIdentifier())
		} else {
			throw new Error(`Unknown character: ${currentChar}`)
		}
	}

	return tokens
}

function isAlpha(char: string) {
	return /^[\p{L}\p{Nl}$_][\p{L}\p{Nl}\p{Nd}$\u200C\u200D_]*$/u.test(char)
}

function isWhitespace(char: string) {
	return /\s/.test(char)
}

function isTick(char: string) {
	return ['"', "'", '`'].includes(char)
}

function isSpecialCharacter(char: string) {
	return (
		!isWhitespace(char) &&
		!isAlpha(char) &&
		!isTick(char) &&
		!isSingleCharacter(char)
	)
}

function isUndefined(value: any) {
	return typeof value === 'undefined'
}

function checkComment(input: string, current: number) {
	// Comprueba si estamos en un comentario de una línea
	if (input[current] === '/' && input[current + 1] === '/') {
		let end = current
		while (end < input.length && input[end] !== '\n') end++

		return { isComment: true, end }
	}

	// Comprueba si estamos en un comentario de varias líneas
	if (input[current] === '/' && input[current + 1] === '*') {
		let end = current
		while (
			end < input.length &&
			!(input[end] === '*' && input[end + 1] === '/')
		)
			end++

		return { isComment: true, end }
	}

	return { isComment: false, end: current }
}

const knownSingleCharacters = new Map([
	['(', token.leftParen],
	[')', token.rightParen],
	['{', token.leftCurly],
	['}', token.rightCurly],
	['.', token.dot],
	[';', token.semicolon],
])

function isSingleCharacter(char: string): char is SingleCharacterToken {
	return knownSingleCharacters.has(char as SingleCharacterToken)
}

function getCharToken(char: SingleCharacterToken) {
	const builder = knownSingleCharacters.get(char)
	return builder!()
}
