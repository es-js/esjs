import { describe, expect, it } from 'vitest'
import { getDictionary, htmlTags } from '../src/tags'

describe('Dictionary completeness test', () => {
  it('should contain all htmlTags', () => {
    const dictionary = getDictionary()
    const dictionaryKeys = Array.from(dictionary.values())

    htmlTags.forEach((keyword) => {
      if (!dictionaryKeys.includes(keyword)) {
        console.log('Missing keyword:', keyword)
      }

      expect(dictionaryKeys).toContain(keyword)
    })
  })
})
