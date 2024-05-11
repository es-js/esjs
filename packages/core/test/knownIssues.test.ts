import { describe, it } from 'vitest'
import { assertCompile, assertEsJSToJS, assertJSToESJS } from './testUtils'

describe('known issues', () => {
	it('fixed: compiles variables named `escribir`', async () => {
		assertCompile(
			`
      const escribir = 'prueba'
    `,
			`
      const escribir = 'prueba'
    `,
			{
				compiler: 'essucrase',
			},
		)
	})

	it('fixed: does not compile variables named `get`', async () => {
		assertCompile(
			`
      mut get = 'prueba'
    `,
			`
      let get = 'prueba'
    `,
			{
				compiler: 'essucrase',
			},
		)
	})

	it('fixed: transpiles const/mut/var to const/let/var', async () => {
		assertCompile(
			`
      const desde = 'a'
      var b = {
        para: 'para',
        si: 'si',
      }
      mut hasta = 'c'
    `,
			`
      const desde = 'a'
      var b = {
        para: 'para',
        si: 'si',
      }
      let hasta = 'c'
    `,
			{
				compiler: 'essucrase',
			},
		)
	})

	it('fixed: number methods', async () => {
		assertCompile(
			`
      consola.escribir(
        Numero.interpretarDecimal(Mate.aleatorio())
      )

      const x = Numero.interpretarEntero('123')

      consola.escribir(
        x.fijarDecimales(2)
      )
    `,
			`
      console.log(
        Number.parseFloat(Math.random())
      )

      const x = Number.parseInt('123')

      console.log(
        x.toFixed(2)
      )
    `,
			{
				compiler: 'essucrase',
			},
		)
	})

	it('fixed: Matriz tiene precedencia sobre Arreglo', async () => {
		assertEsJSToJS(
			`
      const x = Arreglo([])
      const y = Arreglo(1, 2, 3)
      const a = Matriz([])
      const b = Matriz(1, 2, 3)
      consola.escribir(x)
    `,
			`
      const x = Array([])
      const y = Array(1, 2, 3)
      const a = Array([])
      const b = Array(1, 2, 3)
      console.log(x)
    `,
			{
				compiler: 'essucrase',
			},
		)

		assertJSToESJS(
			`
      const x = Array([])
      const y = Array(1, 2, 3)
      const a = Array([])
      const b = Array(1, 2, 3)
      console.log(x)
    `,
			`
      const x = Matriz([])
      const y = Matriz(1, 2, 3)
      const a = Matriz([])
      const b = Matriz(1, 2, 3)
      consola.escribir(x)
    `,
			{
				compiler: 'essucrase',
			},
		)
	})
})
