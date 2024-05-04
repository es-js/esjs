import { describe, it } from 'vitest'
import { assertCompile } from './testUtils'

describe('known issues', () => {
  it('fixed: compiles variables named `escribir`', async () => {
    assertCompile(`
      const escribir = 'prueba'
    `, `
      const escribir = 'prueba'
    `, {
      compiler: 'essucrase',
    })
  })

  it('fixed: does not compile variables named `get`', async () => {
    assertCompile(`
      mut get = 'prueba'
    `, `
      let get = 'prueba'
    `, {
      compiler: 'essucrase',
    })
  })

  it('fixed: transpiles const/mut/var to const/let/var', async () => {
    assertCompile(`
      const desde = 'a'
      var b = {
        para: 'para',
        si: 'si',
      }
      mut hasta = 'c'
    `, `
      const desde = 'a'
      var b = {
        para: 'para',
        si: 'si',
      }
      let hasta = 'c'
    `, {
      compiler: 'essucrase',
    })
  })

  it('fixed: number methods', async () => {
    assertCompile(`
      consola.escribir(
        Numero.interpretarDecimal(Mate.aleatorio())
      )

      const x = Numero.interpretarEntero('123')

      consola.escribir(
        x.fijarDecimales(2)
      )
    `, `
      console.log(
        Number.parseFloat(Math.random())
      )

      const x = Number.parseInt('123')

      console.log(
        x.toFixed(2)
      )
    `, {
      compiler: 'essucrase',
    })
  })
})
