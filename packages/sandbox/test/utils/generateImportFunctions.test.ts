import { describe, expect, it } from 'vitest'
import { generateImportFunctions } from '../../src/utils/generateImportFunctions'

describe('generateImportFunctions', () => {
  it('imports functions', () => {
    const code = `export function foo() {
return 'foo';
}

export async function bar() {
return 'bar';
}`

    const expected = `import { foo } from './foo'
import { bar } from './foo'`

    expect(generateImportFunctions({
      code,
      modulePath: './foo',
    })).toBe(expected)
  })
})
