import { tokenize } from './lexer/lexer'
import { generate } from './compiler/generator'

export function compile(code: string, reverse = false): string {
  const tokens = tokenize(code)

  return generate(tokens, reverse)
}

export { compile as transpile }
