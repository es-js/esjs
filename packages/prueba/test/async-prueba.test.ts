import { describe, expect, it } from 'vitest'
import {
  afirmar,
  afirmarIguales,
  afirmarSimilares,
  pruebasAsincronas,
} from '../lib/main'

describe('pruebas', () => {
  it('can run async pruebas', async () => {
    await expect(
      await pruebasAsincronas({
        async basica() {
          afirmar(true)
          afirmarSimilares(1, '1')
          afirmarIguales(2, 2)
        },
      }),
    ).toStrictEqual({
      numeroPruebas: 1,
      exitosas: 1,
      fallidas: 0,
      sinAfirmaciones: 0,
    })
  })

  it('throws when async pruebas fails', async () => {
    await expect(
      async () =>
        await pruebasAsincronas({
          'falla afirmar': async function () {
            afirmar(await test(false))
          },
        }),
    ).rejects.toThrowError()
  })
})

async function test(value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value)
    }, 1000)
  })
}
