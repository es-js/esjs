import { describe, expect, it } from 'vitest'
import { formatCode } from '../../src/utils/formatCode'
import { unifyImports } from '../../src/utils/unifyImports'

describe('formatCode', () => {
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

    const formattedCode = formatCode(code)

    expect(formattedCode).toBe(expected)
  })
})
