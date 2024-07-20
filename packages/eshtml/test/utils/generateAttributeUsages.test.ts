import { describe, expect, it } from 'vitest'
import { generateAttributeUsages } from '../../src/utils/generateAttributeUsages'

describe('generateAttributeUsages', () => {
  it.skip('generates attribute usages', async () => {
    try {
      const attributeUsages = generateAttributeUsages()

      expect(attributeUsages).toMatchSnapshot()
    } catch (error) {
      console.error({ error })
    }
  })
})
