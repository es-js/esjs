import { describe, expect, it } from 'vitest'
import { ExportFunctionsTransformer } from '../../src/transformers/exportFunctions.transformer'

describe('ExportFunctionsTransformer', () => {
	it('adds export to function', () => {
		const code = `function foo() {
  return 'foo';
}
`
		const expected = `export function foo() {
    return 'foo';
}`
		expect(new ExportFunctionsTransformer().transform(code)).toBe(expected)
	})
})
