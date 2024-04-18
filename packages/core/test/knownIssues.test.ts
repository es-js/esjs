import { describe, it } from 'vitest'
import { assertResult } from './testUtils'

describe('known issues', () => {
  it('fixed: compiles variables named `escribir`', async () => {
    await assertResult(`
      const escribir = 'prueba'
    `, `
      const escribir = 'prueba'
    `, {
      compiler: 'essucrase',
    })
  })

  it('fixed: does not compile variables named `get`', async () => {
    await assertResult(`
      mut get = 'prueba'
    `, `
      let get = 'prueba'
    `, {
      compiler: 'essucrase',
    })
  })

  it('fixed: transpiles const/mut/var to const/let/var', async () => {
    await assertResult(`
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
})
