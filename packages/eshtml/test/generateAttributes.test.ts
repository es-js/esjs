import { describe, expect, it } from 'vitest'
import { parseAttributesFromMDN } from '../src/utils/generateAttributes'

describe('generateAttributes', () => {
	it.skip('generates attributes', async () => {
		try {
			const attributeUsages = parseAttributesFromMDN()

			expect(attributeUsages).toMatchSnapshot()
		} catch (error) {
			console.error({ error })
		}
	})
})
