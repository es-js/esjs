export enum TokenType {
	Identifier = 'Identifier',
	Keyword = 'Keyword',
	LeftParen = 'LeftParen',
	RightParen = 'RightParen',
	LeftCurly = 'LeftCurly',
	RightCurly = 'RightCurly',
	Dot = 'Dot',
	Semicolon = 'Semicolon',
	StringLiteral = 'StringLiteral',
	SpecialCharacter = 'SpecialCharacter',
	Whitespace = 'Whitespace',
	Comment = 'Comment',
}

export interface BaseToken {
	type: TokenType
}

export interface NamedToken extends BaseToken {
	name: string
}

export interface ValuedToken extends BaseToken {
	value: string
}

export interface ExtendedToken extends NamedToken {
	compiler: Function
}

export type Token = BaseToken | NamedToken | ValuedToken | ExtendedToken

export type SingleCharacterToken = '(' | ')' | '{' | '}' | '.' | ';'

export const token = {
	identifier(name: string): NamedToken {
		return {
			type: TokenType.Identifier,
			name,
		}
	},
	keyword(name: string): NamedToken {
		return {
			type: TokenType.Keyword,
			name,
		}
	},
	leftParen(): ValuedToken {
		return {
			type: TokenType.LeftParen,
			value: '(',
		}
	},
	rightParen(): ValuedToken {
		return {
			type: TokenType.RightParen,
			value: ')',
		}
	},
	leftCurly(): ValuedToken {
		return {
			type: TokenType.LeftCurly,
			value: '{',
		}
	},
	rightCurly(): ValuedToken {
		return {
			type: TokenType.RightCurly,
			value: '}',
		}
	},
	dot(): ValuedToken {
		return {
			type: TokenType.Dot,
			value: '.',
		}
	},
	semicolon(): ValuedToken {
		return {
			type: TokenType.Semicolon,
			value: ';',
		}
	},
	stringLiteral(value: string): ValuedToken {
		return {
			type: TokenType.StringLiteral,
			value,
		}
	},
	specialCharacter(value: string): ValuedToken {
		return {
			type: TokenType.SpecialCharacter,
			value,
		}
	},
	whitespace(value: string): ValuedToken {
		return {
			type: TokenType.Whitespace,
			value,
		}
	},
	comment(value: string): ValuedToken {
		return {
			type: TokenType.Comment,
			value,
		}
	},
}
