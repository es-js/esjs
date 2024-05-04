import { describe, expect, it } from 'vitest'
import { InfiniteLoopProtectionTransformer } from '../../src/transformers/infiniteLoopProtection.transformer'

describe('InfiniteLoopProtectionTransformer', () => {
	it('should add infinite loop protection to a while loop', () => {
		const code = `while (true) {}`

		const expected = `var _wmloopvar1 = Date.now();
while (true) {
if (Date.now() - _wmloopvar1 > 75) { window._handleInfiniteLoopException(new Error("Bucle infinito")); break;}
}`

		expect(new InfiniteLoopProtectionTransformer().transform(code)).toBe(
			expected,
		)
	})

	it('should add infinite loop protection to a for loop', () => {
		const code = `for (let i = 0; i < 10; i++) {}`

		const expected = `var _wmloopvar1 = Date.now();
for (let i = 0; i < 10; i++) {
if (Date.now() - _wmloopvar1 > 75) { window._handleInfiniteLoopException(new Error("Bucle infinito")); break;}
}`

		expect(new InfiniteLoopProtectionTransformer().transform(code)).toBe(
			expected,
		)
	})

	it('should add infinite loop protection to a do while loop', () => {
		const code = `do {} while (true)`

		const expected = `var _wmloopvar1 = Date.now();
do {
if (Date.now() - _wmloopvar1 > 75) { window._handleInfiniteLoopException(new Error("Bucle infinito")); break;}
} while (true)`

		expect(new InfiniteLoopProtectionTransformer().transform(code)).toBe(
			expected,
		)
	})
})
