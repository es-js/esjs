import type { NamedToken, Token, ValuedToken } from '../lexer/token'
import { TokenType } from '../lexer/token'
import { getDictionary } from './keywords'

export function generate(tokens: Token[], reverse = false): string {
  const dictionary: Map<string, string> = getDictionary(reverse)
  let output = ''
  let current = 0

  /**
   * Checks if we've consumed all the tokens
   */
  function isAtEnd() {
    return current >= tokens.length
  }

  /**
   * Returns true if the current token is of the given type
   */
  function check(type: TokenType) {
    if (isAtEnd())
      return false
    return peek().type === type
  }

  /**
   * Returns the current token without consuming it
   */
  function peek() {
    return tokens[current]
  }

  /**
   * Consumes and returns the current token
   */
  function advance() {
    if (!isAtEnd())
      current++
    return previous()
  }

  /**
   * Returns the previous token
   */
  function previous() {
    return tokens[current - 1]
  }

  /**
   * Given a list of types, check if the current token matches
   * one of the types and if so, consumes it. Otherwise, returns
   * false.
   */
  function match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (check(type)) {
        advance()
        return true
      }
    }
    return false
  }

  /**
   * Consumes and returns the current token if it matches the provided type.
   * Throws a syntax error if the token doesn't match the type.
   */
  function consume(type: TokenType) {
    if (check(type))
      return advance()
    throw new SyntaxError(
      `Unexpected token: Expected ${type}, found ${peek().type}`,
    )
  }

  /**
   * Repeatedly calls `consume` until `current` points to a token of the given
   * type. Assumes `consume` updates the current token pointer.
   */
  function consumeUntil(type: TokenType, consume: () => void) {
    while (!isAtEnd() && !match(type))
      consume()

    /**
     * Throw a syntax error if we reached the end of input and didn't
     * find the type we were looking for.
     */
    if (isAtEnd() && previous().type !== type)
      throw new SyntaxError(`Unexpected end of file. Expected ${type}`)
  }

  function compileNamedToken(token: NamedToken) {
    return dictionary.get(token.name) || token.name
  }

  function compileValuedToken(token: ValuedToken) {
    return token.value
  }

  function compileStatement() {
    let statement = ''
    const token = peek()

    switch (token.type) {
      case TokenType.Keyword:
      case TokenType.Identifier:
        statement += compileNamedToken(token as NamedToken)
        break
      case TokenType.SpecialCharacter:
      case TokenType.StringLiteral:
      case TokenType.Whitespace:
      case TokenType.Comment:
      case TokenType.LeftParen:
      case TokenType.RightParen:
      case TokenType.LeftCurly:
      case TokenType.RightCurly:
      case TokenType.Dot:
      case TokenType.Semicolon:
        return compileValuedToken(token as ValuedToken)
      default:
        throw new SyntaxError(`Unexpected token: ${token.type}`)
    }

    return statement
  }

  while (!isAtEnd()) {
    output += compileStatement()
    advance()
  }

  return output
}

