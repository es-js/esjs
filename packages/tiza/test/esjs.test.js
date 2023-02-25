import { describe, expect, test } from 'vitest'
import chalk from 'chalk'
import { tiza } from '../src'

describe('tiza', () => {
  test('tiza.subrayado.azul === chalk.underline.blue', () => {
    const result = tiza.subrayado(tiza.azul('test'))
    const expectedResult = chalk.underline(chalk.blue('test'))

    expect(result).toBe(expectedResult)
  })
})
