import { describe, expect, it } from 'vitest'
import { TokenType } from '../../src/tokenizer/token'
import { tokenize } from '../../src/tokenizer/tokenizer'

describe('tokenizer', () => {
  it('tokenizes a simple program', () => {
    const input = `
// Funcion principal: if (a > b) { return a; } else { return b; }

/**
* Funcion principal
* @param {string} mensaje
* @returns {string}
*/
funcion principal(mensaje) {
  const hola = 'hola';
  consola.escribir(hola + mensaje);

  retornar mensaje;
}`

    const tokens = tokenize(input)

    expect(tokens).toMatchSnapshot()

    // Ensure it uses all TokenTypes available
    expect(Object.keys(TokenType).length).toBeGreaterThan(0)

    for (const tokenType of Object.values(TokenType)) {
      if (tokenType === TokenType.Identifier) {
        // Identifiers are not tokenized at this stage
        continue
      }

      try {
        expect(tokens.some(token => token.type === tokenType)).toBe(true)
      }
      catch (error) {
        console.error(`Missing token type: ${tokenType}`)
        throw error
      }
    }
  })
})
