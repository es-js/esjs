import { describe, expect, test } from 'vitest'
import { tiza } from '../src'

describe('tiza', () => {
  test('tiza.subrayado.azul', () => {
    const result = tiza.subrayado.fondoAzul.blanco('test')
    const expectedResult = '<span style="white-space: pre;background-color:#3b82f6;color:#fff;"><u>test</u></span>'

    expect(result).toBe(expectedResult)
  })
})
