import { describe, expect, it } from 'vitest'
import { FormatTransformer } from '../../src/transformers/format.transformer'

describe('FormatTransformer', () => {
  it('formats code correctly', () => {
    const code = `
import { a } from 'a'
import { b } from 'b'

function foo() { return   a   +   b }
`

    const expected = `import { a } from "a"
import { b } from "b"

function foo() {
  return a + b
}
`

    expect(new FormatTransformer().transform(code)).toBe(expected)
  })
})
