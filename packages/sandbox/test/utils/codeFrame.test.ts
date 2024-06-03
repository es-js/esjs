import { codeFrameColumns } from "../../src/utils/codeFrameColumns.ts"
import { describe, expect, it } from 'vitest'

describe('codeFrame', () => {
	it('unify duplicated imports', () => {
		const code = `
funcion sumar(a, b)
  retornar a + b
}

consola.escribir(sumar(5, 3)) // Salida: 8
`

		const expected = `  1 |
  2 | funcion sumar(a, b)
> 3 |   retornar a + b<span style="white-space: pre-wrap;color:#ef4444;">
    |             ^</span>
  4 | }
  5 |
  6 | consola.escribir(sumar(5, 3)) // Salida: 8`

		expect(
      codeFrameColumns(code, {
        start: { line: 3, column: 13 }
      }, {
        highlightCode: false,

      })
    ).toBe(expected)
	})

})
