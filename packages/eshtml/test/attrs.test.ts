import { describe, expect, it } from 'vitest'
import { getDictionary, htmlAttrs } from '../src/attrs'

describe('Dictionary completeness test', () => {
	it('should contain all htmlAttrs', () => {
		const dictionary = getDictionary()
		const dictionaryKeys = Array.from(dictionary.values())

		htmlAttrs.forEach((keyword) => {
			if (!dictionaryKeys.includes(keyword)) {
				console.log('Missing keyword:', keyword)
			}

			expect(dictionaryKeys).toContain(keyword)
		})
	})
})
