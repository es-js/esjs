import { compile } from './compiler/compiler'
import { tokenize } from './tokenizer/tokenizer'

export function transpile(code: string, reverse = false): string {
  const tokens = tokenize(code)

  return compile(tokens, reverse)
}
