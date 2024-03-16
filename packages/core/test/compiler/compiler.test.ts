import { describe, expect, it } from 'vitest'
import { generate } from '../../src/compiler/generator'
import { token } from '../../src/lexer/token'

describe('compiler', () => {
  it('compiles a simple program', async () => {
    const expected = `
// Funcion principal: if (a > b) { return a; } else { return b; }

/**
* Funcion principal
* @param {string} mensaje
* @returns {string}
*/
function principal(mensaje) {
  const hola = 'hola';
  console.log(hola + mensaje);

  return mensaje;
}`

    const tokens = [
      token.whitespace('\n'),
      token.comment('// Funcion principal: if (a > b) { return a; } else { return b; }\n'),
      token.whitespace('\n'),
      token.comment(`/**
* Funcion principal
* @param {string} mensaje
* @returns {string}
*/`),
      token.whitespace('\n'),
      token.keyword('funcion'),
      token.whitespace(' '),
      token.keyword('principal'),
      token.leftParen(),
      token.keyword('mensaje'),
      token.rightParen(),
      token.whitespace(' '),
      token.leftCurly(),
      token.whitespace('\n  '),
      token.keyword('const'),
      token.whitespace(' '),
      token.keyword('hola'),
      token.whitespace(' '),
      token.specialCharacter('='),
      token.whitespace(' '),
      token.stringLiteral('\'hola\''),
      token.semicolon(),
      token.whitespace('\n  '),
      token.keyword('consola'),
      token.dot(),
      token.keyword('escribir'),
      token.leftParen(),
      token.keyword('hola'),
      token.whitespace(' '),
      token.specialCharacter('+'),
      token.whitespace(' '),
      token.keyword('mensaje'),
      token.rightParen(),
      token.semicolon(),
      token.whitespace('\n\n  '),
      token.keyword('retornar'),
      token.whitespace(' '),
      token.keyword('mensaje'),
      token.semicolon(),
      token.whitespace('\n'),
      token.rightCurly(),
    ]

    const compiled = generate(tokens)

    expect(compiled).toEqual(expected)
  })
})
