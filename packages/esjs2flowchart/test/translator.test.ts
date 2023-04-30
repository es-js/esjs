import { describe, expect, it } from 'vitest'
import { translate } from '../src/shared/utils/translate'

describe('test', () => {
  it('can translate a keyword', () => {
    const keyword = 'function'
    const expected = 'funcion'

    expect(translate(keyword)).toBe(expected)
  })
})
